import { Router } from 'express';
import { agregarProductoAlCarrito, saveCartToDatabase } from '../dao/Dao/mongoDBManagers.js';

const router = Router();

// // Ruta para obtener todos los carritos
// router.get('/', async (req, res) => {
//   try {
//     const carts = await getAllCarts();
//     res.json({ carts });
//   } catch(error) {
//     console.error('Error al obtener los carritos:', error);
//     res.status(500).json({ error: 'Error al obtener los carritos' });
//   }
// });

// // Ruta para crear un nuevo carrito
// router.post('/', async (req, res) => {
//   try {
//     const newCart = req.body;
//     // Crea el carrito en la base de datos
//     const createdCart = await cartModel.create(newCart);
//     res.json({ message: 'Carrito creado exitosamente', cart: createdCart });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al crear el carrito' });
//   }
// });



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

export default router;
