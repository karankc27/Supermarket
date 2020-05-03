const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth");


router.get('/register', authController.getRegister);
router.get('/login', authController.getLogin);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);
router.post('/account', authController.postAccount);
router.get('/account', authController.getAccount);

module.exports=router;
