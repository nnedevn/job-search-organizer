require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var passport = require('./config/passportConfig.js');
var isLoggedIn = require('./middleware/isLoggedIn.js');
var flash = require('connect-flash');
var session = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
//declare session before passport and flash

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  //assign local vars to every outgoing res (every page)
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.get('/', function(req, res) {
  res.render('home.ejs')
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs')
});

app.use('/auth', require('./controllers/auth.js'));

app.listen(process.env.PORT || 3000);