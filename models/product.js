const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const productSchema=new Schema({
  pname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description:{
    type: String,
  },
  imageurl:{
    type: String,
  },
  category:{
    type: String,
    required: true
  },
  quantity:{
    type: String,
    required: true
  },
  pin:{
    type:Number,
    required: true
  },
  subcat:{
    type:String,
    required: true
  },
  merchant_name:{
    type: String
  }
});
module.exports= mongoose.model('Product', productSchema);
