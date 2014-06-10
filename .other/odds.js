var page = require('webpage').create();

page.open('http://www.sportsinteraction.com/soccer/international/world-cup-betting-lines', function() {
	var list = page.evaluate(function() {
		var spans = document.querySelectorAll('span.addRunner');
		var games = Array();

		for (var i = 0; i < spans.length; i++) {
			if (spans[i].querySelectorAll('span.name').length === 0) {
				continue;
			}

			g = {};
			g['team'] = spans[i].querySelectorAll('span.name')[0].innerText;
			g['price'] = spans[i].querySelectorAll('span.price')[0].innerText;

			games.push(g);
		}

		return games;
	});

	for (var i = 0; i < list.length; i += 3) {
		console.log(list[i]['team'] + ': ' + list[i]['price']);
		console.log(list[i+1]['team'] + ': ' + list[i+1]['price']);
		console.log(list[i+2]['team'] + ': ' + list[i+2]['price']);
		console.log('');
	}

	phantom.exit();
});







