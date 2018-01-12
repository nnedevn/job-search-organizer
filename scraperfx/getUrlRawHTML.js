var phantom = require('phantom');
var cheerio = require('cheerio');

var getData = async function(searchTerms, location) {

  var url = 'https://www.indeed.com/jobs?q=' + searchTerms + '&l='+location;

  const instance = await phantom.create();
  const page = await instance.createPage();
  // await page.on('onResourceRequested', function(requestData) {
  //   console.info("Requesting", requestData);
  // });

  const status = await page.open(url);
  const content = await page.property('content');
  // console.log(content);
  await instance.exit();
  return content;
}

module.exports = getData;