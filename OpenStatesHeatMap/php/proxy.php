<?php
	// API key to be removed
	$apikey = "68170bb9e8c64913b1dc0e58df47d822";
	
	// Sets the page to act as a json file
	header('Content-type: application/json');
	
	if(isset($_GET['topic']) && isset($_GET['state']) && isset($_GET['billSearch']) ){
		$topic = strip_tags($_GET['topic']);
		$state =  strip_tags($_GET['state']);
		$url = "http://openstates.org/api/v1/bills/?q=".$topic."&search_window=term&sort=updated_at&state=".$state."&apikey=".$apikey;
		$json = file_get_contents($url);
		echo $json;
	}
?>
