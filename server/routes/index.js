const express = require('express'),
      router = express.Router(),
      { list, create, listrepo, unstar, star, friend } = require('../controllers/index');

/* GET home page. */
router
    .get('/starred/:username', list)

    .post('/repo', create)

    .get('/repos/:username/:reponame', listrepo)

    .get('/unstar/:username/:reponame', unstar)

    .get('/star/:username/:reponame', star)

    .get('/:org', friend)

module.exports = router;