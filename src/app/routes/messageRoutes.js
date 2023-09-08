import express from 'express';
import Message from '../dao/models/message.js';

const router = express.Router();

// Ruta para enviar un mensaje
router.post('/', async (req, res) => {
    try {
    const { user, message } = req.body;
    const newMessage = new Message({ user, message });
    await newMessage.save();
    res.status(201).json({ message: 'Mensaje enviado exitosamente' });
    } catch (error) {
    res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});

export default router;
