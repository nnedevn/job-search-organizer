let phantom = require('phantom');
let cheerio = require('cheerio');

let getData = async function (searchTerms, location) {

  let url = 'https://www.indeed.com/jobs?q=' + searchTerms + '&l=' + location;

  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(url);
  const content = await page.property('content');
  await instance.exit();
  return content;
}

module.exports = getData;