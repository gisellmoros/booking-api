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
};

//verify token/decode module
module.exports.verify = (req,res,next) => {
//next() will allow us tp proceed either to the next middleware OR finally to the controller.
//We can pass/find our token in our authorization property found from our req.headers.
//The token that we passed will be in req.headers.authorization.
	//console.log(req.headers.authorization)

//check if there is a token being passed:
let token = req.headers.authorization
	if(typeof token === "undefined") {
		//we eill send a message, auth: failed if the route is accessed without a TOKEN.
		res.send({auth:"failed"})
	} else {
		//extract token and remove "Bearer " from our current token:
		token = token.slice(7,token.length)
		//console.log(token)

		//verify token
		jwt.verify(token,secret,function(error,decoded){
			//decoded is our data decoded from our token.
			//console.log(decoded)
			if(error) {
				res.send({auth:"failed"})
			} else {
				console.log(decoded)
				//we added a new property to our req. called user. And assigned our decoded object to that property.
				req.user = decoded
				
				next()
			}

		})

	}
}

module.exports.verifyAdmin = (req,res,next) => {

	//console.log(req.user)
	if(req.user.isAdmin){
		next()
	} else {
		res.send({auth: "failed"})
	}

}