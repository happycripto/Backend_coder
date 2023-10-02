// export function addToCart(productId) {
//     // Realiza una solicitud POST para agregar el producto al carrito
//     fetch(`/api/carts/cartId/addProduct/${productId}`, {
//         method: 'POST',
//         })
//         .then((response) => {
//             if (response.status === 200) {
//             alert('Producto agregado al carrito exitosamente.');
//             } else {
//             alert('Error al agregar el producto al carrito.');
//             }
//         })
//         .catch((error) => {
//             console.error('Error al agregar el producto al carrito:', error);
//             alert('Error al agregar el producto al carrito.');
//         });
// }