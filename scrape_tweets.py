from twython import Twython
from oauth import twitter_token, twitter_secret, oauth_token, oauth_token_secret

twitter = Twython(twitter_token, twitter_secret, oauth_token, oauth_token_secret)

search_results = twitter.searchTwitter(q="Super Tuesday", rpp="100")

for tweet in search_results["results"]:
    print tweet['text'].encode('utf-8'),"\n"
