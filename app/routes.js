var Match = require('./models/match.js');
var Wager = require('./models/wager.js');
var wager = require('./wager.js');

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index.jade');
	});

	app.get('/login', function(req, res) {
		res.render('login.jade', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true,
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.jade', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true,
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		var query = Wager.find({'user._id': req.user._id}).sort({datetime: -1});

		query.exec(function(err, docs) {
			res.render('profile.jade', { user: req.user, wagers: docs, message: req.flash('wagerMessage') });
		});

		//res.render('profile.jade', { user: req.user, message: req.flash('wagerMessage') });
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/matches', function(req, res) {
		var query = Match.find({datetime: {$gt: new Date()}}).sort({datetime: 1});

		query.exec(function(err, docs) {
			res.render('matches.jade', {user: req.user, matches: docs });
		});

		//Match.find({}, function(err, docs) {
			//res.render('matches.jade', {user: req.user, matches: docs });
		//});
	});

	app.post('/wager', wager.wager);

};


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

