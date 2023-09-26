import express  from 'express';
import { ProductModel } from '../dao/models/product.js';

const router = express.Router();

// Ruta para obtener todos los productos con posible límite, paginación y ordenamiento
// router.get('/products', async (req, res) => {
//     try {
//         const { page = 1 } = req.query;
//         const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await ProductModel.paginate({}, { limit: 5, page });

//         res.render('products', { docs, hasPrevPage, hasNextPage, prevPage, nextPage });
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener los productos' });
//     }
// });




// Ruta para buscar un producto por su código
router.get('/:code', async (req, res) => {
    try {
        const code = parseInt(req.params.code);
        const product = await Product.findOne({ code });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el producto' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const product = new Product(newProduct);
        await product.save();
        res.json({ message: 'Producto agregado exitosamente', product });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

// Ruta para actualizar un producto por su código
router.put('/:code', async (req, res) => {
    try {
        const code = parseInt(req.params.code);
        const updatedFields = req.body;
        const product = await Product.findOneAndUpdate({ code }, updatedFields, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado exitosamente', product });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Ruta para eliminar un producto por su código
router.delete('/:code', async (req, res) => {
    try {
        const code = parseInt(req.params.code);
        const product = await Product.findOneAndDelete({ code });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente', product });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;
