const User = require('../models/User')
const bcrypt = require('bcrypt')
const {createAccessToken} = require('../auth.js')

//bcrypt allows to hide strings especially passwords with randomized characters for added layer of security.

module.exports.welcomeUser = (req,res) => {

//console.log(req.body)
//Check if you can get the body of your request properly before you process it.

//bcrypt.hashSync(<stringToBeHashed>,<saltRounds>)

if(req.body.password.length >= 8 &&
req.body.password === req.body.confirmPassword) {
	res.send(true)
}	else {res.send(false)};


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

module.exports.login = (req,res) => {

	//findOne() to look for our user. We have to check if the user trying to login is indeed registered in our db.
	User.findOne({email: req.body.email})
	.then(foundUser => {
		if(foundUser === null) {
			res.send(false) 
		} else {
			const isPasswordCorrect = bcrypt.compareSync(req.body.password,foundUser.password)
			//bcrypt.compareSync() - returns a boolean after comparing our hashed password with the password that was inuput. It will return true if the hashed password and the input matches, else it returns false.
			//bcrypt.compareSync(<stringToMatch>,<hashedString>)
			//console.log(isPasswordCorrect)
			//After checking if the password input by the user is the same/matches with the hashed password in the db, we will now proceed to give our user a "token" with which is a representation of authentication for our user.

			//Check if the password is correct
			if(isPasswordCorrect){
				//send the token to the client if user is found and password is correct.
				res.send({accessToken: createAccessToken(foundUser)})
				//Send false to client if password is incorrect
			} else {
				res.send(false)
			}
		}

		

	})
	.catch(error => {
		res.send(error)
	})
};

module.exports.checkEmail = (req,res) => {

	//since this is used in a post method route, we can use a request body to get our data.
	//console.log() EVERYTHING, especially incoming data from your requests.
	//.then() is able to do a task, process the result incoming function it was attached to.
	//.catch()
	User.findOne({email: req.body.email})
	.then(findResult => {
		//What we can expect to be return by find() is an array
		//Check if findResult() contains a found document or not:
		console.log(findResult)

		if (findResult) {
			res.send(true)
		} else {
			res.send(false)

		}
	/*
		if(findResult.length > 0) {
			res.send(true)
		} else {
			res.send(false)
		}

	*/
		
	})	
	.catch(error => {
		res.send(error)
	})

};

/*
module.exports.getId = (req,res) => {

	User.findById(req.params.id,{_id:1})
	.then(user => {
		res.send(user)
	})
	.catch(error => {
		res.send(error)
	})
}
*/

module.exports.getUserDetails = (req,res) => {
	console.log(req.user)
	//req.user = contains the decoded data from our token. IT contains all the data we included when we created our token.

	User.findById(req.user.id,{password:0})
	.then(user => {
		res.send(user)
	})
	.catch(error => {
		res.send(error)
	})

};

module.exports.updateUserDetails = (req,res) => {

	let updateUser = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		mobileNo: req.body.mobileNo
	}
	User.findByIdAndUpdate(req.params.id,updateUser,{new:true})
	.then(user => {
		res.send(updateUser)
	})
	.catch(error => {
		res.send(error)
	})
}
