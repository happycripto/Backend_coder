import { Router } from 'express';
import { agregarProductoAlCarrito, eliminarProductoDelCarrito, saveCartToDatabase } from '../dao/Dao/mongoDBManagers.js';

const router = Router();

// Ruta para guardar el carrito en la base de datos
router.post('/saveCart', async (req, res) => {
  try {
    // Obtén el carrito desde la solicitud (puedes ajustar esto según tu estructura de datos)
    const cart = req.body;

    // Llama a la función para guardar el carrito en la base de datos
    const savedCart = await saveCartToDatabase(cart);

    res.status(200).json(savedCart);
  } catch (error) {
    console.error('Error al guardar el carrito en la base de datos:', error);
    res.status(500).json({ error: 'Error al guardar el carrito en la base de datos' });
  }
});

// Ruta para agregar un producto al carrito en MongoDB
router.post('/addProductToCart/:productId/:cantidad', async (req, res) => {
  try {
    const { productId, cantidad } = req.params;

    // Llama a la función para agregar el producto al carrito
    const result = await agregarProductoAlCarrito(productId, cantidad);

    if (result.status === 'success') {
      res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

// Ruta para eliminar un producto del carrito
router.delete('/api/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    conlose-log(cid)
    const result = await eliminarProductoDelCarrito(cid, pid);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: error.message });
  }
});


// Ruta para actualizar el carrito con un nuevo arreglo de productos
router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const result = await actualizarCarrito(cid, products);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar la cantidad de ejemplares de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await actualizarCantidadEnCarrito(cid, pid, quantity);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al actualizar la cantidad de producto en el carrito:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
