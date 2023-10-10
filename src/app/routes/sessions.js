import { Router } from "express";
import { userModel } from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from 'passport';


const router = Router();

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (!user) {
//         return res.status(401).send({ status: "error", error: "Email Incorrecto" });
//     };
//     if (!isValidPassword(user, password)) {
//         return res.status(401).send({ status: 'error', error: 'Contraseña incorrecta' })
//     }

//     // Establece el rol del usuario según las credenciales
//     if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//         user.role = 'admin';
//     } else {
//         user.role = 'usuario';
//     }

//     delete user.password;
//     req.session.user = user
//     req.session.user = {
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         age: user.age,
//         role: user.role
//     }

//     // Redirigir al usuario a la vista de productos después del inicio de sesión exitoso
//     res.redirect('/products');
// })

router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}) ,async (req, res) => {
    if (!req.user) {
        return res.status(400).send({status: "error", error: "Credenciales invalidas"});
    }
    delete req.user.password;
    req.session.user = req.user;
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }
    res.redirect('/products');
})
router.get('/failLogin', (req,res)=> {
    res.send({error: "Failed login"})
})





// router.post('/register', async (req, res) => {
//     const { first_name, last_name, email, age, password } = req.body;
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//         return res.status(400).send({ status: "error", error: "Ya existe usuario con ese email" });
//     };
//     const user = {
//         first_name,
//         last_name,
//         email,
//         age,
//         password: createHash(password)
//     };
//     let result = await userModel.create(user);
//     res.send({status:"success", message: "User registered"})
// })


router.post('/register', passport.authenticate('register', {failureRedirect: '/failRegister'}) ,async (req, res) => {
    res.send({status: "success", message: "Usuario registrado"})
})

router.get('/failRegister', async(req, res)=> {
    console.log("Fallo la estrategia");
    res.send({error:"Failed register"});
})








router.post('/restartPassword', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ status: "error", error: "Datos incompletos" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).send({ status: "error", error: "No existe el usuario" });
    }
    const passwordHash = createHash(password);
    await userModel.updateOne({ email }, { $set: { password: passwordHash } })
})

export default router;