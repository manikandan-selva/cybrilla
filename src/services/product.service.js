import discountRules from "../configs/discountRules";

const { errorObjGeneator } = require("./../middleware").errorHandler;
const { products, sequelize, discounts } = require('../database/models')
const { statusCodes, config, messages } = require('../configs');
const utils = require("./../utils");
const { Op } = require('sequelize');

class ProductService {

}

//products

ProductService.createProduct = async (params) => {
    let transaction;
	try {
		transaction = await sequelize.transaction();
		let result = await products.create(params, {
            transaction: transaction
        });
		if (result) {
            await transaction.commit();
			return {
				code: statusCodes.HTTP_OK,
				message: messages.productAdded,
				data: result
			}
		} else {
			return {
				code: statusCodes.HTTP_NOT_FOUND,
				message: messages.productAdditionFaild
			}
		}
	} catch (err) {
        if (transaction) {
			await transaction.rollback()
		}
		throw errorObjGeneator(err);
	}
}

ProductService.updateProduct = async (params, condition) => {
    let transaction;
	try {
		transaction = await sequelize.transaction();
		
		let result = await products.update(params, {
			transaction: transaction,
			where: condition
		});
		await transaction.commit();
		return {
			code: statusCodes.HTTP_OK,
			message: messages.productUpdated,
			data: result
		}
	} catch (err) {
		if (transaction) {
			await transaction.rollback()
		}
		throw errorObjGeneator(err);
	}
}

ProductService.getProduct = async (params) => {
    try {
		let options = {
            limit: 1000,
            attributes:["productId","productName","quantityAvailable","cost"]
		};
		let page = 0
		let limit = 1000;
		
		if (params.limit) {
			options.limit = parseInt(params.limit);
			page = params.limit;
			delete params.limit;
		}
		if (params.page) {
			page = params.page;
			let offset = parseInt(options.limit * (params.page - 1));
			options.offset = offset >= 0 ? offset : 0;
			delete params.page;
		}
		if(Object.keys(params).length > 0){
			options.where = params;
		}
		console.log(options.offset, options.limit, options);
		let productsList = await products.findAll(options);
		if (productsList && productsList.length) {
			return {
				code: statusCodes.HTTP_OK,
				message: messages.productssRetrived,
                data: productsList,
                pageMeta: utils.getPagingData(productsList.length, page, limit)   
			}
		} else {
			return {
				code: statusCodes.HTTP_NOT_FOUND,
				message: messages.produtsNotFound
			}
		}
	} catch (err) {
		;
		throw errorObjGeneator(err);
	}
}


//discounts

ProductService.createDiscount = async (params) => {
    let transaction;
	try {
		transaction = await sequelize.transaction();
		let result = await discounts.create(params, {
            transaction: transaction
        });
		if (result) {
            await transaction.commit();
			return {
				code: statusCodes.HTTP_OK,
				message: messages.discountAdded,
				data: result
			}
		} else {
			return {
				code: statusCodes.HTTP_NOT_FOUND,
				message: messages.discountAdditionFaild
			}
		}
	} catch (err) {
        if (transaction) {
			await transaction.rollback()
		}
		throw errorObjGeneator(err);
	}
}

ProductService.updateDiscount = async (params, condition) => {
    let transaction;
	try {
		transaction = await sequelize.transaction();
		
		let result = await discounts.update(params, {
			transaction: transaction,
			where: condition
		});
		await transaction.commit();
		return {
			code: statusCodes.HTTP_OK,
			message: messages.discountUpdated,
			data: result
		}
	} catch (err) {
		if (transaction) {
			await transaction.rollback()
		}
		throw errorObjGeneator(err);
	}
}


ProductService.getDiscounts = async (params) => {
    try {
		let options = {
			limit: 1000,
			attributes:["discountId","productId","quantity","discountPercent"],
			include:[
				{
					model:products,
					as:"products",
					attributes:["productId","productName"],
					
				}
			]
		
		};
		let page = 0
		let limit = 1000;
		
		if (params.limit) {
			options.limit = parseInt(params.limit);
			page = params.limit;
			delete params.limit;
		}
		if (params.page) {
			page = params.page;
			let offset = parseInt(options.limit * (params.page - 1));

			options.offset = offset >= 0 ? offset : 0;
			delete params.page;
		}
		if(Object.keys(params).length > 0){
			options.where = params;
		}
		console.log('***********',options.offset, options.limit, options);
		let discountsList = await discounts.findAll(options);
		if (discountsList && discountsList.length) {
			return {
				code: statusCodes.HTTP_OK,
				message: messages.discountsRetrived,
                data: discountsList,
                pageMeta: utils.getPagingData(discountsList.length, page, limit)   
			}
		} else {
			return {
				code: statusCodes.HTTP_NOT_FOUND,
				message: messages.discountsNotFound
			}
		}
	} catch (err) {
		;
		throw errorObjGeneator(err);
	}
}

export { ProductService };