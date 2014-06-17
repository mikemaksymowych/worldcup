var User = require('./models/user.js');
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
			var canDelete = Array();

			for (var i = 0; i < docs.length; i++) {
				if (docs[i].match.datetime < new Date()) {
					canDelete.push(false);
				} else {
					canDelete.push(true);
				}
			}
			res.render('profile.jade', { user: req.user, wagers: docs, now: canDelete, message: req.flash('wagerMessage') });
		});
	});

	app.get('/profile/update', isLoggedIn, function(req, res) {
		res.render('info.jade');
	});

	app.post('/update', function(req, res) {
		res.redirect('/profile', {message: req.flash({'updateMessage': 'profile updated'})});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/matches', function(req, res) {
		var query = Match.find({datetime: {$gt: new Date()}}).sort({datetime: -1});

		query.exec(function(err, docs) {
			res.render('matches.jade', {user: req.user, matches: docs });
		});
	});

	app.post('/wager', wager.wager);
	app.post('/wager/delete', wager.delete);

	app.get('/leaderboard', function(req, res) {
		var query = User.find({}).sort({points: -1});

		query.exec(function(err, docs) {
			res.render('leaderboard.jade', {user: req.user, teams: docs });
		});
	});
};


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

