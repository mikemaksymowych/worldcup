var mongoose = require('mongoose');

var wagerSchema = mongoose.Schema({
	datetime: Date,
	user: Object,
	match: Object,
	team: String,
	wager: Number,
	to_win: Number,
	points: Number,
});

module.exports = mongoose.model('Wager', wagerSchema);

