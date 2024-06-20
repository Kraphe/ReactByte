const express = require('express');
const router = express.Router();
const {register} = require('../controllers/registerController')
const {login,logout} = require('../controllers/loginController')
const {me} =require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const {refresh} = require('../controllers/refreshController')
const {create,update,remove,getProducts,getSingleProduct,getProductIdWise} = require('../controllers/productController')
const adminMiddleware=require('../middlewares/adminMiddleware');
const {saveOrder, getOrder} =require('../controllers/orderController');

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/me',authMiddleware,me)
router.post('/refresh',refresh)


router.post('/order',saveOrder)
router.get('/order/:userId',getOrder)


router.post('/product/cart-item',getProductIdWise)

//  [auth, admin]  this is what will be used

// router.post('/product',[authMiddleware,adminMiddleware],create);
router.post('/product',create);
router.put('/product/:id',[authMiddleware,adminMiddleware],update)
router.delete('/product/:id',[authMiddleware,adminMiddleware],remove)
router.get('/product',getProducts)
router.get('/product/:id',getSingleProduct)


module.exports= router;