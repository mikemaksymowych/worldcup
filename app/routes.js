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
		res.render('profile.jade', { user: req.user });
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//app.get('/auth/twitter', passport.authenticate('twitter'));
	//app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/profile', failureRedirect: '/' }));
};


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

