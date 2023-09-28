import express, { json } from 'express';
import __dirname from './utils.js';
import cartRoutes from './routes/cartRoutes.js';
import exphbs from 'express-handlebars'; // Importa express-handlebars en lugar de handlebars
import path from 'path'; // Importa el módulo path
import viewsRoutes from './views/views.js';
import messageRoutes from './routes/messageRoutes.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 8080;

const hbs = exphbs.create({
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true,
});

// Configuración de Handlebars para las vistas
app.use(express.static(path.join(__dirname, 'js')));
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views')); // Utiliza path.join para configurar la carpeta de vistas
app.set('view engine', 'handlebars');

app.use(json());

app.use('/', viewsRoutes);
app.use('/api/carts', cartRoutes);

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




