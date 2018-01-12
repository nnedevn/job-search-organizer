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

router.get('/jobs/:searchTerm/:location', isLoggedIn, function(req, res) {
  console.log('GET ', req.params.location);
  getUrlRawHTML(req.params.searchTerm, req.params.location).then(function(rawHTML) {
      return Promise.all([rawHTML, parseIndeedData(rawHTML)]);
    })
    .then(function(result) {
      res.render('profile/jobs/listNew.ejs', { jobs: result[1] });
    })
    .catch(function(err) { console.log(err); })
});

router.post('/jobs', isLoggedIn, function(req, res) {
  console.log('POST ', req.body.location);
  res.redirect('/profile/jobs/' + req.body.searchTerm + '/' + req.body.location);
})


router.get('/fav', isLoggedIn, function(req, res) {

  //Send all the jobs with the current user's id.
  db.job.findAll({
    where: { userId: req.user.id },

  }).then(function(jobs) {
    // res.send(jobs);
    res.render('profile/jobs/listSaved.ejs', { jobs: jobs });
  });
});

router.get('/jobs/:id', function(req, res) {
  res.send("id route reached");
});

router.post('/fav', isLoggedIn, function(req, res) {

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

router.put('/fav/:id', isLoggedIn, function(req, res){

  console.log(req.body);

  db.job.findById(req.params.id).then(function(job){
    if (job) {
      job.updateAttributes(req.body).then(function() {
        res.status(200).send({msg: 'success'});
      });
    } else {
      res.status(404).send({msg: 'error'});
    }
  }).catch(function(err) {
    res.status(500).send({msg: 'error'});
  });

  console.log('put reached');
  res.send('fav route reached');

});

router.delete('/fav/:id', isLoggedIn, function(req, res) {
  db.job.findById(req.params.id).then(function(job) {
    if (job) {
      job.destroy().then(function() {
        res.send({msg: 'success'});
      });
    } else {
      res.status(404).send({msg: 'error'});
    }
  }).catch(function(err) {
    res.status(500).send({msg: 'error'});
  });
});

router.get('/applied', function(req, res) {

  db.job.findAll({
    where: { appliedFor: "true"  },

  }).then(function(jobs) {
    // res.send(jobs);
    res.render('profile/jobs/listAppliedFor.ejs', { jobs: jobs });
  });

});

// router.post('/fav', function(req, res) {
//   console.log('/fav route reached', req.body);
//   res.send('Adds a jobs to saved for later');
// });

module.exports = router;