import express from 'express';
import { PrismaClient } from '@prisma/client';
import { booksRouter } from './routes/books';
import { authenticationRouter } from './routes/authentication';
import { AuthRequest, authMiddleware } from './middlewares/authMiddleware';

const prisma = new PrismaClient();

export const app = express();

app.use(express.json());

app.use('/authentication', authenticationRouter);
app.use('/books', booksRouter);

app.get('/me/books', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        ownerId: req.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(books);
  } catch (error) {
    console.error('MY BOOKS ERROR:', error);
    res.status(500).json({ error: 'Error al obtener tus libros' });
  }
});
