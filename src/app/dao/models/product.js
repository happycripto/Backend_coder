import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema( {
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: Number,
    stock: Number,
});

export const Product = mongoose.model(productCollection, productSchema);
