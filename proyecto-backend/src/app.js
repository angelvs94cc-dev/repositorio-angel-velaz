import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';

// 1. Tus rutas (He mantenido tus nombres de archivo)
import { pagesRouter } from './routes/pages-routes.js';
import { utilitesRouter } from './routes/utilities-router.js';
import { tasksRouter } from './routes/tasks-routes.js';
import { authRouter } from './routes/auth-router.js';

// 2. Los middlewares de apoyo
import { dataInViews } from './middleware/views-middleware.js';
import { sessionMiddleware, sessionInViews, guard } from './middleware/auth-middleware.js';

const app = express();
const appDir = dirname(fileURLToPath(import.meta.url));

// --- CONFIGURACIÓN GLOBALES ---
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(appDir, '../public'))); // Aquí busca tu app.css
app.use(morgan('tiny'));
app.use(dataInViews);

// --- AUTH / SESIONES ---
app.use(sessionMiddleware);
app.use(sessionInViews);

// --- MOTOR DE PLANTILLAS ---
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', join(appDir, 'views'));

// --- RUTAS ---
app.use('/', pagesRouter);
app.use('/', utilitesRouter);
app.use('/', authRouter);
app.use('/tasks', guard, tasksRouter); // El guard protegerá tu Mongo después

// --- EL "WRAPPER" DE HTML (Layout dinámico) ---
app.use((req, res, next) => {
    const renderHtml = res.locals.html; 
    if (!renderHtml) {
        next(); 
        return;
    }

    const title = res.locals.title || 'Express APP';
    const pendingTasks = res.locals.pendingTasks || 0;
    const content = res.locals.content || '<p>Cargando contenido...</p>';

    // Esta es la estructura que unifica todo el diseño
    res.send(`
        <!doctype html>
        <html lang="es">
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/app.css">
                <link rel="icon" href="/icon.webp">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                <title>${title}</title>
            </head>
            <body>
                <nav class="container my-3">
                    <a href="/" class="me-3">Inicio</a>
                    <a href="/tasks" class="me-3">Lista de tareas (${pendingTasks})</a>
                    <a href="/health">Estado</a>
                </nav>
                <main class="container">
                    ${content}
                </main>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </html>    
    `);
});

// --- MANEJADOR 404 ---
app.use((req, res) => {
    res.status(404).send('Resource not found');
});

export default app;