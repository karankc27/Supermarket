exports.get404= (req,res,next)=>{
  res.render("error",{
    title: "Error404"
  });
}
