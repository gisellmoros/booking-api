const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4000

//database connection
mongoose.connect('mongodb+srv://gisellmoros:3.14easyaspi@cluster0.mhzvf.mongodb.net/booking-system-api?retryWrites=true&w=majority', {

	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false

})
.then(() => {
	console.log("Connected to Database.")
})
.catch((err) => {
	console.log(err.message)
})

//request body parser from JSON -> JS Object
//Application-Level Middleware -> Middlewares are functions with access to req,res,next objects. Middlewares are used to be able to perform tasks before another task is done.
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
app.use('/api/users',userRoutes)

const courseRoutes = require('./routes/courseRoutes')
app.use('/api/courses',courseRoutes)

app.listen(port,() => {console.log(`Server running at Localhost:${port}`)})