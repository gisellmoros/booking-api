const express = require('express')
const router = express.Router()

const{welcomeUser,userLogin} = require('../controllers/userControllers')

router.post('/',welcomeUser)

router.post('/login',userLogin)

module.exports = router

