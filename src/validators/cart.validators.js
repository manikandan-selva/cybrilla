const Joi = require('joi')
const { statusCodes } = require('../configs')

// add joi schema

const addItem = Joi.object().keys({
    userId: Joi.string().required(),
   cartId: Joi.number().required(),
   productId:Joi.number().required(),
   quantity:Joi.number().required()
});

const getCart = Joi.object().keys({
    userId: Joi.string().required(),
   cartId: Joi.number().required()
});




module.exports = {
    addItem,
    getCart
}


