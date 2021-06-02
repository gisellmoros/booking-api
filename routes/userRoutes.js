const express = require('express')
const router = express.Router()
const{	welcomeUser,
		login,
		checkEmail,
		getUserDetails,
		updateUserDetails} = require('../controllers/userControllers')
const {verify} = require('../auth')

router.post('/',welcomeUser);

router.post('/login',login);

router.post('/checkEmail',checkEmail);

//Route-level middlewares are used and only affects the route it is assigned to.
//We are going to perform a task, verify our token, before we trigger the controller.
//Route-level middlewares has access to the request and response from route.
router.get('/',verify,getUserDetails);

router.put('/updateUser:id',verify,updateUserDetails);

module.exports = router

