from twython import Twython
from settings import *
from datetime import datetime
import dateutil.parser as parser
import MySQLdb as mdb
import sys

twitter = Twython(twitter_token, twitter_secret, oauth_token, oauth_token_secret)

query_subjects = ["Super Tuesday", "Romney", "Santorum", "Ron Paul", "Gingrich", "Obama"]


search_results = twitter.searchTwitter(q="Super Tuesday", rpp="10", result_type="current", page="1")

for tweet in search_results["results"]:
    tweet_id = tweet['id_str']
    user = tweet['from_user'].encode('utf-8')
    user_id = tweet['from_user_id_str']
    created_at = (parser.parse(tweet['created_at']))
    text = tweet['text'].encode('utf-8')
    geo = tweet['geo']
    coordinates = geo['coordinates'] if geo != None else None
    scraped_at = datetime.now()
    source = tweet['source']

def insertToDB(self, table_name):
   con = mdb.connect(host, user, password, db)
