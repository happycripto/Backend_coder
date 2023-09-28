import { Router } from 'express';
import { cartModel } from '../dao/models/cart.js';
import { getAllCarts, saveCartToDatabase } from '../dao/Dao/mongoDBManagers.js';
import { ProductModel } from '../dao/models/product.js';

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



// Ruta para agregar un producto al carrito
router.post('/api/carts/cartId/addProduct/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const quantity = 1; // Puedes cambiar la cantidad según tus necesidades

    // Busca el carrito por su ID
    let cart = await cartModel.findById(cartId);

    if (!cart) {
      // Si el carrito no existe, crea uno nuevo
      cart = new cartModel({ products: [] });
    }

    // Busca el producto por su ID
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verifica si el producto ya existe en el carrito
    const existingProduct = cart.products.find(
      (item) => item.productId.equals(productId)
    );

    if (existingProduct) {
      // Si el producto ya existe en el carrito, actualiza la cantidad
      existingProduct.quantity += quantity;
    } else {
      // Si el producto no existe en el carrito, agrégalo
      cart.products.push({ productId, quantity });
    }

    // Guarda el carrito (nuevo o actualizado) en la base de datos
    await cart.save();

    // Redirige a la página de productos u otra página deseada
    res.redirect('/products'); // Cambia la ruta de redirección según tu necesidad
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

export default router;