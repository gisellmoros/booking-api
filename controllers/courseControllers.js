const Course = require('../models/Course')

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

}

module.exports.checkCourse = (req,res) => {
	Course.findOne({name:req.body.name}) 
	.then(findCourse => {

		console.log(findCourse)
		if(findCourse === null){

			res.send(false)

		} else {
			
			res.send(true)
		}
	})

}