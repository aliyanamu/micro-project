const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')

const indexRouter = require('./routes/index')
const app = express()

app
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cors())

app.use('/', indexRouter)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})