const { modifyProduct } = require("./modifyProduct");
const { updateCategory } = require("./updateCategory");
const { addCategory } = require("./addCategory");
const { deleteCategory } = require("./deleteCategory");
const { addCategoryToProduct } = require("./addCategoryToProduct");
const { removeCategoryFromProduct } = require("./removeCategoryFromProduct");
const { deleteById } = require("./deleteById");
const { addProduct } = require("./addProduct");
const { createUser } = require("./createUser");
const { modifyUser } = require("./modifyUser");
const {createOrder } = require("./createOrder");
const {updateOrderPrices} = require("./updateOrderPrices");
const { deleteProductOrder } = require("./deleteProductOrder");
const {addProductToOrder} = require("./addProductToOrder")
const {deleteOrder} = require("./deleteOrder")
const {updateOrderToTicket} = require("./updateOrderToTicket")
const {modifyOrderStatus} = require("./modifyOrderStatus")
const { incrementQuantity } = require("./incrementQuantity"); 
const { decrementQuantity } = require("./decrementQuantity"); 
const { deleteReview } = require("./deleteReview.js")
const { addReview } = require("./addReview")
const {modifyReview} = require("./modifyReview")
const {deleteUser} = require("./deleteUser");

module.exports = {
  modifyProduct,
  updateCategory,
  addCategory,
  deleteCategory,
  addCategoryToProduct,
  removeCategoryFromProduct,
  deleteById,
  addProduct,
  createUser,
  modifyUser,
  createOrder,
  updateOrderPrices,
  deleteProductOrder,
  addProductToOrder,
  deleteOrder,
  updateOrderToTicket,
  modifyOrderStatus,
  incrementQuantity, 
  decrementQuantity, 
  deleteReview,
  addReview,
  modifyReview,
  decrementQuantity,
  deleteUser,

}
