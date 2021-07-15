const { ProductController } = require("../../controllers");
const express = require("express");
const routes = express.Router();
const { verifyToken } = require("../../middleware");
const { add } = require("winston");
let validator = require('express-joi-validation').createValidator({ passError: true })
const { createProduct, updateProduct, productId } = require('../../validators').product;
const { createDiscount, updateDiscount } = require('../../validators').discount;







routes.post('/discount', validator.body(createDiscount), ProductController.createDiscount);

routes.get('/discount', ProductController.getDiscounts);

routes.get('/discount/:discountId', ProductController.getDiscounts);

routes.put('/discount', validator.query(productId),validator.body(updateDiscount), ProductController.updateDiscount);


routes.post('/', validator.body(createProduct), ProductController.createProduct);

routes.get('/', ProductController.getProduct);

routes.get('/:productId', ProductController.getProduct);

routes.put('/', validator.query(productId),validator.body(updateProduct), ProductController.updateProduct);


module.exports = routes;
