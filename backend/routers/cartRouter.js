const router = require('express').Router()

const cartHandler = require('../controllers/cartController')

router.post('/add_to_cart',cartHandler.addToCart)
router.delete('/remove_from_cart',cartHandler.removeFromCart)
router.get('/getProducts_in_cart/:cartId',cartHandler.getProductsInCart)
router.patch('/update_product_quantity',cartHandler.updateQuantity)
router.delete('/delete_cart/:cartId',cartHandler.deleteCart)

module.exports = router