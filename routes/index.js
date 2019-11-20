var express = require('express');
var router = express.Router();
var request = require('request');

const rootURL = 'https://api.github.com/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {userData: null});
});

// FIX THIS PART...
router.post('/', function(req, res) {
  var options = {
    url: `${rootURL}users/${req.body.username}`,
    headers: {
      'User-Agent': 'drmartirosian',
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  };
  request(
    options,
    function(err, response, body) {
      var userData = JSON.parse(body);
      options.url = userData.repos_url;
      request(options, function(err, response, body) {
        userData.repos = JSON.parse(body);
        res.render('index', {userData});
      });
    }
  );
});
// console.log(process.env.GITHUB_TOKEN);

module.exports = router;
