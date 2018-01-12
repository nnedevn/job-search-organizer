 var cheerio = require('cheerio');
 
function parseIndeedData(data) {
 
  var usefullData = [];

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
    //sockets?
    // /jobs
    //do work .then() ----
    //render page with no data
    //in.socket.emmit(dataLoaded)
    //-----pass the data

    //io.socket.on('dataloaded', function(data){
    //empty spinner
    //add jobs parse jobs

  });
 
  return usefullData;
}

module.exports = parseIndeedData;