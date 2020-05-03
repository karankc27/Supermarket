const express=require("express");
const router=express.Router();
const adminController=require("../controllers/admin");

router.get("/add-product",adminController.isAdmin, adminController.getAddProduct);
router.post("/add-product",adminController.isAdmin, adminController.postAddProduct);

module.exports=router;
