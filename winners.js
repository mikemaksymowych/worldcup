// SPAIN 1 NETHERLANDS 5 -- "5399057f0ec4d2eb2e105674"
// USA 20 RUSSIA -1 -- "539f624e9292cfefa642044f"

/* UPDATE MATCH.WINNER */
db.matches.update(
	{_id: ObjectId("539f624e9292cfefa642044f")},
	{$set: {winner: "USA"}}
);


/* UPDATE WAGER.RESULT */
db.wagers.find({}).forEach(function(wager) {
	db.matches.find({_id: wager.match._id}).forEach(function(match) {
		if (wager.team == match.winner) {
			wager.points = wager.to_win;
		} else {
			wager.points = 0;
		}

		db.wagers.save(wager);

		db.users.find({_id: wager.user._id}).forEach(function(user) {
			user.points += wager.points;
			db.users.save(user);
		});
	});
});




