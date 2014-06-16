var page = require('webpage').create();

page.open('http://www.usopen.com/en_US/scoring/index.html', function() {
	setTimeout(function() {
		var leaderboard = page.evaluate(function() {
			var rows = document.getElementsByClassName('playerRow');
			var list = Array();

			for (var i = 0; i < rows.length; i++) {
				list.push({
					'player': rows[i].getElementsByTagName('td')[2].innerText,
					'pos': rows[i].getElementsByTagName('td')[1].innerText,
				});
			}

			return list;
		});

		for (var i = 0; i < leaderboard.length; i++) {
			console.log(leaderboard[i]['player'] + '\t' + leaderboard[i]['pos']);
		}

		phantom.exit();
	}, 1000);
});







