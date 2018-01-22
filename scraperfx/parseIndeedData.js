let cheerio = require('cheerio');

function parseIndeedData(data) {
  let usefullData = [];
  // Load the HTML data into Cheerio
  $ = cheerio.load(data);
  // Loop through each job posting, collect useful data into an object and push it into an array.
  $('#resultsCol .row').each(function (index, element) {
    // console.log('ELEMENT', $(element).html());
    usefullData[index] = {};

    usefullData[index]['jobTitle'] = $(element).find('.jobtitle').text();
    usefullData[index]['companyName'] = $(element).find('.company').text();
    usefullData[index]['jobSummary'] = $(element).find('.summary').text();
    usefullData[index]['companyLocation'] = $(element).find('.location').text();
    usefullData[index]['jobUrl'] = 'https://www.indeed.com' + $(element).find('.turnstileLink').attr('href');
    //If the post is sponsored, mark it as such, else get when it was posted. (The posts have either a sponsored field or they show when they were posted)
    if ($(element).find('.result-link-bar-container>.result-link-bar>.sponsoredGray').text()) {
      usefullData[index]['jobSponsored'] = $(element).find('.result-link-bar-container>.result-link-bar>.sponsoredGray').text();
    } else {
      usefullData[index]['jobPostedDate'] = $(element).find('.result-link-bar-container>.result-link-bar>.date').text();
    }
  });

  return usefullData;
}

module.exports = parseIndeedData;