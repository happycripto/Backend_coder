import express, { json } from 'express';
import __dirname, { authToken } from './utils.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionsRouter from '../app/routes/sessions.js'
import cartRoutes from './routes/cartRoutes.js';
import exphbs from 'express-handlebars'; // Importa express-handlebars en lugar de handlebars
import path from 'path'; // Importa el módulo path
import viewsRoutes from './views/views.js';
import messageRoutes from './routes/messageRoutes.js';
import mongoose from 'mongoose';
import passport from 'passport';
import { initializePassport } from '../config/passport.js';


const app = express();
const PORT = 8080;
global.PORT = 8080; // Definición global de PORT

// Login
app.use(session({
  store: MongoStore.create({
      mongoUrl: 'mongodb+srv://happycriptos:TiC5aYJ7Xqm95mpS@cluster0.sxkqexk.mongodb.net/ecommerce',
      ttl: 3600
  }),
  secret: "CoderSecret",
  resave: false,
  saveUninitialized: false
}))

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
// app.use(express.static(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views')); // Utiliza path.join para configurar la carpeta de vistas
app.set('view engine', 'handlebars');

app.use(json());

app.use('/', viewsRoutes);
app.use('/api/sessions', sessionsRouter)
app.use('/api/carts', cartRoutes);
app.use('/cart', cartRoutes);
app.get('/Cookie', (req,res)=> {
  res.render('cookies')
})

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.post('/cookie', (req,res)=> {
  const data = req.body;
  res.cookie('CoderCookie', data, {maxAge: 100000}).send({status: "success", message: "cookie set"})
})



// Rutas de mensajes
app.use('/api/messages', messageRoutes);

app.get('/api/sessions/current', passport.authenticate('current', { session: false }), (req, res) => {
  res.json({ user: req.user });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const connection = mongoose.connect('mongodb+srv://happycriptos:TiC5aYJ7Xqm95mpS@cluster0.sxkqexk.mongodb.net/ecommerce',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
})




