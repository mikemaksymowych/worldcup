var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');


var configDB = require('./config/database.js');
mongoose.connect(configDB.url);


require('./config/passport.js')(passport);


var app = express();

//app.use(express.logger('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'jade');

app.use(session({ secret: 'jake from state farm' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./app/routes.js')(app, passport);


var port = process.env.PORT || 12345;
app.listen(port);

console.log('For a good time 127.0.0.1:' + port);



