const mongoose = require('mongoose')

//blueprint for a use document
//firstName,lastName,email,password,mobileNo,isAdmin
const UserSchema = new mongoose.Schema({

	firstName: {
		type: String,
		required: [true,"First Name is Required."]
	},
	lastName: {
		type: String,
		required: [true,"Last Name is Required."]
	},
	email: {
		type: String,
		required: [true,"Email is Required."]
	},
	password: {
		type: String,
		required: [true,"Password  is Required."]
	},
	confirmPassword: {
		type: String,
		required: [true,"Please confirm password."]
	},
	//There is no need to require fields that have default value.
	isAdmin: {
		type: Boolean,
		default: false
	},
	//better to make it a string type to avoid computation if number type.
	mobileNo: {
		type: String,
		required: [true,"Mobile Number is required."]
	},
	//Courses and Users have a many to many relationship.
	//In mongoDB, for many to many relationships we can implement, two-way embedding. Which means we can embed the information of the first model on the second model and vice versa.
	//Subdocument Array - Array of embedded documents. This will mean that we can add multiple documents for each course that our user will enroll in.
	enrollments: [
		{
			courseId: {
				type: String,
				required: [true,"Course Id is required."]
			},
			enrolledOn: {
				type: Date,
				default: new Date()
			},
			status: {
				type: String,
				default: "Enrolled"
			}
		}
	]
})

module.exports = mongoose.model('User',UserSchema)

