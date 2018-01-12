var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn.js');
var db = require('../models/');


//----Data acuisition and parsing functions
var getUrlRawHTML = require('../scraperfx/getUrlRawHTML.js');
var parseIndeedData = require('../scraperfx/parseIndeedData.js');



router.get('/', isLoggedIn, function(req, res) {
  res.render('profile/profile.ejs')
});

router.get('/jobs', isLoggedIn, function(req, res) {
  getUrlRawHTML().then(function(rawHTML){
    return Promise.all([rawHTML, parseIndeedData(rawHTML)]);
  })
  .then(function(result){
    res.render('profile/jobs/listNew.ejs', {jobs: result[1]});
  })
  .catch(function(err){console.log(err);})
});


router.get('/applied', function(req, res) {
  res.send('List jobs applied for');
});

router.get('/jobs/:id', function(req, res) {
  res.send('single job details');
});

router.post('/applied', isLoggedIn, function(req, res) {
  console.log('/applied route reached', req.body);
  

  res.send(req.body);



});

router.get('/fav', function(req, res) {
  res.send('Lists saved for later jobs');
});

router.post('/fav', function(req, res) {
  console.log('/fav route reached', req.body);
  res.send('Adds a jobs to saved for later');
});

module.exports = router;