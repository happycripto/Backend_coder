import express from 'express';
import { getAllProducts, getAllCarts } from '../dao/Dao/mongoDBManagers.js';
// import { ProductModel } from '../dao/models/product.js';

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const data = await getAllProducts(page, 5);
        console.log('Status:success',data)

        res.render('products', data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


export default router;



