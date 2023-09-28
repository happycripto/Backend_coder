import { ProductModel }  from '../models/product.js';
import Message from '../models/message.js';
import { cartModel } from '../models/cart.js';



export async function getAllProducts(page = 1, limit = 5) {
    try {
        const skip = (page - 1) * limit;
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await ProductModel.paginate({}, { limit, page });

        // Obtén la lista de productos de tu función getAllProducts()
        const products = docs.map(product => ({
            _id: product._id,
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

// Función para guardar el carrito en la base de datos
export async function saveCartToDatabase(cart) {
    try {
        const savedCart = await cart.save();
        return savedCart;
    } catch (error) {
        throw new Error('Error al guardar el carrito en la base de datos.');
    }
}


// Función para agregar el producto al carrito en MongoDB
export async function agregarProductoAlCarrito(productId, cantidad) {
    try {
        // Primero, busca el carrito existente o crea uno nuevo
        let cart = await cartModel.findOne();
        if (!cart) {
            cart = new cartModel({ products: [] });
        }

        // Busca el producto por su ID
        const product = await ProductModel.findById(productId);

        if (!product) {
            return { status: 'error', message: 'Producto no encontrado' };
        }

        // Verifica si el producto ya existe en el carrito
        const existingProduct = cart.products.find(item => item.productId.equals(productId));

        if (existingProduct) {
            // Si el producto ya existe en el carrito, actualiza la cantidad
            existingProduct.quantity += cantidad;
        } else {
            // Si el producto no existe en el carrito, agrégalo
            cart.products.push({ productId, quantity: cantidad });
        }

        // Guarda el carrito (nuevo o actualizado) en la base de datos
        await cart.save();

        return { status: 'success', message: 'Producto agregado al carrito exitosamente' };
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        return { status: 'error', message: 'Error al agregar producto al carrito' };
    }
}

