import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    title: String,
    price: Number,
    quantity: Number,
  }],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);

  
