
const { statusCodes, config } = require('../configs');
const { CartService } = require('../services')
const utils = require("../utils");
class CartController {

}


CartController.addItem = async (req, res, next) => {
    try {
        
        let result = await CartService.addItem({
            ...req.body
        });
        res.status(result.code).json({
            status: config[result.code] || "fail",
            message: result.message,
            data: result.data
        });
    } catch (err) {
        ;
        next({
            status: statusCodes.HTTP_INTERNAL_SERVER_ERROR
        });
    }
}

CartController.removeItem = async (req, res, next) => {
    try {
        
        let condition = Object.assign(req.params, req.query);
        let result = await ProductService.removeItem({
            ...req.body
        },{...condition});

        res.status(result.code).json({
            status: config[result.code] || "fail",
            message: result.message,
            data:result.data
        });
    } catch (err) {
        ;
        next({
            status: statusCodes.HTTP_INTERNAL_SERVER_ERROR
        });
    }
}

CartController.getCartDetails = async (req, res, next) => {
    try {
        
        let params = Object.assign(req.query, req.params);
        let result = await CartService.getCartDetails(params);

        res.status(result.code).json({
            status: config[result.code] || "fail",
            message: result.message,
            data:result.data,
            pageMeta:result.pageMeta
        });
    } catch (err) {
        ;
        next({
            status: statusCodes.HTTP_INTERNAL_SERVER_ERROR
        });
    }
}

CartController.createDiscount = async (req, res, next) => {
    try {
        
        let result = await ProductService.createDiscount({
            ...req.body
        });

        res.status(result.code).json({
            status: config[result.code] || "fail",
            message: result.message,
            data: result.data
        });
    } catch (err) {
        ;
        next({
            status: statusCodes.HTTP_INTERNAL_SERVER_ERROR
        });
    }
}

CartController.updateDiscount = async (req, res, next) => {
    try {
        
        let condition = Object.assign(req.params, req.query);
        let result = await ProductService.updateDiscount({
            ...req.body
        },{...condition});

        res.status(result.code).json({
            status: config[result.code] || "fail",
            message: result.message,
            data:result.data
        });
    } catch (err) {
        ;
        next({
            status: statusCodes.HTTP_INTERNAL_SERVER_ERROR
        });
    }
}

CartController.getDiscounts = async (req, res, next) => {
    try {
        
        let params = Object.assign(req.query, req.params);
        let result = await ProductService.getDiscounts(params);

        res.status(result.code).json({
            status: config[result.code] || "fail",
            message: result.message,
            data:result.data,
            pageMeta:result.pageMeta
        });
    } catch (err) {
        ;
        next({
            status: statusCodes.HTTP_INTERNAL_SERVER_ERROR
        });
    }
}


export { CartController };