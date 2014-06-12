from bs4 import BeautifulSoup
import requests


def main():
	soup = BeautifulSoup(requests.get('http://sports.bovada.lv/sports-betting/world-cup-matches.jsp').text, 'lxml')
	tables = soup.find_all('table')

	i = 1
	while i < len(tables):
		for tr in tables[i]('tr'):
			try:
				data = tr('td')[2]
				print ''.join(data.text.split())
			except:
				pass

		while i < len(tables):
			try:
				d = tables[i]('td')[2].text

				if d == data.text or d.find('(1H)') > 0:
					i += 1
				else:
					break
			except:
				i += 1


if __name__ == '__main__':
	main()

