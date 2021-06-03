const Course = require('../models/Course')
const {createAccessToken} = require('../auth.js')

module.exports.createCourse = (req,res) => {

	const course = new Course ({

		name: req.body.name,
		description: req.body.description,
		price: req.body.price

	})

	course.save()
	.then(course => {
			res.send(course)
	})
	.catch(err => {
			res.send(err)
	})

};

module.exports.checkCourse = (req,res) => {
	Course.findOne({name:req.body.name}) 
	.then(findCourse => {

		console.log(findCourse)
		if(findCourse){

			res.send(true)

		} else {

			res.send(false)
		}
	})
	.catch(error => {
		res.send(error)
	})

};

module.exports.getSingleCourse = (req,res) => {

	Course.findById(req.params.id)
	.then(course => {
		res.send(course)
	})
	.catch(error => {
		res.send(error)
	})

};

module.exports.getAllCourse = (req,res) => {

	Course.find()
	.then(allCourse =>{
		res.send(allCourse)
	})
	.catch(error => {
		res.send(error)
	})
};

module.exports.updateCourse = (req,res) => {

	//course.id = req.params.id
	//details for updates = req.body

	//console.log(req.params.id)
	//console.log(req.body)

	let updatedCourse = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	Course.findByIdAndUpdate(req.params.id,updatedCourse,{new:true})
	.then(updatedCourse => {
		res.send(updatedCourse)
	})
	.catch(error => {
		res.send(error)
	})

};

module.exports.updateInactive = (req,res) => {

	let updatedCourse = {
			isActive: false
	}

	Course.findByIdAndUpdate(req.params.id,updatedCourse,{new:true})
	.then(updatedCourse => {
		res.send(updatedCourse)
	})
	.catch(error => {
		res.send(error)
	})

};

module.exports.updateActive = (req,res) => {

	let updatedCourse = {
			isActive: true
	}

	Course.findByIdAndUpdate(req.params.id,updatedCourse,{new:true})
	.then(updatedCourse => {
		res.send(updatedCourse)
	})
	.catch(error => {
		res.send(error)
	})

};

module.exports.getAllActive = (req,res) => {

	Course.find({isActive: true})
	.then(foundActive => {
		res.send(foundActive)
	})
	.catch(error => {
		res.send(error)
	})
};

module.exports.getAllInactive = (req,res) => {

	Course.find({isActive: false})
	.then(foundInactive => {
		res.send(foundInactive)
	})
	.catch(error => {
		res.send(error)
	})
};