/* UPDATE MATCH.WINNER */
db.matches.update(
	{_id: ObjectId("539905032221aa32fbdac174")},
	{$set: {winner: "Brazil"}}
);



/* UPDATE WAGER.RESULT */
// BRAZIL 4 CROATIA 2
db.wagers.find({"match._id": ObjectId("539905032221aa32fbdac174")}).forEach(function(wager) {
	if (wager.team === "Brazil") {
		wager.points = wager.to_win;
	} else {
		wager.points = 0;
	}

	db.wagers.save(wager);

	db.users.find({_id: ObjectId(wager.user._id)}).forEach(function(user) {
		user.points += wager.points;
		db.users.save(user);
	});
});



/* UPDATE USER.POINTS */


