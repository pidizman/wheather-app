from scraper import scrape
from flask import Flask

url = "https://ws.meteoware.com/pn_v3_l.php?lg=en&unit=&fuid=352790&chk=7d879b&ut=c&up=hpa&ur=mm&layout=blue"
app = Flask(__name__)

@app.route("/")
def home():
    return scrape(url)

if __name__ == '__main__':
    app.run(port=5555)
