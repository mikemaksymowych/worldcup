db.matches.remove({});

var m;

m = {
"datetime": new Date("Dec 31, 2014 23:59:59"),
"team_1": "USA",
"team_1_img": "usa.png",
"team_1_odds": +1000,
"team_2": "Russia",
"team_2_img": "rus.png",
"team_2_odds": -1000,
"draw_odds": -600,
"winner": ""
};

db.matches.insert(m);


















