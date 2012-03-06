from twython import Twython
from settings import *
from datetime import datetime
import dateutil.parser as parser
import MySQLdb as mdb
import sys

# Inserting it to Database
def insertToDB(con, table_name, tweet_id, twitter_user, user_id, created_at, text, geo, coordinates, scraped_at, source):
    with con:
        cur = con.cursor()
                    
        # Queries
        main_insert = 'INSERT INTO allTweets(tweet_id, user, user_id, created_at, text, geo, coordinates, scraped_at) '
        main_insert += 'VALUES("' + str(tweet_id) + '", "' + str(twitter_user) + '", "' + str(user_id) + '", "' + str(created_at) + '", "' + str(text) + '", "' + str(geo) + '",'
        main_insert += ' "' + str(coordinates) + '", "' + str(scraped_at) + '")'

        special_table_insert = 'INSERT INTO ' + table_name + '(tweet_id, user, user_id, created_at, text, geo, coordinates, scraped_at) '
        special_table_insert += 'VALUES("' + str(tweet_id) +'", "' + str(twitter_user) + '", "' + str(user_id) + '", "' + str(created_at) + '", "' + str(text) + '", "' + str(geo) + '",'
        special_table_insert += ' "' + str(coordinates) + '", "' + str(scraped_at) + '")'

        # Executing queries
        cur.execute(main_insert)
        cur.execute(special_table_insert)


# Main objects
twitter = Twython(twitter_token, twitter_secret, oauth_token, oauth_token_secret)
con = mdb.connect(host, user, password, db)

query_subjects = ["Super Tuesday", "Romney", "Santorum", "Ron Paul", "Gingrich", "Obama"]

for query in query_subjects:
    table_name = query if query != "Super Tuesday" else "SuperTuesday"
    for page_num in range(1,4):
        search_results = twitter.searchTwitter(q=query, rpp="10", result_type="current", page=str(page_num))
        for tweet in search_results["results"]:
            tweet_id = tweet['id_str']
            user = tweet['from_user'].encode('utf-8')
            user_id = tweet['from_user_id_str']
            created_at = (parser.parse(tweet['created_at']))
            text = tweet['text'].encode('utf-8')
            if '"' in text:
                text = text.replace('"', '\'')
            geo = tweet['geo']
            coordinates = geo['coordinates'] if geo != None else "null"
            scraped_at = datetime.now()
            source = tweet['source']
            insertToDB(con, table_name, tweet_id, user, user_id, created_at, text, geo, coordinates, scraped_at, source);

