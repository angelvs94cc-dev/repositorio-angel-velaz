import { 
    addNewProduct, 
    deleteProduct, 
    getProductById, 
    getProducts, 
    updateProduct 
} from '../data/productsRepository.js'; // Importamos tus nuevas funciones de base de datos

/**
 * GET /products/new
 * Muestra el formulario para crear un nuevo producto
 */
export async function newProductController(req, res, next) {
    res.render('product.html', {
        title: 'Anunciar Nuevo Producto - Nodepop',
        errorMessage: null,
        values: {},
    });
}

/**
 * POST /products/
 * Procesa la creación de un nuevo producto
 */
export async function createProductController(req, res, next) {
    const userId = req.session.userId;

    // Validaciones básicas según el briefing
    if (!req.body.name || req.body.name.trim() === '') {
        return res.render('product.html', {
            title: 'Anunciar Nuevo Producto - Nodepop',
            errorMessage: 'El nombre del producto es obligatorio',
            values: req.body
        });
    }

    if (!req.body.price || Number(req.body.price) < 0) {
        return res.render('product.html', {
            title: 'Anunciar Nuevo Producto - Nodepop',
            errorMessage: 'El precio es obligatorio y debe ser mayor o igual a 0',
            values: req.body
        });
    }

    // Procesar los tags (pueden venir como string único o array desde el formulario)
    let tags = req.body.tags || [];
    if (typeof tags === 'string') {
        tags = [tags];
    }

    try {
        const newProduct = {
            name: req.body.name,
            price: Number(req.body.price),
            tags: tags,
            owner: userId,
        };

        await addNewProduct(newProduct);
        res.redirect('/'); // Redirige al inicio para ver el producto anunciado
    } catch (error) {
        res.render('product.html', {
            title: 'Anunciar Nuevo Producto - Nodepop',
            errorMessage: 'Error al guardar el producto. Revisa los tags válidos.',
            values: req.body
        });
    }
}

/**
 * GET / (o GET /products)
 * Listado de productos con soporte TOTAL de filtros, ordenación y paginación (Punto 11 del Briefing)
 */
export async function productsPageController(req, res, next) {
    try {
        // 1. Capturar los criterios de búsqueda (Filtros) de la URL (req.query)
        const filters = {
            name: req.query.name,
            tag: req.query.tag,
            price_min: req.query.price_min,
            price_max: req.query.price_max
        };

        // 2. Capturar las opciones de paginación y orden del enunciado
        const options = {
            sort: req.query.sort,   // Ej: ?sort=name o ?sort=price
            skip: req.query.skip,   // Ej: ?skip=1
            limit: req.query.limit  // Ej: ?limit=3
        };

        // 3. Lanzar la consulta superpotente a la base de datos
        const products = await getProducts(filters, options);

        // 4. Renderizar la plantilla enviando los productos ya filtrados
        res.render('products.html', {
            title: 'Catálogo Nodepop - Segunda Mano',
            products: products,
            queryParams: req.query // Nos sirve para mantener los campos rellenos en los inputs de la web
        });
    } catch (error) {
        next(error);
    }
}

/**
 * GET /products/:productId
 * Ver el detalle de un artículo concreto
 */
export async function productDetailController(req, res, next) {
    const productId = req.params.productId;

    const product = await getProductById(productId);

    if (!product) {
        return next(); // Si no existe el producto, salta al manejador 404
    }

    res.render('product-detail.html', {
        title: product.name,
        product: product
    });
}

/**
 * POST /products/edit/:productId
 * Modificar un producto (comprobando seguridad)
 */
export async function editProductController(req, res, next) {
    const productId = req.params.productId;
    const userId = req.session.userId;

    const product = await getProductById(productId);
    if (!product) {
        return next();
    }

    let tags = req.body.tags || [];
    if (typeof tags === 'string') {
        tags = [tags];
    }

    // Actualizamos pasando el userId para asegurar que solo el dueño lo modifica
    const updated = await updateProduct(
        productId,
        {
            name: req.body.name,
            price: Number(req.body.price),
            tags: tags
        },
        userId
    );

    if (!updated) {
        return res.status(403).send('No tienes permisos para modificar este producto.');
    }

    res.redirect('/');
}

/**
 * DELETE /products/:productId
 * Borrar un producto de forma segura (Solo el propietario)
 */
export async function deleteProductController(req, res, next) {
    const productId = req.params.productId;
    const userId = req.session.userId;

    // Ejecuta el borrado validando el propietario en base de datos
    const result = await deleteProduct(productId, userId);

    if (!result) {
        return res.status(403).json({ error: 'No autorizado o producto no encontrado' });
    }

    res.json({ success: true, message: 'Producto eliminado correctamente' });
}