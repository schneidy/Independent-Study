<?php
include ("../../settings.php");

// Basic Tweet Query
if(isset($_GET['topic']) && !isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
) {

	/* soak in the passed variable or set our own */
	$number_of_tweets = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$skip = isset($_GET['skip']) ? intval($_GET['skip']) : 0; // 0 is the default
	$topic = $_GET['topic']; //no default

	/* connect to the db */
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	/* grab the posts from the db */
	$query = "SELECT * FROM $topic LIMIT $skip, $number_of_tweets";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	/* create one master array of the records */
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	/* output in necessary format */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

// Tweet containing phrase
if(isset($_GET['topic']) && isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
){

	/* soak in the passed variable or set our own */
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

	/* output in necessary format */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

// Number of tweets
if(isset($_GET['topic']) && isset($_GET['count']) && !isset($_GET['contains'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
) {

	// soak in the passed variable or set our own 
	$topic = $_GET['topic']; //no default

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) as count FROM $topic";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in necessary format
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

// Number of tweets with phrase
if(isset($_GET['topic']) && isset($_GET['contains']) && isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
) {

	// soak in the passed variable or set our own 
	$topic = $_GET['topic']; //no default
	$contains = $_GET['contains'];

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) as count FROM $topic where text like '% $contains %'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in necessary format
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

// Number of Tweets between time
// -If searching for a specific minute, go between original minute and the following minute
if(isset($_GET['topic']) && isset($_GET['count']) && !isset($_GET['contains'])
	&& isset($_GET['time1']) && isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	) {

	// soak in the passed variable or set our own 
	$topic = $_GET['topic']; //no default
	$time1 = $_GET['time1'];
	$time2 = $_GET['time2'];

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) as count FROM $topic where created_at between '$time1' and '$time2'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in necessary format
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

// Number of Tweets between time containing phrase
// -If searching for a specific minute, go between original minute and the following minute
if(isset($_GET['topic']) && isset($_GET['count']) && isset($_GET['contains'])
	&& isset($_GET['time1']) && isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	) {

	// soak in the passed variable or set our own 
	$topic = $_GET['topic']; //no default
	$time1 = $_GET['time1'];
	$time2 = $_GET['time2'];
	$contains = $_GET['contains'];

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) as count FROM $topic where text like '% $contains %' and created_at between '$time1' and '$time2'";
    $result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$tweets = array();
	if(mysql_num_rows($result)) {
		while($tweet = mysql_fetch_assoc($result)) {
			$tweets[] = array('tweet'=>$tweet);
		}
	}

	// output in necessary format
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

// Tweets between time
// -If searching for a specific minute, go between original minute and the following minute
if(isset($_GET['topic']) && !isset($_GET['count']) && !isset($_GET['contains'])
	&& isset($_GET['time1']) && isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	) {

	// soak in the passed variable or set our own 
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

	// output in necessary format
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}

// Tweets between time with phrase
// -If searching for a specific minute, go between original minute and the following minute
if(isset($_GET['topic']) && !isset($_GET['count']) && isset($_GET['contains'])
	&& isset($_GET['time1']) && isset($_GET['time2'])
	&& !isset($_GET['min']) && !isset($_GET['max'])
	) {

	// soak in the passed variable or set our own 
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

	// output in necessary format
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	// disconnect from the db
	@mysql_close($link);
}


// Earliest time scraped at
// Kinda has a weird problem where it returns "created_at" when queried
// Fixed with inclusion of searching for a space within the text of the tweet
if(isset($_GET['topic']) && !isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& isset($_GET['min']) && !isset($_GET['max'])
) {

	/* soak in the passed variable or set our own */
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

	/* output in necessary format */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}


// Latest time scraped at
if(isset($_GET['topic']) && !isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && isset($_GET['max'])
) {

	/* soak in the passed variable or set our own */
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

	/* output in necessary format */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

// Earliest time with phrase
if(isset($_GET['topic']) && isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& isset($_GET['min']) && !isset($_GET['max'])
) {

	/* soak in the passed variable or set our own */
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

	/* output in necessary format */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

// Latest time with phrase
if(isset($_GET['topic']) && isset($_GET['contains']) && !isset($_GET['count'])
	&& !isset($_GET['time1']) && !isset($_GET['time2'])
	&& !isset($_GET['min']) && isset($_GET['max'])
) {

	/* soak in the passed variable or set our own */
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

	/* output in necessary format */
    header('Content-type: application/json');
	echo json_encode(array('tweets'=>$tweets));

	/* disconnect from the db */
	@mysql_close($link);
}

// Names of tables

// Tweets with coordinates

// Tweets with phrase

// Coordinates

// Coordinates with phrase

// Number of tweets with coordinates

// Number of tweets with coordinates and phrase

?>
