const express = require('express')
const router = express.Router()
const {
	createCourse,
	checkCourse,
	getSingleCourse,
	getAllCourse,
	updateCourse,
	updateInactive,
	updateActive} = require('../controllers/courseControllers')
const {verify,verifyAdmin} = require('../auth')

router.post('/',createCourse);

router.post('/checkCourse',checkCourse);

router.get('/',verify,verifyAdmin,getAllCourse);

router.get('/:id',getSingleCourse);

//update course
router.put('/:id',verify,verifyAdmin,updateCourse);

router.put('/inactiveCourse/:id',verify,verifyAdmin,updateInactive);

router.put('/activeCourse/:id',verify,verifyAdmin,updateActive);

module.exports = router