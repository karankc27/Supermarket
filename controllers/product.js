const Product=require("../models/product");
const User=require("../models/user");
const Order=require("../models/order");

exports.isLoggedIn=(req,res,next)=>{
    if(!req.session.user){
      res.redirect("/login");
    }
    next();
}
exports.getIndex= (req,res,next) => {
  //if(req.user){
  //   User.findOne({_id: req.session.user._id}).populate('cart.items')
  //   .then(result=>{
  //     console.log(result.cart.items);
  //     cart.push(result);
  //   })
  // }
  // console.log(cart);
  // res.render("index",{
  //   title:"Home",
  //   cart:cart
  // });

  //   console.log(cart);
  //
  //       res.render("index",{
  //       products: products,
  //       cart: JSON.stringify(cart),
  //       title: "Home"
  //     })
  //   })
  //   .catch(err => {
  //     const error = new Error(err);
  //     error.httpStatusCode = 500;
  //     return next(error);
  //   });
  Product.find()
  .then(products=>{
    res.render("index",{
      csrfToken: req.csrfToken(),
      title: "Home",
      products: products,
      head: "Products",
    })
  });
}

exports.getAbout= (req,res)=>{
  res.render("about",{
    title:"About Us"
  })
}

exports.getPrivacy= (req,res)=>{
  res.render("privacy",{
    title:"Privacy Policy"
  })
}

exports.getTerms= (req,res)=>{
  res.render("terms",{
    title:"Terms and Conditions"
  })
}

exports.getCancellation= (req,res)=>{
  res.render("cancellation",{
    title:"Cancellation/Refund"
  })
}

exports.getContact=(req,res)=>{
  res.render("contact",{
    title:"Contact Us"
  })
}

exports.getOffer=(req,res)=>{
  res.render("offer",{
    title:"Offers"
  })
}

exports.getShipping=(req,res)=>{
  res.render("shipping",{
    title:"Shipping"
  })
}
exports.getKitchen=(req,res)=>{
  let totalProducts;
  let subcat=req.query.cat;
  let pin=req.user.pin;
  console.log(pin);
  Product.find({subcat: subcat, pin:{ $lte: pin+5 || 1000000000, $gte: pin-5 || 0 }})
  .then(products=>{
    res.render("kitchen",{
      csrfToken: req.csrfToken(),
      title: "Kitchen ",
      products: products,
      head: subcat.toUpperCase(),
    })
  })
}

exports.getCare=(req,res)=>{
  let totalProducts;
  let subcat=req.query.cat;
  let pin=req.user.pin;
  console.log(pin);
  Product.find({subcat: subcat, pin:{ $lte: pin+5 || 1000000000, $gte: pin-5 || 0 }})
  .then(products=>{
    res.render("care",{
      title: "Personal Care ",
      products: products,
      head: subcat.toUpperCase()
    })
  })
}

exports.getHold=(req,res)=>{
  let totalProducts;
  let subcat=req.query.cat;
  let pin=req.user.pin;
  console.log(pin);
  Product.find({subcat: subcat, pin:{ $lte: pin+5 || 1000000000, $gte: pin-5 || 0 }})
  .then(products=>{
    res.render("hold",{
      title: "Household ",
      products: products,
      head: subcat.toUpperCase()
    })
  })
}

exports.getFruits=(req,res)=>{
  let totalProducts;
  let pin=req.user.pin;
  console.log(pin);
  Product.find({category: 'fruits', pin:{ $lte: pin+5 || 1000000000, $gte: pin-5 || 0 }})
  .then(products=>{
    res.render("fruits",{
      csrfToken: req.csrfToken(),
      title: "Fruits and Vegetables",
      products: products,
      head: "Fruits and Vegetables",
    })
  })
}

exports.getSweets=(req,res)=>{
  let totalProducts;
  let pin=req.user.pin;
  console.log(pin);
  Product.find({category: 'sweets', pin:{ $lte: pin+5 || 1000000000, $gte: pin-5 || 0 }})
  .then(products=>{
    res.render("sweets",{
      csrfToken: req.csrfToken(),
      title: "Sweets",
      products: products,
      head: "Sweets",
    })
  })
}

exports.getOrganic=(req,res)=>{
  res.render("organic",{
      title: "Organic Food ",
  })
}


