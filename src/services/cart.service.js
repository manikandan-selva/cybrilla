const { errorObjGeneator } = require("./../middleware").errorHandler;
const { cart, sequelize, discounts, products } = require('../database/models')
const { statusCodes, config, messages,discountRules } = require('../configs');
const utils = require("./../utils");
const { Op } = require('sequelize');

class CartService {

}

//products

CartService.addItem = async (params) => {
    let transaction;
	try {
        transaction = await sequelize.transaction(); 
      let results = await  Promise.allSettled([products.findOne({
            where :{
                productId:params.productId
            }
        }),discounts.findOne({where :{
            productId:params.productId
            }
        })]);
        console.log(results[0].value.dataValues)
            let discountInfo, productInfo;
            

            if(results[0].status  == 'fulfilled'&&results[0].value){
                productInfo = results[0].value.dataValues
			}
			params.cost = params.quantity * productInfo.cost;
			params.discount = 0;
			discountCalculation(params,productInfo.cost,discountInfo)
            if(results[1].status  == 'fulfilled'&&results[1].value){
				discountInfo = results[1].value.dataValues
				params = discountCalculation(params,productInfo.cost,discountInfo)
			}
            
            console.log(params);
            
            let result = await cart.create(params, {
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

CartService.getCartDetails = async (params) => {
    try {
		let options = {
			limit: 1000,
			include:[
				{
					model:products,
					as:"products",
					attributes:["productId","productName","cost"],
					
				},
				{
					model:discounts,
					as:"discounts",
					attributes:["productId","quantity","discountPercent"],
					
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
		console.log(options.offset, options.limit, options);
		let cartInfo = await cart.findAll(options);
		let cartItems = {};
		let totalWithOutDiscounts = 0;
			let totalWithDiscounts = 0;
		if(cartInfo){
			for(let cartItem of cartInfo){
				let item = JSON.parse(JSON.stringify(cartItem));//.dataValues;
				if(cartItems[item.productId] == undefined){
					cartItems[item.productId]=item;
				}else{
					cartItems[item.productId].quantity += item.quantity; 
				}
			}
			let products = Object.keys(cartItems);
			
			let finalItemsInfo = [];
			for(let productId of products){
				let cartItem = cartItems[productId];
				cartItem = discountCalculation(cartItem,cartItem.products.cost,cartItem.discounts);
				totalWithOutDiscounts = totalWithOutDiscounts+cartItem.cost;
				totalWithDiscounts += cartItem.cost - cartItem.discount;
				cartItem.productName = cartItem.products.productName;
				delete cartItem.products;
				delete cartItem.discounts;
				finalItemsInfo.push(cartItem);
			}
			let additionalDiscount = 0;
			if(totalWithDiscounts>discountRules.aditioonalDiscount.condition){
				
				additionalDiscount = discountRules.aditioonalDiscount.discountAmount;
			}
			let totIncluAdditionDiscount = totalWithDiscounts - additionalDiscount;
			return {
				code: statusCodes.HTTP_OK,
				message: messages.cartDetailsRetrived,
                data: {
					cartDetails:finalItemsInfo,
					"totalWithOutDiscounts":totalWithOutDiscounts,
					"totalWithDiscounts":totalWithDiscounts,
					"additionalDiscount":additionalDiscount,
					"totIncluAdditionDiscount":totIncluAdditionDiscount
				} 
			}
		}else {
			return {
				code: statusCodes.HTTP_NOT_FOUND,
				message: messages.cartDetailsNotFound
			}
		}
		
	} catch (err) {
		;
		throw errorObjGeneator(err);
	}
}

let discountCalculation = (item, actualCost, discountInfo)=>{
	item.cost = item.quantity * actualCost;
	item.discount = 0;
	if(discountInfo){
		
		let discountTreshhold = Math.floor(item.quantity/discountInfo.quantity);
		let discountAmount = 0;
		
		let discountForEachItem = discountInfo.discountPercent*actualCost/100;
		let disMod = Math.round(discountForEachItem%1*10)/10;
		console.log(disMod);
		if(disMod>0.5){
				discountForEachItem = Math.round(discountForEachItem);
		}
		
		if(discountTreshhold){
			discountAmount = discountTreshhold * discountInfo.quantity*discountForEachItem;
		}
		item.discount = discountAmount;
		
	}
	item.afterDiscountCost = item.cost-item.discount;
	return item;
}
export { CartService };