<?php
include ("../../settings.php");

$topics = array("allTweets", "SuperTuesday", "Obama", "Romney", "Santorum", "Gingrich", "Santorum");

/* Basic Tweet Query
Arguments:
	topic = one of the twitter search terms.
	num [opt] = how many tweets returned. Default is 10.
	skip [opt] = how many tweets you skip. Default is 0.
*/
if(isset($_GET['topic']) && !isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])) 
	{

	/* grab the vars from $_GET */
	$number_of_tweets = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$skip = isset($_GET['skip']) ? intval($_GET['skip']) : 0; // 0 is the default
	$topic = $_GET['topic']; //no default

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the tweets from the db */
	$query = "SELECT * FROM $topic LIMIT $skip, $number_of_tweets";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

/* Tweet containing phrase
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	num [opt] = how many tweets returned. Default is 10.
	skip [opt] = how many tweets you skip. Default is 0.
*/
if(isset($_GET['topic']) && isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord']))
	{

	/* grab the vars from $_GET */
	$number_of_tweets = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$skip = isset($_GET['skip']) ? intval($_GET['skip']) : 0; // 0 is the default
	$topic = $_GET['topic']; //no default
    $contains = $_GET['contains'];

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT * FROM $topic where text like '% $contains %' LIMIT $skip, $number_of_tweets";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

/* Number of tweets
Arguments:
	topic = one of the twitter search terms.
	count = leave blank at end of url.
*/
if(isset($_GET['topic']) && isset($_GET['count']) && !isset($_GET['contains'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])
) {

	// grab the vars from $_GET 
	$topic = $_GET['topic']; //no default

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) as numTweets FROM $topic";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in json
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

/* Number of tweets with phrase
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	count = leave blank at end of url.
*/
if(isset($_GET['topic']) && isset($_GET['contains']) && isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])
) {

	// grab the vars from $_GET 
	$topic = $_GET['topic']; //no default
	$contains = $_GET['contains'];

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) as numTweets FROM $topic where text like '% $contains %'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in json
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

/* Number of Tweets between time
- If searching for a specific minute, go between original minute and the following minute
Arguments:
	topic = one of the twitter search terms.
	time1 = start time.
	time2 = end time.
*/
if(isset($_GET['topic']) && isset($_GET['count']) && !isset($_GET['contains'])
	&& isset($_GET['time1']) && isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])) 
	{

	// grab the vars from $_GET 
	$topic = $_GET['topic']; //no default
	$time1 = $_GET['time1'];
	$time2 = $_GET['time2'];

	// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) as numTweets FROM $topic where created_at between '$time1' and '$time2'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in json
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

/* Number of Tweets between time containing phrase
- If searching for a specific minute, go between original minute and the following minute
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	time1 = start time.
	time2 = end time.
	count = leave blank at end of url.
*/
if(isset($_GET['topic']) && isset($_GET['count']) && isset($_GET['contains'])
	&& isset($_GET['time1']) && isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])
	) {

	// grab the vars from $_GET 
	$topic = $_GET['topic']; //no default
	$time1 = $_GET['time1'];
	$time2 = $_GET['time2'];
	$contains = $_GET['contains'];

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) as numTweets FROM $topic where text like '% $contains %' and created_at between '$time1' and '$time2'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in json
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

/* Tweets between time
- If searching for a specific minute, go between original minute and the following minute
Arguments:
	topic = one of the twitter search terms.
	time1 = start time.
	time2 = end time.
	num [opt] = how many tweets returned. Default is 10.
	skip [opt] = how many tweets you skip. Default is 0.
 */
if(isset($_GET['topic']) && !isset($_GET['count']) && !isset($_GET['contains'])
	&& isset($_GET['time1']) && isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])) 
	{

	// grab the vars from $_GET 
	$topic = $_GET['topic']; //no default
	$time1 = $_GET['time1'];
	$time2 = $_GET['time2'];
	$number_of_tweets = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$skip = isset($_GET['skip']) ? intval($_GET['skip']) : 0; // 0 is the default
	
	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT * FROM $topic where created_at between '$time1' and '$time2' LIMIT $skip, $number_of_tweets";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in json
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

/* Tweets between time with phrase
- If searching for a specific minute, go between original minute and the following minute
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	time1 = start time.
	time2 = end time.
	num [opt] = how many tweets returned. Default is 10.
	skip [opt] = how many tweets you skip. Default is 0.
 */
if(isset($_GET['topic']) && !isset($_GET['count']) && isset($_GET['contains'])
	&& isset($_GET['time1']) && isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])) 
	{

	// grab the vars from $_GET 
	$topic = $_GET['topic']; //no default
	$time1 = $_GET['time1'];
	$time2 = $_GET['time2'];
	$contains = $_GET['contains'];
	$number_of_tweets = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$skip = isset($_GET['skip']) ? intval($_GET['skip']) : 0; // 0 is the default

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT * FROM $topic where (created_at between '$time1' and '$time2') and (text like '% $contains %') LIMIT $skip, $number_of_tweets";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in json
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}


/* Earliest time scraped at
- Kinda has a weird problem where it returns "created_at" when queried
- Fixed with inclusion of searching for a space within the text of the tweet
Arguments:
	topic = one of the twitter search terms.
	min = leave blank.
 */
if(isset($_GET['topic']) && !isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])) 
	{

	/* grab the vars from $_GET */
	$topic = $_GET['topic']; //no default

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT min(scraped_at) as min FROM $topic where text like '%  %'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}


