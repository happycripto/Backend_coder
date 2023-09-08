import { Product }  from '../models/product.js';
import Message from '../models/message.js';
import { cartModel } from '../models/cart.js';

export async function getAllProducts() {
    try {
    const products = await Product();
    return products;
    } catch (error) {
    throw new Error('Error al obtener los productos de la base de datos.');
    }
}

///////

export async function guardarMensaje(correoDelUsuario, mensajeDelUsuario) {
    try {
    const nuevoMensaje = new Message({
        user: correoDelUsuario,
        message: mensajeDelUsuario
    });
    await nuevoMensaje.save();
    return nuevoMensaje;
    } catch (error) {
    throw new Error('Error al guardar el mensaje en la base de datos.');
    }
}

/////////

export async function getAllCarts() {
    try {
        const carts = await cartModel.find();
        return carts;
    } catch (error) {
        throw new Error('Error al obtener los carritos de la base de datos.');
    }
}