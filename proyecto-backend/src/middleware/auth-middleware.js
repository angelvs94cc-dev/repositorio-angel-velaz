import session from 'express-session';
// Comentamos el import de connect-mongo para que no intente buscar la librería de base de datos
// import ConnectMongo from 'connect-mongo';

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2;

export function guard(req, res, next) {
    const redirectUrl = '/login?redirect=' + encodeURIComponent(req.originalUrl);
    if (!req.session.userId) {
        // No hay login
        res.redirect(redirectUrl);
        return;
    }
    next();
}

export const sessionMiddleware = session({
    name: 'kc20-nodejs',
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: INACTIVITY_2_DAYS,
    }
    // ¡CAPADO! Quitamos el "store" de ConnectMongo para que Express use la memoria RAM local.
    // De esta forma evitamos el error getaddrinfo ENOTFOUND por completo.
});

export function sessionInViews(req, res, next) {
    res.locals.session = req.session;
    next();
}