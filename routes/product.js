const express=require("express");
const router=express.Router();

const productController = require("../controllers/product");

router.get('/', productController.getIndex);

router.get('/about',  productController.isLoggedIn, productController.getAbout);
router.get('/contact',  productController.isLoggedIn, productController.getContact);
router.get('/shipping',  productController.isLoggedIn, productController.getShipping);
router.get('/kitchen',  productController.isLoggedIn, productController.getKitchen);
router.get('/care', productController.isLoggedIn, productController.getCare);
router.get('/hold', productController.isLoggedIn, productController.getHold);

router.get('/fruits', productController.isLoggedIn, productController.getFruits);
router.get('/sweets', productController.isLoggedIn, productController.getSweets);

router.get('/organic', productController.isLoggedIn, productController.getOrganic);
router.post('/place-order', productController.isLoggedIn, productController.postplaceOrder);

router.get('/subscribe', productController.isLoggedIn, productController.getSubscribe);
router.post('/subscribe', productController.isLoggedIn, productController.postSubscribe);

router.get('/payment',  productController.isLoggedIn, productController.getPayment);
router.post('/payment',  productController.isLoggedIn, productController.postPayment);

router.get('/orders',  productController.isLoggedIn, productController.getOrders);
router.get('/privacy',   productController.getPrivacy);
router.get('/terms',   productController.getTerms);
router.get('/cancellation',   productController.getCancellation);

router.post('/contact',  productController.isLoggedIn, productController.postContact);

module.exports=router;
