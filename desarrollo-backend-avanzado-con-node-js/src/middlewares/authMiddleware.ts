import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  const token = authorization.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key') as {
      userId: number;
    };

    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o caducado' });
  }
}
