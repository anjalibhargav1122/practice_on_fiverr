const express = require('express')
const { registerUser } = require('../controllers/userController')

const userrouter = express.Router()

userrouter.post('/user', registerUser)

module.exports = userrouter