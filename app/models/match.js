var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var matchSchema = mongoose.Schema({
	datetime: Date,
	team_1: String,
	team_1_img: String,
	team_1_odds: Number,
	team_2: String,
	team_2_img: String,
	team_2_odds: Number,
	draw_odds: Number,
	winner: String,
});

module.exports = mongoose.model('Match', matchSchema);

