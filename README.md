# job-search-organizer

This is a prototype of an applciation that keeps track of job applcations.
Currently the app utilizes a headless browser(PhantomJS) to search indeed.com. Capability to search other sites will be added in the future.  

The user can save individual job posts to be looked at later or mark them as applied to.
THe app checks new searches against what is stored in the database to make sure there are no duplicates. 



To get facebook login working, set up a.env file with the following values:


SESSION_SECRET=


FACEBOOK_APP_ID=


FACEBOOK_APP_SECRET=


BASE_URL=http://localhost:3000


