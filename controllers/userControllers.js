const User = require('../models/User')
const bcrypt = require('bcrypt')

//bcrypt allows to hide strings especially passwords with randomized characters for added layer of security.

module.exports.welcomeUser = (req,res) => {

//bcrypt.hashSync(<stringToBeHashed>,<saltRounds>)
const hashedPw = bcrypt.hashSync(req.body.password,10);
console.log(hashedPw);

		let newUser = new User ({

		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hashedPw,
		mobileNo: req.body.mobileNo
		
	});


		newUser.save()
		.then(user => {
			res.send(user)
		})
		.catch(err => {
			res.send(err)
		})

};

module.exports.userLogin = (req,res) => {

	res.send("I will be used for user login.")
};

module.exports.checkEmail = (req,res) => {

	User.findOne({email: req.body.email})
	.then(email => {

		console.log(email)

		if (email === null) {
			res.send(false)
		} else {
			res.send(true)

		}
		
	})	
	.catch(error => {
		res.send(error)
	})

}
