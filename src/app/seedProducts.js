import mongoose from 'mongoose';
import { ProductModel } from './dao/models/product.js';

const mongoURI = 'mongodb+srv://happycriptos:TiC5aYJ7Xqm95mpS@cluster0.sxkqexk.mongodb.net/ecommerce'; // Utiliza tu cadena de conexión
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    seedProducts();
  })
  .catch((error) => {
    console.error('Error en la conexión a MongoDB:', error);
  });

  function seedProducts() {
    const productsToSeed = [
      {
        title: 'Producto 1',
        description: 'Descripción del Producto 1',
        price: 100,
        thumbnail: 'url_del_thumbnail_1',
        code: 1,
        stock: 10,
      },
      {
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 200,
        thumbnail: 'url_del_thumbnail_2',
        code: 2,
        stock: 5,
      },
      {
        title: 'Producto 3',
        description: 'Descripción del Producto 3',
        price: 150,
        thumbnail: 'url_del_thumbnail_3',
        code: 3,
        stock: 8,
      },
      {
        title: 'Producto 4',
        description: 'Descripción del Producto 1',
        price: 100,
        thumbnail: 'url_del_thumbnail_1',
        code: 1,
        stock: 10,
      },
      {
        title: 'Producto 5',
        description: 'Descripción del Producto 2',
        price: 200,
        thumbnail: 'url_del_thumbnail_2',
        code: 2,
        stock: 5,
      },
      {
        title: 'Producto 6',
        description: 'Descripción del Producto 3',
        price: 150,
        thumbnail: 'url_del_thumbnail_3',
        code: 3,
        stock: 8,
      },
      {
        title: 'Producto 7',
        description: 'Descripción del Producto 1',
        price: 100,
        thumbnail: 'url_del_thumbnail_1',
        code: 1,
        stock: 10,
      },
      {
        title: 'Producto 8',
        description: 'Descripción del Producto 2',
        price: 200,
        thumbnail: 'url_del_thumbnail_2',
        code: 2,
        stock: 5,
      },
      {
        title: 'Producto 9',
        description: 'Descripción del Producto 3',
        price: 150,
        thumbnail: 'url_del_thumbnail_3',
        code: 3,
        stock: 8,
      },
    ];
  
    // Insertar los productos en la base de datos
    ProductModel.insertMany(productsToSeed)
      .then(() => {
        console.log('Productos insertados con éxito');
        mongoose.connection.close(); // Cierra la conexión después de insertar los productos
      })
      .catch((error) => {
        console.error('Error al insertar productos:', error);
        mongoose.connection.close(); // Cierra la conexión en caso de error
      });
  }
  
  // Ejecuta la función para cargar los productos en la base de datos
  seedProducts();
  