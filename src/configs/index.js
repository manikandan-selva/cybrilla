const discountRules = require('./discountRules');

module.exports = {
    dbConfig: require('./db.config'),
    messages: require('./codeMsgs'),
    statusCodes: require('./httpCodes'),
    config:require("./config.js"),
    discountRules:require('./discountRules')
}