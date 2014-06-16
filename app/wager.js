var User = require('./models/user.js');
var Match = require('./models/match.js');
var Wager = require('./models/wager.js');


exports.wager = function (req, res) {
	var wager_1 = parseInt(req.body.team_1) || 0;
	wager_1 = wager_1 < 0 ? 0 : wager_1;

	var wager_2 = parseInt(req.body.team_2) || 0;
	wager_2 = wager_2 < 0 ? 0 : wager_2;

	var wager_3 = parseInt(req.body.draw) || 0;
	wager_3 = wager_3 < 0 ? 0 : wager_3;

	var p = wager_1 + wager_2 + wager_3;

	if (p > req.user.points) {
		req.flash('wagerMessage', 'You wagered too much.');
		res.redirect('/profile');
	} else {
		var query = Match.findOne({_id: req.body.match}).sort({datetime: -1});

		query.exec(function(err, match) {
			if (wager_1 > 0) {
				var newWager = new Wager();
				newWager.datetime = new Date();
				newWager.user = req.user;
				newWager.match = match;
				newWager.team = match.team_1;
				newWager.wager = wager_1;
				
				if (match.team_1_odds < 0) {
					newWager.to_win = wager_1 * (1.0 + 100.0 / Math.abs(match.team_1_odds));
				} else {
					newWager.to_win = wager_1 * (1.0 + Math.abs(match.team_1_odds) / 100.0);
				}

				newWager.save(function(err) {
					if (err) {
						throw err;
					}
				});
			}

			if (wager_2 > 0) {
				var newWager = new Wager();
				newWager.datetime = new Date();
				newWager.user = req.user;
				newWager.match = match;
				newWager.team = match.team_2;
				newWager.wager = wager_2;
				
				if (match.team_2_odds < 0) {
					newWager.to_win = wager_2 * (1.0 + 100.0 / Math.abs(match.team_2_odds));
				} else {
					newWager.to_win = wager_2 * (1.0 + Math.abs(match.team_2_odds) / 100.0);
				}

				newWager.save(function(err) {
					if (err) {
						throw err;
					}
				});
			}

			if (wager_3 > 0) {
				var newWager = new Wager();
				newWager.datetime = new Date();
				newWager.user = req.user;
				newWager.match = match;
				newWager.team = 'Draw';
				newWager.wager = wager_3;
				
				if (match.draw_odds < 0) {
					newWager.to_win = wager_3 * (1.0 + 100.0 / Math.abs(match.draw_odds));
				} else {
					newWager.to_win = wager_3 * (1.0 + Math.abs(match.draw_odds) / 100.0);
				}

				newWager.save(function(err) {
					if (err) {
						throw err;
					}
				});
			}

			User.findOne({_id: req.user._id}, function(err, user) {
				console.log(user.points);
				user.points -= wager_1;
				user.points -= wager_2;
				user.points -= wager_3;
				console.log(user.points);
				user.save();

				req.flash('wagerMessage', 'Your wagers were logged successfully.');
				res.redirect('/profile');
			});
		});
	}
}


exports.delete = function(req, res) {
	Wager.findById(req.body.id, function(err, wager) {
		if (wager.match.datetime < new Date()) {
			req.flash('wagerMessage', 'no no no no jerkface.');
			res.redirect('/profile');
		} else {
			User.findById(req.user._id, function(err, user) {
					user.points += wager.wager;
					user.save();

				wager.remove(function(err, wager) {
					req.flash('wagerMessage', 'Wager deleted.');
					res.redirect('/profile');
				});
			});
		}
	});
}


