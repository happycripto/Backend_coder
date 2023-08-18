const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager');

const productManager = new ProductManager('data/products.json');
productManager.loadProducts();

// Ruta para obtener todos los productos con posible límite
router.get('/', (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = productManager.getProducts(limit);
        res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
});

// Ruta para obtener un producto por su ID
router.get('/:pid', (req, res) => {
    try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductByID(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});


// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    try {
    const newProduct = req.body;
    productManager.addProduct(newProduct);
    res.json({ message: 'Producto agregado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
        }
});

// Ruta para actualizar un producto por su ID
router.put('/:pid', (req, res) => {
    try {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    productManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', (req, res) => {
    try {
    const productId = parseInt(req.params.pid);
    productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});


module.exports = router;
