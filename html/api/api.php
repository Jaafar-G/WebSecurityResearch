<?php

	// Initialize the session
	session_start();
 
	// Check if the user is logged in, if not then redirect to login page
	if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    		header("location: login.php");
    		exit;
	}
	$api_key = getenv('VT_API_KEY') ? getenv('VT_API_KEY'):'768bda0cb01d575a86c72dee72efb0a9fef5776a9ca51f0ee6ec4c4f449377ef';

	$toFetch = '';
        $type = '';

	if (isset($_POST["domain"]) && !empty($_POST["domain"])) { 
		$toFetch = $_POST["domain"];
                $type = "domain";
	}

	if (isset($_POST["ip"]) && !empty($_POST["ip"])) { 
		$toFetch = $_POST["ip"];
                $type = "ip";
	}

       echo "<p><center>Displaying Information from Virus Total</center></p>";
       echo "";
       echo "";
       echo "<p><center>Request Query to check : ".$toFetch;
       echo "</center></p>";
       echo "";

	switch($type) {
		case "domain" :
			$data = array('apikey' => $api_key,'domain'=> $toFetch);
			$url = 'https://www.virustotal.com/vtapi/v2/domain/report?';
		        break;
		case "ip":
			$data = array('apikey' => $api_key,'ip'=> $toFetch);
			$url = 'https://www.virustotal.com/vtapi/v2/ip-address/report?';
			break;
		default:
			exit("Request type not supported");
	}


	$ch = curl_init();
	$url .= http_build_query($data); // append query params
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_VERBOSE, 1); // remove this if your not debugging
	curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate'); // please compress data
	curl_setopt($ch, CURLOPT_USERAGENT, "gzip, My php curl client");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER ,True);

	$result=curl_exec ($ch);
	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	print("status = $status_code\n");
	if ($status_code == 200) { // OK
	  $js = json_decode($result, true);
	  print_r($js);
	} else {  // Error occured
		$json = json_decode($result);
		echo '<pre>'.json_encode($json, JSON_PRETTY_PRINT).'</pre>';
	}
	curl_close ($ch);
?>
