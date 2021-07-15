

const initializeRoutes = (app) => {
    app.use('/api/v1/cart', require('./v1/cart.routes'))
    app.use('/api/v1/product', require('./v1/product.routes'))
};

module.exports = initializeRoutes