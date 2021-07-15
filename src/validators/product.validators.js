const Joi = require('joi')
const { statusCodes } = require('../configs')

// add joi schema

const createProduct = Joi.object().keys({
   quantityAvailable: Joi.number().required(),
    productName: Joi.string().required(),
    cost: Joi.number().required()
});

const updateProduct = Joi.object().keys({
   quantityAvailable: Joi.number().required(),
   productName: Joi.string().required(),
   cost: Joi.number().required()
});
const productId = Joi.object().keys({
   productId:Joi.number().required()
})

module.exports = {
   createProduct,
   productId,
   updateProduct
}


