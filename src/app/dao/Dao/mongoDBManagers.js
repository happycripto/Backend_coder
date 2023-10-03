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
    //    carts = await cartModel.find();
       let carts = await cartModel.find().populate('products.productId'); // Pobla los datos de los productos
        carts = carts.map((doc) => doc.toObject());
  
      // Ajusta la estructura de los carritos para que tengan una propiedad "products" directa
      carts = carts.map((cart) => ({
        cartId: cart._id.toString(),
        products: cart.products,
      }));
  
      console.log(carts);
  
      return carts;
    } catch (error) {
        console.error('Error al obtener los carritos de la base de datos:', error); // Agregar esta línea
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

export async function actualizarCarrito(cartId, newProducts) {
    try {
        const cart = await cartModel.findById(cartId);

        if (!cart) {
        throw new Error('Carrito no encontrado');
        }

        cart.products = newProducts;
        await cart.save();

        return { message: 'Carrito actualizado exitosamente' };
    } catch (error) {
        throw new Error('Error al actualizar el carrito: ' + error.message);
    }
}

export async function eliminarProductoDelCarrito(cartId, productId) {
    try {
        const cart = await cartModel.findById(cartId);

        if (!cart) {
        throw new Error('Carrito no encontrado');
        }

        const productIndex = cart.products.findIndex(
        (item) => item.productId.equals(productId)
        );

        if (productIndex === -1) {
        throw new Error('Producto no encontrado en el carrito');
        }

        cart.products.splice(productIndex, 1);
        await cart.save();

        return { message: 'Producto eliminado del carrito exitosamente' };
    } catch (error) {
        throw new Error('Error al eliminar producto del carrito: ' + error.message);
    }
}
