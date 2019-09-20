const express = require('express')
const router = express.Router()
const { echo, userList, repoList, readme } = require('../controllers/index')

/* GET home page. */
router
	.get('/echo', echo)

	.get('/users?:username', userList)

	.get('/repos?:username?:page?:rowsPerPage', repoList)

	.get('/readme?:username?:repository', readme)

module.exports = {
	router
}