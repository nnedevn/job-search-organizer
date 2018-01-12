var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn.js');
var db = require('../models/');


//----Data acquisition and parsing functions
var getUrlRawHTML = require('../scraperfx/getUrlRawHTML.js');
var parseIndeedData = require('../scraperfx/parseIndeedData.js');



router.get('/', isLoggedIn, function(req, res) {
  res.render('profile/profile.ejs')
});

router.get('/jobs', isLoggedIn, function(req, res) {
  getUrlRawHTML().then(function(rawHTML) {
      return Promise.all([rawHTML, parseIndeedData(rawHTML)]);
    })
    .then(function(result) {
      res.render('profile/jobs/listNew.ejs', { jobs: result[1] });
    })
    .catch(function(err) { console.log(err); })
});

router.get('/applied/:id', isLoggedIn, function(req, res) {
  
  //Send all the jobs with the current user's id.
  db.job.findAll({
        where: {userId : req.params.id},
       
    }).then(function(jobs){
         // res.send(jobs);
        res.render('profile/jobs/listApplied.ejs', {jobs:jobs});
    });
});

router.get('/jobs/:id', function(req, res) {

});

router.post('/applied', isLoggedIn, function(req, res) {

  db.job.create({
    title: req.body.title,
    summary: req.body.summary,
    url: req.body.url,
    sponsored: req.body.sponsored,
    postedDate: req.body.postedDate,
    originSite: req.body.originSite,
    userId: req.user.id,
    saved: '',
    appliedFor: '',
    screenshotLink: '',
    companyName: req.body.companyName,
    companyLocation: req.body.companyLocation
  }).then(function(job) {
    res.send(job);
  })

});

router.get('/fav', function(req, res) {
  res.send('Lists saved for later jobs');
});

// router.post('/fav', function(req, res) {
//   console.log('/fav route reached', req.body);
//   res.send('Adds a jobs to saved for later');
// });

module.exports = router;