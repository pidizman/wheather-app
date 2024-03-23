import requests
import json
from datetime import datetime
from bs4 import BeautifulSoup

json_filename = "output.json"
data = json.load(open(json_filename))

def scrape(url):
    response = requests.get(url)
    html_content = response.content

    soup = BeautifulSoup(html_content, "html.parser")

    elements = soup.find_all("div", class_="row")
    #print(elements)

    temp = elements[0].find("div", class_="value").text
    dewpoint = elements[1].find("div", class_="value").text
    now = datetime.now()
    date = now.strftime("%d/%m/%Y")
    time = now.strftime("%H:%M:%S")

    new = {
        "temp": temp,
        "dewpoint": dewpoint,
        "date": date,
        "time": time
    }
    data.append(new)

    with open(json_filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)
