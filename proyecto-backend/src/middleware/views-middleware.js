// Hemos eliminado por completo el import de tasksRepository que rompía el código

export async function dataInViews(req, res, next) {
    // Inicializamos variables por defecto para las vistas de Nodepop
    res.locals.title = 'Nodepop - Segunda Mano';
    res.locals.errorMessage = null;
    
    next();
}