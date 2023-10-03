import express  from 'express';

const router = express.Router();

// Ruta para buscar un producto por su código
router.get('/:code', async (req, res) => {
    try {
        const code = parseInt(req.params.code);
        const product = await Product.findOne({ code });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el producto' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const product = new Product(newProduct);
        await product.save();
        res.json({ message: 'Producto agregado exitosamente', product });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

// Ruta para actualizar un producto por su código
router.put('/:code', async (req, res) => {
    try {
        const code = parseInt(req.params.code);
        const updatedFields = req.body;
        const product = await Product.findOneAndUpdate({ code }, updatedFields, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado exitosamente', product });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Ruta para eliminar un producto por su código
router.delete('/:code', async (req, res) => {
    try {
        const code = parseInt(req.params.code);
        const product = await Product.findOneAndDelete({ code });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente', product });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;
