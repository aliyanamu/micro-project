require('dotenv').config()

const axios = require('axios')
const accessToken = process.env.access_token

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
                    data: response.data
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.response.data
                })
            })
    },
    
    repoList: (req, res) => {
        let url = `${baseURL}/users/${req.query.username}/repos?page=${req.query.page}&per_page=10`

        axios.get(url, headers)
            .then(response => {
                res.status(200).json({
                    data: response.data
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

        axios.get(url, headers)
            .then(response => {
                res.status(200).json({
                    data: response.data
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.response.data
                })
            })
    }
}