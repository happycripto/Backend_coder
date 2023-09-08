import { Router } from 'express';
import Message from '../models/message.js';

const router = Router();

// Ruta para cargar la vista del chat
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.render('chat', { messages });
    } catch (error) {
        console.error('Error al cargar el chat:', error);
        res.status(500).send('Error al cargar el chat');
    }
});

// Ruta para enviar un mensaje al chat
router.post('/send', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = new Message({ user, message });
        await newMessage.save();
        res.redirect('/chat'); // Redirige de vuelta al chat después de enviar el mensaje
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).send('Error al enviar el mensaje');
    }
});

export default router;