exports.postplaceOrder=(req,res)=>{
  const amount=req.body.final;
  var obj=req.body.products;

  const b = [];

  for(product in obj){
    const id=obj[product].id;
    const quantity=obj[product].quantity;
      b.push({productId: id, quantity: quantity});
  }
  User.findOne({_id: req.user._id}).then(result =>{
    result.cart.items=[];
    result.amount=amount;
    result.cart.items.push(...b);
    result.save();
    res.redirect("/payment");
  })

}

exports.getSubscribe=(req,res)=>{
  let cat=req.query.cat;
  let img;
  if(cat=='milk'){
     img='https://www.sheknows.com/wp-content/uploads/2018/08/b76loahvqodmg0jsurpb.jpeg';
     price="Rs 1100/month";
  }else if(cat=='vegetables') {
    img='https://healthyliving.natureloc.com/wp-content/uploads/2015/08/How-to-reduce-the-intake-of-pesticidal-residues-from-fruits-and-vegetables.jpg';
    price="";
  }
  else if(cat=='fruits'){
    img="https://www.pixelstalk.net/wp-content/uploads/2016/08/All-Fruit-Wallpaper-HD-Resolution.jpg";
    price="";
  }
  else{
    img="https://wallpapercave.com/wp/wp1903780.jpg";
    price="";
  }
  res.render('subscribe',{
    title: "Monthly Subscription",
    img: img,
    cat: cat,
    price: price
  })
}

