const express=require('express');
const router=express.Router();

const productApi = require('../controllers/api/product');

router.get('/product', productApi.getProducts);

router.delete('/product/:id', productApi.destroy);

router.post('/product/create', productApi.createProduct);

router.post('/product/:id/update_quantity', productApi.update_quantity);


module.exports=router;