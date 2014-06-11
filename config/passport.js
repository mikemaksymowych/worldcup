var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'user',
		passwordField: 'password',
		passReqToCallback: true,
	},
	function(req, user, password, done) {
		process.nextTick(function() {
			User.findOne({'user': user}, function(err, _user) {
				if (err) {
					return done(err);
				}

				if (_user) {
					return done(null, false, req.flash('signupMessage', 'That user is already taken.'));
				} else {
					var newUser = new User();
					newUser.user = user;
					newUser.password = newUser.generateHash(password)
					newUser.points = 1000;

					newUser.save(function(err) {
						if (err) {
							throw err;
						}

						console.log(newUser);
						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'user',
		passwordField: 'password',
		passReqToCallback: true,
	},
	function(req, user, password, done) {
		User.findOne({'user': user}, function(err, user) {
			if (err) {
				return done(err);
			}

			if (! user) {
				return done(null, false, req.flash('loginMessage', 'User not found.'));
			}

			if (! user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Bad password.'));
			}

			return done(null, user);
		});
	}));
};



