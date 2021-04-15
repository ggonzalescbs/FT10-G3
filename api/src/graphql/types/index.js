const categoryType = require("./categoryType")
const productType = require("./productType")
const userType = require("./userType")
const reviewType = require("./reviewType")
const errorType = require("./errorType")
const orderType = require("./orderType")
const linealOrderType = require("./linealOrderType")

// aqui exportas tu type
module.exports = `
    ${categoryType}
    ${productType}
    ${userType}
    ${reviewType}
    ${errorType}
    ${orderType}
    ${linealOrderType}
`
