const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')

const { router } = require('./routes/index')
const app = express()

app
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(cors())

app.use('/', router)

app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})