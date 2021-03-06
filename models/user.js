const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema= new Schema({
  name:{
    type: String,
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
  pin:{
    type: Number,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  },
  amount:{
    type:Number
  },
  suncoin:{
    type: Number
  },
  merchant:{
    type: String
  }

});

userSchema.methods.addToCart = function(product,quantity) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};


module.exports=mongoose.model('User',userSchema);
