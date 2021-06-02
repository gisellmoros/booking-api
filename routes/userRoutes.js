const express = require('express')
const router = express.Router()

const{	welcomeUser,
		login,
		checkEmail,
		getUserDetails} = require('../controllers/userControllers')

router.post('/',welcomeUser);

router.post('/login',login);

router.post('/checkEmail',checkEmail);

router.get('/:id',getUserDetails);

module.exports = router

