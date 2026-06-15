import { getProducts } from '../data/productsRepository.js';

export async function homePageController(req, res, next) {
    try {
        // Capturamos los filtros por si el usuario busca desde la home
        const filters = {
            name: req.query.name,
            tag: req.query.tag,
            price_min: req.query.price_min,
            price_max: req.query.price_max
        };

        const options = {
            sort: req.query.sort,
            skip: req.query.skip,
            limit: req.query.limit
        };

        // Buscamos los productos en vez de las tareas
        const products = await getProducts(filters, options);

        // Renderizamos la vista principal pasándole los productos
        res.render('products.html', {
            title: 'Nodepop - Inicio',
            products: products,
            queryParams: req.query
        });
    } catch (error) {
        next(error);
    }
}