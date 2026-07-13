import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
});

export async function sendBookSoldEmail(sellerEmail: string, bookTitle: string): Promise<void> {
  await transporter.sendMail({
    from: 'bookshop@local.test',
    to: sellerEmail,
    subject: 'Tu libro ha sido vendido',
    text: `Buenas, tu libro "${bookTitle}" ha sido vendido correctamente.`,
  });
}

export async function sendPriceReminderEmail(
  sellerEmail: string,
  bookTitle: string,
): Promise<void> {
  await transporter.sendMail({
    from: 'bookshop@local.test',
    to: sellerEmail,
    subject: 'Sugerencia para mejorar tu publicación',
    text: `Buenas, tu libro "${bookTitle}" lleva más de 7 días publicado. Te sugerimos revisar o bajar el precio para aumentar las posibilidades de venta.`,
  });
}
