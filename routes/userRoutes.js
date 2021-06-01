const express = require('express')
const router = express.Router()

const{welcomeUser,userLogin,checkEmail} = require('../controllers/userControllers')

router.post('/',welcomeUser);

router.post('/login',userLogin);

router.post('/checkEmail',checkEmail);

module.exports = router

