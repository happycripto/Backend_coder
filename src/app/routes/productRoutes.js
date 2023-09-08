// import { Router } from 'express';
// const router = Router();
// import ProductManager from '../dao/ProductManager.js';

// const productManager = new ProductManager('data/products.json');
// productManager.loadProducts();

// // Ruta para obtener todos los productos con posible límite
// router.get('/', (req, res) => {
//     try {
//         const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
//         const products = productManager.getProducts(limit);
//         res.json(products);
//         } catch (error) {
//             res.status(500).json({ error: 'Error al obtener los productos' });
//         }
// });

// // Ruta para obtener un producto por su ID
// router.get('/products', async (req, res) => {
//     try {
//     const products = await getAllProducts();
//     res.render('products', { products });
//     } catch (error) {
//     res.status(500).send('Error al obtener los productos.');
//     }
// });


// // Ruta para agregar un nuevo producto
// router.post('/', (req, res) => {
//     try {
//     const newProduct = req.body;
//     productManager.addProduct(newProduct);
//     res.json({ message: 'Producto agregado exitosamente' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error al agregar el producto' });
//         }
// });

// // Ruta para actualizar un producto por su ID
// router.put('/:pid', (req, res) => {
//     try {
//     const productId = parseInt(req.params.pid);
//     const updatedFields = req.body;
//     productManager.updateProduct(productId, updatedFields);
//     res.json({ message: 'Producto actualizado exitosamente' });
//     } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar el producto' });
//     }
// });

// // Ruta para eliminar un producto por su ID
// router.delete('/:pid', (req, res) => {
//     try {
//     const productId = parseInt(req.params.pid);
//     productManager.deleteProduct(productId);
//     res.json({ message: 'Producto eliminado exitosamente' });
//     } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el producto' });
//     }
// });


// export default router;
