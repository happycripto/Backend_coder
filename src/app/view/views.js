import express from 'express';
import { getAllProducts, getAllCarts } from '../dao/Dao/mongoDBManagers.js';

const router = express.Router();

// router.get('/products', async (req, res) => {
//     try {
//     const products = await getAllProducts();
//     res.render('products', { products });
//     } catch (error) {
//     res.status(500).send('Error al obtener los productos.');
//     }
// });



router.get('/messages', async (req, res) => {
    try {
    const messages = await getAllMessages();
    res.render('chat', { messages });
    } catch (error) {
    res.status(500).send('Error al obtener los mensajes.');
    }
});

export default router;



