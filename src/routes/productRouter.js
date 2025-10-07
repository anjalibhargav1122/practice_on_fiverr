const express = require('express')
const { productService } = require('../controllers/productControler')

const router = express.Router()

router.post('/product',productService)

module.exports = router