const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  amount:{
    type:Number
  },
  payment_id:{
    type: String
  }
});

module.exports = mongoose.model('Order', orderSchema);
