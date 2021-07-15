
const { statusCodes, config } = require('../configs');
const { ProductService } = require('../services')
const utils = require("../utils");
class ProductController {

}


ProductController.createProduct = async (req, res, next) => {
    try {
        
        let result = await ProductService.createProduct({
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

ProductController.updateProduct = async (req, res, next) => {
    try {
        
        let condition = Object.assign(req.params, req.query);
        let result = await ProductService.updateProduct({
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

ProductController.getProduct = async (req, res, next) => {
    try {
        
        let params = Object.assign(req.query, req.params);
        let result = await ProductService.getProduct(params);

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

ProductController.createDiscount = async (req, res, next) => {
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

ProductController.updateDiscount = async (req, res, next) => {
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

ProductController.getDiscounts = async (req, res, next) => {
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


export { ProductController };