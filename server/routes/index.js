const express = require('express')
const router = express.Router()

const signUpController = require('../controller/user/signUp')
const loginController = require('../controller/user/login')
const authToken = require('../middlewares/authToken')
const userDetailsController = require('../controller/user/userDetails')
const userLogoutController = require('../controller/user/userLogout')
const saveCaptionController = require('../controller/caption/saveCaption')
const mostLikedCaptions = require('../controller/caption/mostLikedCaptions')
const updateUserController = require('../controller/user/updateUser')
const updateUploadCountController = require('../controller/user/updateUploadCount')
const contactController = require('../controller/contact/contact')
const incrementCaptionsGenerated = require('../controller/user/incrementCaptionsGenerated')
const incrementTotalLikesController = require('../controller/user/incrementTotalLikes')
const userLikedCaptions = require('../controller/caption/userLikedCaptions')
const delCapFromUserController = require('../controller/caption/delCapFromUser')


//user routes
router.post('/signup', signUpController)
router.post('/login', loginController)
router.get('/user-details', userDetailsController)
// router.get('/user-details', authToken, userDetailsController)
router.get("/user-logout", userLogoutController)
router.put("/update-proflie", authToken, updateUserController)
router.post("/update-upload-count", authToken, updateUploadCountController)
router.post("/increment-captions-generated", authToken, incrementCaptionsGenerated)
router.post("/increment-total-likes", authToken, incrementTotalLikesController)


// caption routes
router.post('/save-caption', authToken, saveCaptionController)
router.get('/most-liked-captions', authToken, mostLikedCaptions)
router.get('/user-liked-captions', authToken, userLikedCaptions)
router.delete('/remove-liked-caption', authToken, delCapFromUserController)


//contact
router.post('/contact-us', contactController)




module.exports = router