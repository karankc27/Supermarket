const crypto=require("crypto");
const User=require("../models/user");
const bcrypt=require("bcryptjs");
exports.getRegister=(req,res)=>{
  res.render("register",{
    title:"Register"
  })
}

exports.getAccount=(req,res)=>{
  res.render("account",{
    title:"My Account"
  })
}

exports.getLogin=(req,res)=>{
  res.render("login",{
    title:"Login"
  })
}

exports.postRegister=(req,res)=>{
  const email=req.body.email;
  const name=req.body.name;
  const phone=req.body.phone;
  const pin=req.body.pin;
  const address=req.body.address;
  const password=req.body.password;

  crypto.randomBytes(32, (err, buffer) => {
     const token = buffer.toString('hex');
     User.findOne({ $or:[ {'phone':phone}, {'email':email} ]})
    .then(userDoc => {
      if (userDoc) {
        res.render('register',{
          errorMessage:'Phone Number or Email already exists, please pick a different one.',
          title: 'Register'
        });
        console.log("User exists");
      }
      return bcrypt.hash(password, 12);
    })

    .then(hashedPassword => {
      const user= new User({
        email:  email,
        password: hashedPassword,
        name: name,
        phone: phone,
        pin:pin,
        address: address,
      });
  user.save()
  .then(result => {
        console.log(result);

        res.render('login',{
        errorMessage: "Registered Successfully!!",
        title: "Login",
        });
      });
 })
})
}

exports.postAccount=(req,res)=>{
  const email=req.body.email;
  const name=req.body.name;
  const phone=req.body.phone;
  const pin=req.body.pin;
  const address=req.body.address;
  crypto.randomBytes(32, (err, buffer) => {
     const token = buffer.toString('hex');
     User.findOne({ _id: req.user._id })
    .then(user => {
        user.email= email
        user.name= name
        user.phone= phone
        user.pin=pin
        user.address= address
  user.save()
})
  .then(result => {
        console.log(result);
        res.render('account',{
        errorMessage: "Account Details Updated!!",
        title: "My Account",
        });
      });
 })

}


exports.postLogin=(req,res,next) =>{

  const email=req.body.email;
  const password=req.body.password;
  console.log(email);
  User.findOne({email: email})
  .then(user => {
    if(!user){
      console.log("Email Not Registered");
      return res.render("register",{
        errorMessage: "Email Not Registered",
        title: 'Register'
      });
    }
    bcrypt.compare(password, user.password)
    .then(doMatch =>{
      if(doMatch){
        req.session.isLoggedIn=true;
        req.session.user=user;
        return req.session.save(err =>{

          console.log("Logged In");
          return res.redirect("/");

        });

      }

      return res.render("login",{
        errorMessage:"Incorrect Password",
        title: 'Login'
      //  oldemail: email
      });

    })
    .catch(err =>{
      console.log(err);
      res.redirect("/");
    })
  })

};


exports.getLogout=(req,res,next) =>{
  //provided by session package to delete the session
  req.session.destroy(err =>{
    console.log(err);
    res.redirect("/login");
  });
};
