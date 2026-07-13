import cron from 'node-cron';
import { PrismaClient, BookStatus } from '@prisma/client';
import { sendPriceReminderEmail } from './emailService';

const prisma = new PrismaClient();

export function startReminderJob() {
  cron.schedule('0 9 * * 1', async () => {
    console.log('Ejecutando recordatorio semanal...');

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const books = await prisma.book.findMany({
      where: {
        status: BookStatus.PUBLISHED,
        createdAt: {
          lte: sevenDaysAgo,
        },
      },
      include: {
        owner: true,
      },
    });

    for (const book of books) {
      try {
        await sendPriceReminderEmail(book.owner.email, book.title);
      } catch (error) {
        console.error('ERROR EN RECORDATORIO:', error);
      }
    }
  });
}
