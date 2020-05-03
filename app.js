const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const path=require("path");
const mongoose=require("mongoose");
const session=require("express-session");
const isAuth = require('./middleware/is-auth');
const User=require("./models/user");
const MongoDBStore=require("connect-mongodb-session")(session);
const csrf=require('csurf');

const MONGODB_URI= "mongodb+srv://karthik:rebalstar@cluster0-pkbr5.gcp.mongodb.net/sunmart?retryWrites=true&w=majority";
const store=new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const productController=require("./controllers/product")
const csrfProtection=csrf();


app.set("view engine","ejs");
app.set('views','views');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'public')));


app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
   })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});
app.post("/payment", productController.postPayment);
app.use(csrfProtection);

app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLoggedIn;
  res.locals.errorMessage=false;
  res.locals.csrfToken=req.csrfToken();
  if(req.session.isLoggedIn) {
    res.locals.name=req.session.user.name;
    res.locals.email=req.session.user.email;
    res.locals.pin=req.session.user.pin;
    res.locals.phone=req.session.user.phone;
    res.locals.address=req.session.user.address;
    res.locals.id=req.session.user._id;
    if(req.session.user.merchant==="true"){
    res.locals.isAdmin=true;
  }
  else{
    res.locals.name=null;
    res.locals.email=null;
    res.locals.isAdmin=false;
  }
  }
  else{
    res.locals.isAdmin=false;
  }
  next();
});

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

const adminRoutes=require("./routes/admin");
app.use(adminRoutes);
const productRoutes= require("./routes/product");
app.use(productRoutes);
const authRoutes=require("./routes/auth");
app.use(authRoutes);
const errorController=require("./controllers/error");
app.use(errorController.get404);


mongoose.connect(MONGODB_URI).then(result=>{
  app.listen(process.env.PORT||3000);

}).catch(error=>{
  console.log(error);
});
