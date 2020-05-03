const Product=require("../models/product");
exports.getAddProduct=(req,res,next)=>{
  res.render("add-product",{
    title: "Add Product"
  })
}
exports.isAdmin=(req,res,next)=>{
    if(req.session.user.merchant!='true'){
      res.render("error",{
        title: "Error404"
      });
    }
    next();
}
exports.postAddProduct=(req,res,next)=>{
  const merchant_name=req.body.merchant_name;
  const pname=req.body.pname;
  const price=req.body.price;
  const pin=req.body.pin;
  const quantity=req.body.quantity;
  const cat=req.body.cat;
  const subcat=req.body.subcat;
  const imageurl=req.body.imageurl;
  const description=req.body.description;

  const product=new Product({
      quantity:quantity,
      category: cat,
      subcat: subcat,
      pname: pname,
      description: description,
      price: price,
      imageurl: imageurl,
      pin: pin,
      quantity: quantity,
      merchant_name: merchant_name
    });
    product.save()  .then(result => {
      res.render('add-product',{
        title: "Add Product"
      });
    })
    .catch(err => {
      console.log(err);
    });
}
