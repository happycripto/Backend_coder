// const express = require('express');
// const router = express.Router();
// const fs = require('fs');

// // Función para generar un ID único para el carrito
// function generateUniqueCartId() {
//   // Implementa la lógica para generar un ID único, por ejemplo, utilizando un timestamp
//   return Date.now().toString();
// }

// // Función para guardar el carrito en "cart.json"
// function saveCartToFile(cart) {
//   const cartsData = loadCartsFromFile();
//   cartsData.push(cart);
//   fs.writeFileSync('data/cart.json', JSON.stringify(cartsData, null, 2), 'utf-8');
// }

// // Función para cargar los carritos desde el archivo "cart.json"
// function loadCartsFromFile() {
//   try {
//     const data = fs.readFileSync('data/cart.json', 'utf-8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// }

// // Ruta para crear un nuevo carrito
// router.post('/', (req, res) => {
//   try {
//     const newCart = req.body;
//     const cartId = generateUniqueCartId();
//     newCart.id = cartId;
//     saveCartToFile(newCart);
//     res.json({ message: 'Carrito creado exitosamente' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al crear el carrito' });
//   }
// });

// module.exports = router;

import { Router } from 'express';
const router = Router();
import { cartModel } from '../dao/models/cart.js';

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = req.body;
    // Aquí puedes realizar cualquier lógica necesaria para validar o procesar el carrito antes de guardarlo
    const createdCart = await cartModel.create(newCart); // Crea el carrito en la base de datos
    res.json({ message: 'Carrito creado exitosamente', cart: createdCart });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

export default router;


