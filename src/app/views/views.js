import express from 'express';
import { getAllCarts, getAllProducts } from '../dao/Dao/mongoDBManagers.js';

const router = express.Router();

// router.get('/products', async (req, res) => {
//     try {
//         const { page = 1 } = req.query;
//         const data = await getAllProducts(page, 5);
//         console.log('Status:success', data)

//         res.render('products', { ...data, PORT });
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener los productos' });
//     }
// });
router.get('/products', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const data = await getAllProducts(page, 5);
        console.log('Status: success', data);

        if (!req.session.user) {
            // Si no hay un usuario en sesión, redirige al inicio de sesión
            return res.redirect('/login');
        }

        res.render('products', { products: data.products, user: req.session.user, PORT });
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

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/profile');
    next();
}

const privateAccess = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

router.get('/login', publicAccess,(req, res)=> {
    res.render('login');
})

router.get('/register', publicAccess,(req, res)=> {
    res.render('register')
})

router.get('/profile', privateAccess,(req, res)=> {
    res.render('profile', {
        user: req.session.user,
    })
})

router.get('/logout', (req, res) => {
    // Destruye la sesión y redirige al usuario a la vista de login
    req.session.destroy(err => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
        }
        res.redirect('/login');
    });
});

router.get('/resetPassword', publicAccess, (req, res)=> {
    res.render('resetPassword')
})

export default router;



