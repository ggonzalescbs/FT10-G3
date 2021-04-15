const { Order, Lineal_Order, Product, Users } = require("../db")
const {getProductById} = require("./productsService")

async function getAllOrders(){
    try {
        const order = await Order.findAll({
            where:{
                placeStatus:"ticket"
            }
        });
        const out = [];

        for(let i = 0; i < order.length; i++) {
            const element = order[i];
            const formatted = await _formatOrder(element)
            out.push(formatted)
        }
        console.log({ __typename:"order",...out,})
        return out
    } catch (err) {
        throw new Error("Problem getting all orders "+err.message)
    }
}

async function getOrdersByUserIdInTicket(userId){
    try {
        const order = await Order.findAll({
            where: {
                id:userId,
                placeStatus:"ticket"
            }
        })
        const out = [];

        for(let i = 0; i < order.length; i++) {
            const element = order[i];
            const formatted = await _formatOrder(element)
            out.push(formatted)
        }
        return out
    } catch (err) {
        return {
            error: "Problem finding the user ID of order",
            detail: "Possibly the id passed dont exists",
          }
    }
}

async function getOrdersByUserIdInCart(userId){
    try {
        const order = await Order.findAll({
            where: {
                id:userId,
                placeStatus:"cart"
            }
        })
        const out = [];

        for(let i = 0; i < order.length; i++) {
            const element = order[i];
            const formatted = await _formatOrder(element)
            out.push(formatted)
        }
        return out
    } catch (err) {
        return {
            error: "Problem finding the user ID of order",
            detail: "Possibly the id passed dont exists",
          }
    }
}
/**
 * Create new order created by the user
 * By default the placeStatus of the order is "cart"
 * By default the status of the order id "unpaid"
 * @param  {array} products array of products with the id and quantity, 
 *  example: [{id:1,quantity:100},{id:3,quantity:10}]
 * @param  {} idUser id of the user going to makethe orden
 */
async function createOrder(products, idUser){
    if(!Array.isArray(products)){
        throw new Error("products, must be a array")
    }else if(!products[0]){
        throw new Error("Must be send minimum a 1 product")
    }else if(!products[0].id){
        throw new Error("object of array must contain a id of product")
    }else if(!products[0].quantity){
        throw new Error("object of array must contain a quantity of the product")
    }else{
        const pass = ()=>"pass!" //Es solo por poner algo 
    }

    let user = null
    let order = null
    //get user to vinculate order (avoid a fake id user is used)
    try{
        user = await  Users.findOne({
            where:{
                id:idUser
            }
        })
        order = await Order.create({
            userId:user.id
        })
    }catch(err){
        throw Error("Error creating new order, orderService "+err.message)
    }
    //Get all products and vinculate with the order
    try{
        for(let product of products){
            let result =  await getProductById({id:product.id})
            //Al crear la orden se usara el precio del producto en la db, otra opcion es usar el precio del carrito, discutir
            let has = await order.addProduct(result, {through:{price:result.price, quantity: product.quantity}})
        }
    }catch(err){
        throw Error("Error in vinculation current products to order, orderService "+err.message)

    }
    return _formatOrder(order)
}
/**
 * When sequelize generate a order this generata a order with values unordered
 * this function parse the order object get from of sequelize, and parse to the format waited by graphql
 * @param  {ObjectGeneratedSequelize} order 
 */
async function _formatOrder(order){
    if(!order.dataValues){
        throw Error("function format order expected a order object generated by sequelize")
    }
    const productsOrden = await order.getProducts()
    const userOrden = await order.getUser()
    const lineal_Order = productsOrden.map(p => p.Lineal_Order)

    //Add every product in the order in a array to return after :)
    let productsOrdersSalida = []
    for(let i in lineal_Order){
        productsOrdersSalida.push({
            userId:userOrden.id,
            price: lineal_Order[i].price,
            quantity: lineal_Order[i].quantity,
            product:[
                {
                    id:productsOrden[i].id,
                    name: productsOrden[i].name,
                    description: productsOrden[i].description,
                    price: productsOrden[i].price,
                    stock: productsOrden[i].stock,
                    image: productsOrden[i].image,
                    categories: await productsOrden[i].getCategories()
                }
            ]
        })
    }

    const out = {
        id:order.id,
        status:order.status,
        lineal_order: productsOrdersSalida
    }
    return out
}
/**
 * Get the order by id
 * @param  {Int} id id of the order searched
 */
