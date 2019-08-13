<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif;}
        .wrapper{ width: 350px; margin: 0;
	padding: 0;}
	form, p { 
		margin: 0 auto; 
		width:200px;
	}

        img {
  	  display: block;
  	  margin-left: auto;
  	  margin-right: auto;
  	  width: 50%;
       }

	table {
 		 table-layout: fixed;
 		 width: 800px;
	}

         tr, td {
 		border: 0px white;
         }

    </style>
</head>
<body>
	<img src="uno-logo.jpg" style="align:center; width:10%">
        <h3 align="center">University of New Orleans</h3>
        <h4 align="center"> Center for Cyber Security Research Database </h4>
        <p align="center"> | <a href="query.php"> Query More Data </a> | <a href="logout.php"> logout </a> | </p>
	<br />
        <br />
        <p align="center"><center>Displaying Information from Virus Total</center></p>
        <br />

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

       echo '<p align="center"><center>Request Query to check : '.$toFetch.'</center></p>';
       echo "<br />";
       echo "<br />";
       echo "\n";

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
		echo '<p align="center">status = '.$status_code.'</p>';
		$json = '';
		if ($status_code == 200) { // OK
	  		$json = json_decode($result, true);
			echo '<pre>'.json_encode($json, JSON_PRETTY_PRINT).'</pre>';
		} else {  // Error occured
			$json = json_decode($result, true);
			echo '<pre>'.json_encode($json, JSON_PRETTY_PRINT).'</pre>';
		}
		curl_close ($ch);
		

	if(isset($_POST["store"]) && $_POST["store"] == 'yes') {
             $username = "pwnuno";
             $password = 'a#nsus6y3!';
             $dbName = 'botDetector';
             $collectionName = 'passiveDNS';

             try {
    		$m = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost/$dbName");
    		$bulk = new MongoDB\Driver\BulkWrite;
		if ($type == 'domain') {
		   $doc =[
	                '_id' => new MongoDB\BSON\ObjectID,
			'domain' => mysql_escape_string($_POST['domain']),
                        'domainInfo' => $json
                   ];
		
                } else if ($type == 'ip') {
			$doc = [
            		'_id' => new MongoDB\BSON\ObjectID,
                        'ip' => $_POST['ip'],
            		'ipInfo' => $json
          		];
		}
    		$bulk->insert($doc);
    		$m->executeBulkWrite('botDetector.passiveDNS', $bulk);

	     } catch (MongoDB\Driver\Exception\Exception $e) {
    		$filename = basename(__FILE__);
    		echo "Exception:", $e->getMessage(), "\n";
    		echo "In file:", $e->getFile(), "\n";
    		echo "Line: #", $e->getLine(), "\n";
	     }
	}
?>
