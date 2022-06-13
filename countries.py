import imp
from bs4 import BeautifulSoup
from pprint import pprint

with open('index.html') as file:
    html = file.read()
soup = BeautifulSoup(html, 'html.parser')
atags = soup.find_all('a')
countries = [tag['xlink:title'] for tag in atags]
pprint(countries)