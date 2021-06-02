const jwt = require("jsonwebtoken")
const secret = "CourseBookingAPI"

/*
	JWT or jsonwebtoken is a way of securely passing information from a part of a server to the frontend or other parts of the server. It allows us to create a sort of "keys" which is able to authenticate our user to allow or disallow them to do certain actions.

	The secret passed is any string but to allow access with the key, the secret must be intact.

*/

module.exports.createAccessToken = (user) => {
//This data is encrypted and can only be opened with the proper secret.
//Whenever our user logs in, we are able to wrap his/her details in our token which will be used as our authentication.
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}
//create a token with our specific secret
	return jwt.sign(data,secret,{})
}