import express, { json } from 'express';
import __dirname from './utils.js';
import cartRoutes from './routes/cartRoutes.js';
import exphbs from 'express-handlebars'; // Importa express-handlebars en lugar de handlebars
import path from 'path'; // Importa el módulo path
import viewsRoutes from './views/views.js';
import messageRoutes from './routes/messageRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8080;
global.PORT = 8080; // Definición global de PORT

// Login
app.use(cookieParser('CoderSecretCode'));

app.get('/setCookie', (req, res) => {
  res.cookie('ProyectCookie', 'Soy una cookie',{signed:true}).send("Soy una cookie llamada pepe");
});
app.get('/getCookie', (req, res) => {
  res.send(req.cookies);
});


const hbs = exphbs.create({
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true,
});

// Configuración de Handlebars para las vistas
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views')); // Utiliza path.join para configurar la carpeta de vistas
app.set('view engine', 'handlebars');

app.use(json());

app.use('/', viewsRoutes);
app.use('/api/carts', cartRoutes);
app.use('/cart', cartRoutes);
app.get('/Cookie', (req,res)=> {
  res.render('cookies')
})

app.post('/cookie', (req,res)=> {
  const data = req.body;
  res.cookie('CoderCookie', data, {maxAge: 100000}).send({status: "success", message: "cookie set"})
})



// Rutas de mensajes
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const connection = mongoose.connect('mongodb+srv://happycriptos:TiC5aYJ7Xqm95mpS@cluster0.sxkqexk.mongodb.net/ecommerce',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
})


app.post('/api/carts/products', async (req, res) => { // Cambio de 'products' a '/api/carts/products'
  try {
    const { cartId, productId } = req.params;
    res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});


