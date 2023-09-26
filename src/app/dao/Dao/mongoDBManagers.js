import { ProductModel }  from '../models/product.js';
import Message from '../models/message.js';
import { cartModel } from '../models/cart.js';



export async function getAllProducts(page = 1, limit = 5) {
    try {
        const skip = (page - 1) * limit;
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await ProductModel.paginate({}, { limit, page });

        // Obtén la lista de productos de tu función getAllProducts()
        const products = docs.map(product => ({
            title: product.title,
            price: product.price,
            stock: product.stock,
        }));

        const prevLink = hasPrevPage ? `/products?page=${prevPage}` : null;
        const nextLink = hasNextPage ? `/products?page=${nextPage}` : null;

        return {
            products,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            prevLink,
            nextLink
        };
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