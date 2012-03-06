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
    with con:
        cur = con.cursor()
        
        # Queries
        main_insert = "INSERT INTO allTweets(tweet_id, user, user_id, created_at, text, geo, coordinates, scraped_at, source) "
        main_insert += "VALUES('" + tweet_id +"', '" + twitter_user + "', '", + user_id + "', '" + created_at + "', '" + text + "', '" + geo + "',"
        main_insert += coordinates + "', '" + scraped_at + "', '" + source +  "')"
        
        special_table_insert = "INSERT INTO " + table_name + "(tweet_id, user, user_id, created_at, text, geo, coordinates, scraped_at, source) "
        special_table_insert += "VALUES('" + tweet_id +"', '" + twitter_user + "', '", + user_id + "', '" + created_at + "', '" + text + "', '" + geo + "',"
        special_table_insert += coordinates + "', '" + scraped_at + "', '" + source +  "')"

        # Executing queries
        cur.execute(main_insert)
        cur.execute(special_table_insert)
