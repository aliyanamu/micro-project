require('dotenv').config()

const axios = require('axios')
const accessToken = process.env.access_token
console.log(accessToken)

let baseURL = `https://api.github.com`
let headers = {
	'User-Agent': 'request',
	'Authorization': `token ${accessToken}`
}

module.exports = {
	echo: (req, res) => {
		res.send('OK')
	},

	userList: (req, res) => {
		let url = `${baseURL}/search/users?q=${req.query.username}&page=1&per_page=10`

		axios.get(url, headers)
			.then(response => {
				res.status(200).json({
					data: response.data.items
				})
			})
			.catch(err => {
				res.status(500).json({
					message: err.response.data
				})
			})
	},
    
	repoList: (req, res) => {
		let url = `${baseURL}/users/${req.query.username}/repos?page=${req.query.page}&per_page=${req.query.rowsPerPage}`

		axios.get(url, headers)
			.then(response => {
				let totalPage
				let headers = response.headers.link
				if (headers) {
					let seperateLink = headers.split(', ')
					let firstLink
					let lastLink
					seperateLink.forEach(link => {
						if (link.includes('rel="first"')) firstLink = link
						if (link.includes('rel="last"')) lastLink = link
					})
					if (lastLink) {
						totalPage = lastLink.split('?page=')[1].split('&')[0]// get from last page
					}
					if (!lastLink && firstLink) {
						totalPage = req.query.page// get from query page
					}
				} else {
					totalPage = 1
				}

				let rawData = response.data
				let filterData = rawData.map(each => {
					return {
						id: each.id,
						name: each.name,
						url: each.clone_url,
						stargazers_count: each.stargazers_count,
						watchers_count: each.watchers_count
					}
				})

				res.status(200).json({
					totalPage: totalPage,
					data: filterData
				})
			})
			.catch(err => {
				res.status(500).json({
					message: err.response.data
				})
			})
	},

	readme: (req, res) => {
		let url = `${baseURL}/repos/${req.query.username}/${req.query.repository}/readme`
		console.log(req.query, url)

		axios.get(url, headers)
			.then(response => {
				let rawData = response.data
				console.log(Buffer.from(rawData.content, 'base64').toString('ascii'))
				let content = rawData.content
				res.status(200).json({
					data: content
				})
			})
			.catch(err => {
				console.log(err.response.data)
				res.status(500).json({
					message: err.response.data
				})
			})
	}
}