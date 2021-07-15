const { CartController } = require("../../controllers/index");
const express = require("express");
const routes = express.Router();
const { verifyToken } = require("../../middleware")
let validator = require('express-joi-validation').createValidator({ passError: true })
const { addItem, getCart } = require('../../validators').cart;





routes.post('/item',validator.body(addItem), CartController.addItem);

routes.get('/:cartId/:userId', validator.params(getCart), CartController.getCartDetails);

routes.get('/',  validator.query(getCart),CartController.getCartDetails);

//routes.delete('/item', /*validator.body(removeItem),*/ CartController.removeItem);

module.exports = routes;
