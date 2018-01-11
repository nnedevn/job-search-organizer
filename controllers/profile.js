var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn.js');
var getUrlRawHTML = require('../scraperfx/getUrlRawHTML.js');
var cheerio = require('cheerio');
var $;
var usefullData = [];









router.get('/', isLoggedIn, function(req, res) {
  res.render('profile/profile.ejs')
});

router.get('/jobs', function(req, res){
    getUrlRawHTML().then(function(data){
        $ = cheerio.load(data);

        $('#resultsCol .row').each(function(index, element) {
   console.log('ELEMENT', $(element).html());
   usefullData[index] = {};

   usefullData[index]['jobTitle'] = $(element).find('.jobtitle').text();
   usefullData[index]['companyName'] = $(element).find('.company').text();

   usefullData[index]['jobSummary'] = $(element).find('.summary').text();

   usefullData[index]['companyLocation'] = $(element).find('.location').text();

   usefullData[index]['jobPostUrlCompany'] = 'https://www.indeed.com' + $(element).find('.turnstileLink').attr('href');




   //If the post is sponsored, mark it as such, else get when it was posted.
   if ($(element).find('.result-link-bar-container>.result-link-bar>.sponsoredGray').text()) {
     usefullData[index]['jobSponsored'] = $(element).find('.result-link-bar-container>.result-link-bar>.sponsoredGray').text();
   } else {
     usefullData[index]['jobPostedDate'] = $(element).find('.result-link-bar-container>.result-link-bar>.date').text();
   }
 });
     //   res.send(usefullData);
    res.render('profile/jobs/listNew.ejs', {jobs:usefullData});


    })
    
})

router.get('/jobs/:id', function(req,res){
    res.send('single job details');
})

router.get('/applied', function(req,res){
    res.send('List jobs applied for');
});

router.post('/applied', function(req,res){
    console.log('/applied route reached',req.body);
    res.send('Adds a job to the applied for category');
})

router.get('/fav', function(req,res){
    res.send('Lists saved for later jobs');
});

router.post('/fav', function(req, res){
    console.log('/fav route reached', req.body);
    res.send('Adds a jobs to saved for later');
})

module.exports = router;