/* Latest time scraped at
Arguments:
	topic = one of the twitter search terms.
	max = leave blank.
*/
if(isset($_GET['topic']) && !isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && isset($_GET['max'])
	&& !isset($_GET['coord'])) 
	{

	/* grab the vars from $_GET */
	$topic = $_GET['topic']; //no default

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT max(scraped_at) as max FROM $topic where text like '%  %'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

/* Earliest time with phrase
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	min = leave blank.
*/
if(isset($_GET['topic']) && isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& isset($_GET['min']) && !isset($_GET['max'])
	&& !isset($_GET['coord'])) 
	{

	/* grab the vars from $_GET */
	$topic = $_GET['topic']; //no default
	$contains = $_GET['contains'];

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT min(scraped_at) as min FROM $topic where text like '% $contains %'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

/* Latest time with phrase
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	max = leave blank.
*/
if(isset($_GET['topic']) && isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && isset($_GET['max'])
	&& !isset($_GET['coord']))
	{

	/* grab the vars from $_GET */
	$topic = $_GET['topic']; //no default
	$contains = $_GET['contains'];

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT max(scraped_at) as max FROM $topic where text like '% $contains %'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}


/* Names of tables
Arguments:
	tableNames = leave blank.
*/
if(isset($_GET['tableNames'])) {

	/* grab the vars from $_GET */
	$number_of_tweets = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$skip = isset($_GET['skip']) ? intval($_GET['skip']) : 0; // 0 is the default
    $tableNames = $_GET['tableNames'];

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');
    $result;

	/* grab the posts from the db */
    // search here
    header('Content-type: application/json');
    $output = array();
    foreach($topics as &$topic){
        if($tableNames == "all"){
            $query = "SELECT count(*) as numTweets from $topic";
        }else{
            $query = "SELECT count(*) as numTweets FROM $topic where text like '%$tableNames%'";
        }
        $sql_result = mysql_query($query,$link) or die('Errant query:  '.$query);
        $result = mysql_fetch_assoc($sql_result);
        $topic_array = array('tableName' => $topic, 'numTweets' => $result['numTweets']);
        $output[] = $topic_array;
    }
    echo json_encode(array('result' => $output));

	/* disconnect from the db */
	@mysql_close($link);
}

/* Tweets with Coordinates
Arguments:
	topic = one of the twitter search terms.
	coord = 
		- If coord = "tweets", returns tweets
		- If coord = "coords", returns coordinates. leave blank.
		- If coord = "[33.6679, -117.9245]", returns tweet with specified coordinate.
	num [opt] = how many tweets returned. Default is 10.
	skip [opt] = how many tweets you skip. Default is 0.
*/
if(isset($_GET['topic']) && !isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& isset($_GET['coord']) ) 
	{

	/* grab the vars from $_GET */
	$number_of_tweets = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$skip = isset($_GET['skip']) ? intval($_GET['skip']) : 0; // 0 is the default
	$topic = $_GET['topic']; //no default
	$coord = isset($_GET['coord']) ? $_GET['coord']: "tweets";

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	if($coord == "tweets"){
		$query = "SELECT * FROM $topic where coordinates != 'null' LIMIT $skip, $number_of_tweets";
	}elseif($coord != "tweets" and $coord != "coords"){
		$query = "SELECT * FROM $topic where coordinates = '$coord'";
	}else{
		$query = "SELECT coordinates FROM $topic where coordinates != 'null' LIMIT $skip, $number_of_tweets";
	}
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

/* Coordinates with either phrase or coordinates
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	coord = 
		- If coord = "tweets", returns tweets
		- If coord = "coords", return coordinates. leave blank
	num [opt] = how many tweets returned. Default is 10.
	skip [opt] = how many tweets you skip. Default is 0.
*/
if(isset($_GET['topic']) && isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& isset($_GET['coord']) ) 
	{

	/* grab the vars from $_GET */
	$number_of_tweets = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$skip = isset($_GET['skip']) ? intval($_GET['skip']) : 0; // 0 is the default
	$topic = $_GET['topic']; //no default
	$coord = isset($_GET['coord']) ? $_GET['coord']: "tweets";
	$contains = $_GET['contains'];

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	if($coord == "tweets"){
		$query = "SELECT * FROM $topic where text like '% $contains %' and coordinates != 'null' LIMIT $skip, $number_of_tweets";
	}else{
		$query = "SELECT coordinates FROM $topic where text like '% $contains %' and coordinates != 'null' LIMIT $skip, $number_of_tweets";
	}
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}


/* Number of tweets with coordinates
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	coord = 
		- If coord = "tweets", returns tweets
		- If coord = "coords", return coordinates
	count = leave blank at end of url.
*/
if(isset($_GET['topic']) && !isset($_GET['contains']) && isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& isset($_GET['coord']) ) 
	{

	/* grab the vars from $_GET */
	$topic = $_GET['topic']; //no default
	$coord = isset($_GET['coord']) ? $_GET['coord']: "tweets";

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT count(*) as numTweets FROM $topic where coordinates != 'null'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}


/* Number of tweets with coordinates and phrase
Arguments:
	topic = one of the twitter search terms.
	contains = word of phrase required in tweet text.
	coord = 
		- If coord = "tweets", returns tweets
		- If coord = "coords", return coordinates 
	count = leave blank at end of url.
*/
if(isset($_GET['topic']) && isset($_GET['contains']) && isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	&& isset($_GET['coord']) ) 
	{

	/* grab the vars from $_GET */
	$topic = $_GET['topic']; //no default
	$coord = isset($_GET['coord']) ? $_GET['coord']: "tweets";
	$contains = $_GET['contains'];

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT count(*) as numTweets FROM $topic where text like '% $contains %' and coordinates != 'null'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in json */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}


?>