exports.postSubscribe=(req,res)=>{
  const name=req.body.name;
  const email=req.body.email;
  const phone=req.body.phone;
  const address=req.body.address;
  const pin=req.body.pin;
  const time=req.body.time;
  const cat=req.body.category;
  if(cat=="milk")price=1100;
  else price="NA";
  let start=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>mail</title></head><body><div class="checkout-right">
    <h4>Name: ${name}</span></h4>
    <h4>Phone: ${phone}</span></h4>
    <h4>Address: ${address}</span></h4>
    <h4>Pincode: ${pin}</span></h4>
    <h4>Email:<span id="pLength">${email}</span></h4>

    <h4>Time:<span id="pLength">${time}</span></h4>
    <h4>Category:<span id="pLength">${cat}</span></h4>
    <h4>Total: Rs ${price}</span></h4>
    `;

  var nodemailer=require('nodemailer');
     var transporter= nodemailer.createTransport({
       service: 'gmail',
       auth:{
         user: 'sunorganicmart@gmail.com',
         pass: 'Rebalstar@99'
       }
     });
var maillist=[email,'sunorganicmart@gmail.com'];
var mailOptions={
from: 'SunMart',
to: maillist,
subject: "Monthly Subscription",
html:start
}

transporter.sendMail(mailOptions,function(error,info){
if(error){
  console.log(error);
}
else{
  console.log("Email sent!!"+info.response);
}
});
res.redirect("/");
}

exports.getPayment=(req,res,next)=>{
  let products;
  let price;

  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const total=user.amount;
      price=total;
      const Razorpay= require("razorpay");

      var instance = new Razorpay({
      key_id: 'rzp_live_CryGYAtfe7k2C2',
      key_secret: 'cBXlPX6V0elKdJJuRTl1QoTg'
    })
    var options = {
      amount: total,  // amount in the smallest currency unit
      currency: "INR"
    };

    let orderid;
    instance.orders.create(options, function(err, order) {
      console.log(order);
      orderid=order._id;
    });
      products = user.cart.items;
        res.render("payment",{
          title:"Payment",
          products: products,
          total: price,
          orderid:orderid
        });
  });
}

exports.postPayment=(req,res,next)=>{

let products;
  var price;
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {

            const total=user.amount;
            price=total;
            products = user.cart.items;
            let coin=total/100;
                  if(user.suncoin){
                  let suncoin=user.suncoin;
                  user.suncoin=suncoin+coin;

                }
                else{

                  user.suncoin=coin;

                }
                console.log(user.suncoin);
                  user.save();

            let start=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>mail</title></head><body><div class="checkout-right">
              <h4>Payment Id: ${req.body.razorpay_payment_id}</span></h4>
              <h4>Name: ${user.name}</span></h4>
              <h4>Phone: ${user.phone}</span></h4>
              <h4>Address: ${user.address}</span></h4>
              <h4>Pincode: ${user.pin}</span></h4>
              <h4>Payment Mode: ${req.body.mode}</span></h4>

              <h4>Products:<span id="pLength">${products.length}</span></h4>
            <div class="table-responsive"><table class="timetable_sub" border="2"><thead>
                          <tr>
                              <th>SL No.</th>&nbsp;
                              <th>Merchant Name</th>&nbsp;
                              <th>Product</th>&nbsp;
                              <th>Quantity</th>&nbsp;
                              <th>Product Name</th>&nbsp;
                              <th>Price</th>&nbsp;
                              <th>Total</th>
                            </tr>
                        </thead>
                      <tbody id="productList">`;
                let end=`
                <tr class="rem1">
            <td class="invert"></td>
            <td class="invert-image">
            </td>
            <td class="invert">
              <div class="quantity">
              </div>
            </td>
            <td class="invert"></td>
            <td class="invert"><b>Total:</b></td>
            <td class="invert">
              <div class="rem">
                <div class="close1"> <b>Rs`+total+`</b></div>
              </div>
            </td>

          </tr>


                </tbody>
                    </table>

                </div><br>
                The order will be delivered within 2 days. Updates will be sent to your mail and phone number. Thank You for your cooperation :).

                </div></body></html>`;
                let y=start;
                let i=0;
            products.forEach(p => {i++
              let x=`<tr class="rem1">
          <td class="invert">`+i+`</td>&nbsp;
          <td class="invert">`+p.productId.merchant_name+`</td>&nbsp;
          <td class="invert-image">
              <img src="`+ p.productId.imageurl +`" style="width:150px;height:100px;" alt=" " class="img-responsive">
          </td>&nbsp;
          <td class="invert">
            <div class="quantity">
              <div class="quantity-select">
                <div class="entry value-minus">&nbsp;</div>
                <div class="entry value">
                  <span>`+p.quantity+`</span>
                </div>
                <div class="entry value-plus active">&nbsp;</div>
              </div>
            </div>
          </td>&nbsp;
          <td class="invert">`+p.productId.pname+`</td>&nbsp;
          <td class="invert">Rs`+p.productId.price+`</td>&nbsp;
          <td class="invert">
            <div class="rem">
              <div class="close1">Rs`+ p.quantity* p.productId.price+`</div>
            </div>
          </td>&nbsp;
        </tr>
          `;
          y=y+""+x;
            });
            y=y+""+end;
            var nodemailer=require('nodemailer');
               var transporter= nodemailer.createTransport({
                 service: 'gmail',
                 auth:{
                   user: 'sunorganicmart@gmail.com',
                   pass: 'Rebalstar@99'
                 }
               });
      var maillist=[user.email,'sunorganicmart@gmail.com'];
      var mailOptions={
        from: 'SunMart',
        to: maillist,
        subject: "New Order",
        html:y
      }

      transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
          }
          else{
            console.log("Email sent!!"+info.response);
          }
        });
        const order = new Order({
        user: user,
        products: user.cart.items,
        amount: price,
        payment_id: req.body.razorpay_payment_id
      });
      return order.save();
    });
        res.redirect("/orders");

}

exports.getOrders=(req,res,next)=>{
  suncoin=req.user.suncoin;
  Order.find({ 'user': req.user._id })
    .then(orders => {
      res.render('orders', {
        title: 'Your Orders',
        orders: orders,
        suncoin: suncoin,

      });
    })
    .catch(err => {
      console.log(err);
    });
};



exports.postContact = (req, res, next) => {
const name=req.body.name;
const email=req.body.email;
const message=req.body.message;
var nodemailer=require('nodemailer');
var transporter= nodemailer.createTransport({
     service: 'gmail',
     auth:{
       user: 'sunorganicmart@gmail.com',
       pass: 'Rebalstar@99'
     }
   });
var mailOptions={
from: email,
to: 'sunorganicmart@gmail.com',
subject: "Customer Query",
text: "From: "+name+" "+email+" \n"+message
}

transporter.sendMail(mailOptions,function(error,info){
if(error){
console.log(error);
}
else{
console.log("Email sent!!"+info.response);
}
});
res.redirect("/");

};