async function getOrderById(id){
    const order = await Order.findOne({
        where:{
            id
        }
    })

    const out = await _formatOrder(order)
    return await _formatOrder(order)
  }

async function updateOrderPrices(orderId){
    try {
        const order = await Order.findOne({
            where: {id: orderId}
        })
    
        
        const orderProducts = await order.getProducts()
        const prices = {}

        for (const data of orderProducts) {
            prices[data.id] = data.price
        }
        
        const lineal_Order = orderProducts.map(p => p.Lineal_Order)
    
        for (const data of lineal_Order) {
            const id = data.productId
            data.price = prices[id]
            await data.save()
        }

        return true
    } catch (err) {
        return false
    }
}

/**
 * ONLY IF PLACE STATUS IS CART
 * Delete a existing product in the order
 * @param  {} orderId
 * @param  {} productId
 */
async function deleteProductOrder(orderId, productId){
    try {
        const order = await Order.findOne({where: {id: orderId}})
        if(order.placeStatus === 'cart'){
            await Lineal_Order.destroy({
                where: {orderId, productId}
            })

            return true
        } else {
            throw new Error('You cannot delete a product from a ticket')
        }
        
    } catch (err) {
        throw new Error(err.message)
    }
    
}
/**
 * ONLY IF PLACE STATUS IS CART
 * Add new product to existing order
 * 
 * If the product already exist in the order only modify the quantity
 * @param  {} orderId
 * @param  {} productId
 * @param  {} quantity
 */
async function addProductToOrder(orderId, productId, quantity){
    try {
        const order = await Order.findOne({where: {id: orderId}})

        if(order.placeStatus === 'cart'){
            const newProduct = await Product.findOne({
                where:{
                    id:productId
                }
            })
            let has = await order.addProduct(newProduct, {through:{price:newProduct.price, quantity}})            
            return true
        } else {
            throw new Error('You cannot add a product in a ticket')
        }
        
    } catch (err) {
        throw new Error(err)
    }
    
}
/**
 * ONLY IF PLACESTATUS IS CART
 * Delete order 
 * @param  {Int} orderId 
 */
 async function deleteOrder(orderId){
    try {
        const order = await Order.findOne({where: {id: orderId}})
        if(order.placeStatus === 'cart'){
            await order.destroy()
            return true
        } else {
            throw new Error('You cannot delete a order in ticket status')
        }
        
    } catch (err) {
        throw new Error(err.message)
    }
}
/**
 * Modify the place status of the orden to "ticket"
 * @param  {Int} orderId 
 * @param  {String} status  only acept value "cart" or "ticket"
 */
async function updateOrderToTicket(orderId){
    try {
        const order = await Order.findOne({
            where: {id: orderId}
        })
        order.placeStatus = "ticket"
        await order.save()

        return true
    } catch (err) {
        return false
    }
}
/**
 * Modify the status of the order between unpaid, paid, sent, received
 *  See: model order datatype ENUM
 * @param  {Int} orderId 
 * @param  {String} status string between unpaid, paid, sent, received
 */
async function modifyStatusOrder(orderId, status){
    try {
        const order = await Order.findOne({
            where: {id: orderId}
        })
        if(order.placeStatus === 'ticket'){
            order.status = status
            await order.save()
            return true
        } else {
            throw new Error('You cannot edit the status of an order in cart status')
        }
        
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    getAllOrders,
    getOrdersByUserIdInCart,
    getOrdersByUserIdInTicket,
    getOrderById,
    createOrder,
    deleteProductOrder,
    addProductToOrder,
    deleteOrder,
    updateOrderToTicket,
    modifyStatusOrder,
    updateOrderPrices,
    
}