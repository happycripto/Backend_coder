import express from 'express';
import { getAllCarts, getAllProducts } from '../dao/Dao/mongoDBManagers.js';

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const data = await getAllProducts(page, 5);
        console.log('Status:success', data)

        res.render('products', { ...data, PORT });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

router.get('/cart', async (req, res) => {
    try {
      // Aquí debes obtener el carrito del usuario actual desde tu base de datos
        const cart = await getAllCarts();
        res.render('cart', { cart: cart, cartId: cart._id });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});


export default router;



