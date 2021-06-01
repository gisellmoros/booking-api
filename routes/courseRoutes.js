const express = require('express')
const router = express.Router()
const{createCourse,checkCourse} = require('../controllers/courseControllers')

router.post('/',createCourse);

router.post('/checkCourse',checkCourse)

module.exports = router