import { Router } from 'express';
import { cartModel } from '../dao/models/cart.js';
import { getAllCarts } from '../dao/Dao/mongoDBManagers.js';

const router = Router();

// Ruta para obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await getAllCarts();
    res.json({ carts });
  } catch(error) {
    console.error('Error al obtener los carritos:', error);
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
});

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


// ... (otros imports y configuraciones)


const routerCart = agregarAlCarrito();
// Ruta para agregar un producto al carrito
routerCart.post('/addToCart/:productId', async (req, res) => {
  try {
      const productId = req.params.productId;

      // Busca el producto en la base de datos
      const product = await ProductModel.findById(productId);
      if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Verifica si el carrito ya existe o crea uno nuevo si no existe
      let cart = await cartModel.findOne();
      if (!cart) {
          cart = new cartModel({ products: [] });
      }

      // Agrega el producto al carrito
      cart.products.push({ productId: product._id, quantity: 1 });

      // Guarda el carrito actualizado en la base de datos
      await cart.save();

      // Actualiza la representación visual del carrito o realiza cualquier otra acción necesaria

      res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

export default router;





