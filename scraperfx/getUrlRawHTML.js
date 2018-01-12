var phantom = require('phantom');
var cheerio = require('cheerio');

var getData = async function(req, res, next) {

  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info("Requesting", requestData);
  });

  const status = await page.open('https://www.indeed.com/jobs?q=web+developer&l=Seattle%2C+WA');
  const content = await page.property('content');
  console.log(content);
  await instance.exit();
  return content;
}

module.exports = getData;