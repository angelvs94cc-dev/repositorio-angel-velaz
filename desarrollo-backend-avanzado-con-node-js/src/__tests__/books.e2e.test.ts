import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { app } from '../app';

const prisma = new PrismaClient();

describe('BookShop E2E', () => {
  let ownerToken: string;
  let buyerToken: string;
  let ownerId: number;
  let buyerId: number;
  let bookId: number;

  const uniqueSuffix = Date.now();

  const ownerEmail = `owner-${uniqueSuffix}@test.com`;
  const buyerEmail = `buyer-${uniqueSuffix}@test.com`;
  const password = '123456';

  beforeAll(async () => {
    const ownerSignup = await request(app).post('/authentication/signup').send({
      email: ownerEmail,
      password,
    });

    ownerId = ownerSignup.body.id;

    const buyerSignup = await request(app).post('/authentication/signup').send({
      email: buyerEmail,
      password,
    });

    buyerId = buyerSignup.body.id;

    const ownerSignin = await request(app).post('/authentication/signin').send({
      email: ownerEmail,
      password,
    });

    ownerToken = ownerSignin.body.token;

    const buyerSignin = await request(app).post('/authentication/signin').send({
      email: buyerEmail,
      password,
    });

    buyerToken = buyerSignin.body.token;
  });

  afterAll(async () => {
    await prisma.book.deleteMany({
      where: {
        ownerId: {
          in: [ownerId, buyerId],
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        id: {
          in: [ownerId, buyerId],
        },
      },
    });

    await prisma.$disconnect();
  });

  describe('POST /books', () => {
    test('crea un libro correctamente', async () => {
      const response = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          title: 'Clean Architecture',
          description: 'Libro sobre arquitectura de software',
          price: 25,
          author: 'Robert C. Martin',
        });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        title: 'Clean Architecture',
        description: 'Libro sobre arquitectura de software',
        price: 25,
        author: 'Robert C. Martin',
        status: 'PUBLISHED',
        ownerId,
        soldAt: null,
      });

      bookId = response.body.id;
    });

    test('rechaza a un usuario no autenticado', async () => {
      const response = await request(app).post('/books').send({
        title: 'Libro sin token',
        description: 'No debería crearse',
        price: 20,
        author: 'Autor',
      });

      expect(response.status).toBe(401);
    });

    test('rechaza datos inválidos', async () => {
      const response = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          title: '',
          description: '',
          price: -5,
          author: '',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /books/:id/buy', () => {
    test('compra un libro correctamente', async () => {
      const response = await request(app)
        .post(`/books/${bookId}/buy`)
        .set('Authorization', `Bearer ${buyerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('SOLD');
      expect(response.body.soldAt).not.toBeNull();
    });

    test('rechaza comprar un libro ya vendido', async () => {
      const response = await request(app)
        .post(`/books/${bookId}/buy`)
        .set('Authorization', `Bearer ${buyerToken}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('El libro ya está vendido');
    });

    test('rechaza un libro inexistente', async () => {
      const response = await request(app)
        .post('/books/999999/buy')
        .set('Authorization', `Bearer ${buyerToken}`);

      expect(response.status).toBe(404);
    });

    test('rechaza comprar un libro propio', async () => {
      const ownBook = await prisma.book.create({
        data: {
          title: 'Libro propio',
          description: 'No debería poder comprarlo',
          price: 10,
          author: 'Autor',
          ownerId,
        },
      });

      const response = await request(app)
        .post(`/books/${ownBook.id}/buy`)
        .set('Authorization', `Bearer ${ownerToken}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('No puedes comprar tu propio libro');
    });
  });

  describe('GET /books', () => {
    test('devuelve resultados paginados', async () => {
      const response = await request(app).get('/books?page=1&limit=10');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
      });
    });

    test('busca parcialmente por título', async () => {
      await prisma.book.create({
        data: {
          title: 'Refactoring Legacy Code',
          description: 'Libro de pruebas',
          price: 30,
          author: 'Martin Fowler',
          ownerId,
        },
      });

      const response = await request(app).get('/books?page=1&limit=10&search=Refact');

      expect(response.status).toBe(200);
      expect(
        response.body.data.some(
          (book: { title: string }) => book.title === 'Refactoring Legacy Code',
        ),
      ).toBe(true);
    });

    test('busca parcialmente por autor', async () => {
      const response = await request(app).get('/books?page=1&limit=10&search=Fowler');

      expect(response.status).toBe(200);
      expect(
        response.body.data.some((book: { author: string }) => book.author === 'Martin Fowler'),
      ).toBe(true);
    });

    test('excluye libros vendidos', async () => {
      const response = await request(app).get('/books?page=1&limit=100');

      expect(response.status).toBe(200);
      expect(response.body.data.some((book: { id: number }) => book.id === bookId)).toBe(false);
    });
  });
});
