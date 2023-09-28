import express from 'express';
import { getAllProducts } from '../dao/Dao/mongoDBManagers.js';

const router = express.Router();

function addToCart(productId) {
    // Realiza una solicitud POST para agregar el producto al carrito
    fetch(`/api/carts/cartId/addProduct/${productId}`, {
        method: 'POST',
        })
        .then((response) => {
            if (response.status === 200) {
            alert('Producto agregado al carrito exitosamente.');
            } else {
            alert('Error al agregar el producto al carrito.');
            }
        })
        .catch((error) => {
            console.error('Error al agregar el producto al carrito:', error);
            alert('Error al agregar el producto al carrito.');
        });
}

router.get('/products', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const data = await getAllProducts(page, 5);
        console.log('Status:success', data)

        // Agrega la función addToCart al contexto de las vistas (si es necesario)
        res.render('products', { ...data, addToCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

export default router;




