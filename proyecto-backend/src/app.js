import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';

import { pagesRouter } from './routes/pages-routes.js';
import { utilitesRouter } from './routes/utilities-router.js'; 
import { productsRouter } from './routes/products-routes.js'; 
import { authRouter } from './routes/auth-router.js';
import { productsPageController } from './controllers/products-controllers.js';

import { dataInViews } from './middleware/views-middleware.js';
import { sessionMiddleware, sessionInViews } from './middleware/auth-middleware.js';

const app = express();
const appDir = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(join(appDir, '../public'))); 
app.use(morgan('tiny'));
app.use(dataInViews);

app.use(sessionMiddleware);
app.use(sessionInViews);

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', join(appDir, 'views'));

// --- RUTAS ---
app.get('/', productsPageController); // El catálogo en la raíz
app.use('/products', productsRouter); // El resto de rutas de productos
app.use('/', pagesRouter);
app.use('/', utilitesRouter); 
app.use('/', authRouter);

// --- WRAPPER ---
app.use((req, res, next) => {
    const renderHtml = res.locals.html; 
    if (!renderHtml) { next(); return; }

    const title = res.locals.title || 'Nodepop - Segunda Mano';
    const content = res.locals.content || '<p>Cargando...</p>';

    res.send(`
        <!doctype html>
        <html lang="es">
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/app.css">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <title>${title}</title>
            </head>
            <body class="bg-light">
                <header class="bg-dark py-3 mb-4 shadow-sm">
                    <nav class="container d-flex justify-content-between">
                        <a href="/" class="text-white text-decoration-none fs-4 fw-bold">🛒 Nodepop</a>
                        <div>
                            <a href="/" class="btn btn-outline-light btn-sm">Catálogo</a>
                            <a href="/products/new" class="btn btn-primary btn-sm">Anunciar</a>
                        </div>
                    </nav>
                </header>
                <main class="container bg-white p-4 rounded shadow-sm">${content}</main>
            </body>
        </html>
    `);
});

app.use((req, res) => res.status(404).send('Resource not found'));

export default app;