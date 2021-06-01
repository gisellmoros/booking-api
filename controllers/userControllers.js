const User = require('../models/User')

module.exports.welcomeUser = (req,res) => {

	res.send("I will be used for registration.")
}

module.exports.userLogin = (req,res) => {

	res.send("I will be used for user login.")
}