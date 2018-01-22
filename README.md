# Job Search Organizer
http://job--search--organizer.herokuapp.com/


This is a prototype of an application that keeps track of job applications.
Currently the app utilizes a headless browser(PhantomJS) to search indeed.com, parse the results, and store individual posts to a database (PostgreSQL).  
The user can save individual job posts to be looked at later or mark them as applied to.
The app checks new searches against what is stored in the database to endure there are no duplicates.
## Goal
The end goal of this project is to have an application capable of handling all aspects of a jobs search process.

## Approach
* 

## Technologies Used
* NodeJS
* Express
* PostgreSQL
* PhantomJS
* Cheerio
* EJS
* PassportJS
* Sequelize
* Bcrypt

## Next Steps
- [ ] Integrate this functionality into a much bigger React based application.
- [ ] Create the necessary custom functions to search other sites, such as Glass door, dice, craigslist etc.
- [ ] Integrate with calendar to keep track of the post's timeline
- [ ] Implement automatic tagging of posts 
- [ ] Implement selective display based on tags


test username: testUser@nicknedev.com
test password: TheTestPassword!

To enable facebook authentication, create a .env file in the root application folder. Populate it with the following values: 

SESSION_SECRET=

FACEBOOK_APP_ID=

FACEBOOK_APP_SECRET=

BASE_URL=http://localhost:3000

