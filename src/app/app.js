import express, { json } from 'express';
// import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import exphbs from 'express-handlebars';
import __dirname from './utils.js';
import path from 'path';
import viewsRoutes from '../app/view/views.js';
import { connect } from 'mongoose';

const app = express();
const PORT = 8080;

// Configuración de Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(json());

app.use('/', viewsRoutes);
// app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


const mongoURI = 'mongodb+srv://happycriptos:TiC5aYJ7Xqm95mpS@cluster0.sxkqexk.mongodb.net/ecommerce';
connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error en la conexión a MongoDB:', error);
  });


