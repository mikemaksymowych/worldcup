db.matches.remove({});

var m;

m = {
"datetime": new Date("Jun 12, 2014 16:00:00"),
"team_1": "Brazil",
"team_1_img": "bra.png",
"team_1_odds": -375,
"team_2": "Croatia",
"team_2_img": "cro.png",
"team_2_odds": +1000,
"draw_odds": +475,
"winner": ""
};

db.matches.insert(m);

m = {
"datetime": new Date("Jun 13, 2014 12:00:00"),
"team_1" : "Mexico",
"team_1_img" : "mex.png",
"team_1_odds" : +115,
"team_2" : "Cameroon",
"team_2_img" : "cmr.png",
"team_2_odds" : +260,
"draw_odds" : +220,
"winner" : ""
};

db.matches.insert(m);

m = {
"datetime": new Date("Jun 13, 2014 15:00:00"),
"team_1" : "Spain",
"team_1_img" : "esp.png",
"team_1_odds" : -125,
"team_2" : "Netherlands",
"team_2_img" : "ned.png",
"team_2_odds" : +400,
"draw_odds" : +240,
"winner" : ""
};

db.matches.insert(m);

m = {
"datetime": new Date("Jun 13, 2014 18:00:00"),
"team_1" : "Chile",
"team_1_img" : "chi.png",
"team_1_odds" : -240,
"team_2" : "Australia",
"team_2_img" : "aus.png",
"team_2_odds" : +700,
"draw_odds" : +350,
"winner" : ""
};

db.matches.insert(m);

/*
m = {
"datetime": new Date("Jun 14, 2014 12:00:00"),
"team_1" : "Colombia",
"team_1_img" : "col.png",
"team_1_odds" : -126,
"team_2" : "Greeze",
"team_2_img" : "gre.png",
"team_2_odds" : 365,
"draw_odds" : 246,
"winner" : ""
};

db.matches.insert(m);

m = {
"datetime": new Date("Jun 14, 2014 15:00:00"),
"team_1" : "Uruguay",
"team_1_img" : "uru.png",
"team_1_odds" : -268,
"team_2" : "Costa Rica",
"team_2_img" : "crc.png",
"team_2_odds" : 800,
"draw_odds" : 388,
"winner" : ""
};

db.matches.insert(m);

m = {
"datetime": new Date("Jun 14, 2014 18:00:00"),
"team_1" : "England",
"team_1_img" : "eng.png",
"team_1_odds" : 204,
"team_2" : "Italy",
"team_2_img" : "ita.png",
"team_2_odds" : 163,
"draw_odds" : 185,
"winner" : ""
};

db.matches.insert(m);

m = {
"datetime": new Date("Jun 14, 2014 21:00:00"),
"team_1" : "Ivory Coast",
"team_1_img" : "irn.png",
"team_1_odds" : 154,
"team_2" : "Japan",
"team_2_img" : "jap.png",
"team_2_odds" : 184,
"draw_odds" : 218,
"winner" : ""
};

db.matches.insert(m);
*/


















