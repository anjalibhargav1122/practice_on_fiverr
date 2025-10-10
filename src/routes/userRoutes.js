const express = require('express')
const { registerUser, getAllUser, getOneUser, updateUser, deleteUser, loginUser, logoutUser, passwordChange, forgetPassword, resetPassword } = require('../controllers/userController')
const isAuthenticatedUser = require('../middlewares/auth')

const userrouter = express.Router()

userrouter.post('/user', registerUser)
userrouter.get('/user', getAllUser)
userrouter.get('/user/:id', getOneUser)
userrouter.put('/user/:id', updateUser)
userrouter.delete('/user/:id', deleteUser)
userrouter.post('/login', loginUser)
userrouter.post('/logout', logoutUser)
userrouter.post('/password/change',isAuthenticatedUser, passwordChange)
userrouter.post('/password/forget', forgetPassword)
userrouter.post('/password/reset', resetPassword)
userrouter.get("/me", isAuthenticatedUser,(req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome! You are logged in",
    user: req.user,
  });
});

module.exports = userrouter