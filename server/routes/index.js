const express = require('express')
const router = express.Router()

const signUpController = require('../controller/SignUp')
const loginController = require('../controller/login')
const authToken = require('../middlewares/authToken')
const userDetailsController = require('../controller/userDetails')
const userLogoutController = require('../controller/userLogout')


router.post('/signup', signUpController)
router.post('/login', loginController)
router.get('/user-details', userDetailsController)
// router.get('/user-details', authToken, userDetailsController)
router.get("/user-logout", userLogoutController)


module.exports = router