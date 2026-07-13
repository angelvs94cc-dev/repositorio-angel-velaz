import 'dotenv/config';
import { app } from './app';
import { startReminderJob } from './services/reminderService';

const PORT = 3000;

startReminderJob();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
