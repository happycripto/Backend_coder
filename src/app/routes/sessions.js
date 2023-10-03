import { Router } from "express";
import { userModel } from "../dao/models/user.js";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

    if (!user) {
        return res.status(400).send({ status: "error", error: "credenciales incorrectas" });
    }

    // Establece el rol del usuario según las credenciales
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        user.role = 'admin';
    } else {
        user.role = 'usuario';
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role // Agrega el campo de rol al usuario de la sesión
    }

    // Redirigir al usuario a la vista de productos después del inicio de sesión exitoso
    res.redirect('/products');
})


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
        return res.status(400).send({ status: "error", error: "Ya existe usuario con ese email" });
    };
    const user = {
        first_name, last_name, email, age, password
    };
    let result = await userModel.create(user);
    res.send({status:"success", message: "User registered"})
})

export default router;