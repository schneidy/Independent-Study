<?php
include ("../../settings.php");

// Basic Tweet Query
if(isset($_GET['topic']) && !isset($_GET['contains']) && !isset($_GET['count'])) {

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
if(isset($_GET['topic']) && isset($_GET['contains']) && !isset($_GET['count'])){

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
if(isset($_GET['topic']) && isset($_GET['count']) && !isset($_GET['contains'])) {

	// soak in the passed variable or set our own 
	$topic = $_GET['topic']; //no default

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) FROM $topic";
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
if(isset($_GET['topic']) && isset($_GET['contains']) && isset($_GET['count'])) {

	// soak in the passed variable or set our own 
	$topic = $_GET['topic']; //no default
	$contains = $_GET['contains'];

	/// connect to the db 
	$link = mysql_connect($server,$user,$pwd) or die('Cannot connect to the DB');
	mysql_select_db($db,$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT count(*) FROM $topic where text like '% $contains %'";
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


?>
