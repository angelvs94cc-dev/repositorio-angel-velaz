import { sendBookSoldEmail } from '../services/emailService';
import { Request, Response, Router } from 'express';
import { BookStatus, PrismaClient } from '@prisma/client';
import { AuthRequest, authMiddleware } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();
export const booksRouter = Router();

/**
 * Catálogo público.
 * Debe declararse antes de las rutas dinámicas /:id.
 */
booksRouter.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const search = String(req.query.search || '').trim();

    const where = {
      status: BookStatus.PUBLISHED,
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { author: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.book.count({ where }),
    ]);

    res.json({
      data: books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET BOOKS ERROR:', error);
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

booksRouter.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, price, author } = req.body;

    if (
      typeof title !== 'string' ||
      typeof description !== 'string' ||
      typeof author !== 'string' ||
      typeof price !== 'number' ||
      price <= 0 ||
      !title.trim() ||
      !description.trim() ||
      !author.trim()
    ) {
      res.status(400).json({ error: 'Datos inválidos' });
      return;
    }

    const book = await prisma.book.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        price,
        author: author.trim(),
        ownerId: req.userId!,
        status: BookStatus.PUBLISHED,
        soldAt: null,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.error('CREATE BOOK ERROR:', error);
    res.status(500).json({ error: 'Error al crear el libro' });
  }
});

booksRouter.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      res.status(404).json({ error: 'Libro no encontrado' });
      return;
    }

    if (book.ownerId !== req.userId) {
      res.status(403).json({ error: 'No puedes editar este libro' });
      return;
    }

    const allowedFields = ['title', 'description', 'price', 'author'];
    const receivedFields = Object.keys(req.body);
    const hasForbiddenFields = receivedFields.some((field) => !allowedFields.includes(field));

    if (hasForbiddenFields) {
      res.status(400).json({ error: 'Hay campos no permitidos' });
      return;
    }

    const { title, description, price, author } = req.body;

    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      res.status(400).json({ error: 'Precio inválido' });
      return;
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(author !== undefined && { author }),
      },
    });

    res.json(updatedBook);
  } catch (error) {
    console.error('UPDATE BOOK ERROR:', error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});

booksRouter.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      res.status(404).json({ error: 'Libro no encontrado' });
      return;
    }

    if (book.ownerId !== req.userId) {
      res.status(403).json({ error: 'No puedes eliminar este libro' });
      return;
    }

    if (book.status === BookStatus.SOLD) {
      res.status(400).json({ error: 'No se puede eliminar un libro vendido' });
      return;
    }

    await prisma.book.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('DELETE BOOK ERROR:', error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

booksRouter.post('/:id/buy', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!book) {
      res.status(404).json({ error: 'Libro no encontrado' });
      return;
    }

    if (book.status === BookStatus.SOLD) {
      res.status(400).json({ error: 'El libro ya está vendido' });
      return;
    }

    if (book.ownerId === req.userId) {
      res.status(400).json({ error: 'No puedes comprar tu propio libro' });
      return;
    }

    const soldBook = await prisma.book.update({
      where: { id },
      data: {
        status: BookStatus.SOLD,
        soldAt: new Date(),
      },
    });

    try {
      await sendBookSoldEmail(book.owner.email, book.title);
    } catch (emailError) {
      console.error('EMAIL ERROR:', emailError);
    }

    res.json(soldBook);
  } catch (error) {
    console.error('BUY BOOK ERROR:', error);
    res.status(500).json({ error: 'Error al comprar el libro' });
  }
});
