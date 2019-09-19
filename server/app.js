const express = require('express'),
    cors = require('cors'),
    bodyParser= require('body-parser');

const indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors());

app
  .use('/', indexRouter)
  .use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})