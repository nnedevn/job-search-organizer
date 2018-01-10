var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn.js');

router.get('/', isLoggedIn, function(req, res) {
  res.render('profile.ejs')
});


module.exports = router;