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
app.use(express.json())

app.listen(port,() => {console.log(`Server running at Localhost:${port}`)})