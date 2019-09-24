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
        <p align="center"><center> Displaying Information from PublicWWW Service </center></p>
        <br />

<?php

	// Initialize the session
	session_start();

	// Check if the user is logged in, if not then redirect to login page
	if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    		header("location: login.php");
    		exit;
	}

	$api_key = getenv('key') ? getenv('key'):'c8083f0bb52ab8f07030a3f40865ecc0';

	$toFetch = '';
        $type = '';
        $url = '';

	if (isset($_POST['display']) && !empty($_POST['display'])) { 
		$toFetch = $_POST['display'];
                $type = 'display';
	}

	if (isset($_POST['download']) && !empty($_POST['download'])) { 
		$toFetch = $_POST['download'];
                $type = 'download';
	}

       echo '<p align="center"><center>Request Query to check : '.$toFetch.'</center></p>';
       echo "<br />";
       echo "<br />";
       echo "\n";

		switch($type) {
			case "display" :
				$data = array('key' => $api_key, $toFetch);
		        	break;
			case "download":
				$data = array('key' => $api_key, 'export' => 'csvu');
				$url = 'https://publicwww.com/websites/';
				break;
			default:
				exit("Request type not supported");
		}


		$url = 'https://publicwww.com/websites/%22'.$toFetch.'%22/?export=csvu&key=c183767cafa211d5125550136cd8ead5';
	        $ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER ,TRUE);
                curl_setopt($ch, CURLOPT_TIMEOUT, 5000);
                curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5000);
                
                $result=curl_exec ($ch);
		$toArr = explode("\n", $result);		
		$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

		echo '<p align="center">status = '.$status_code.'</p>';
                echo '<h5> <center> Searched query <b> <i>'.$toFetch.' </b> </i>result found : '.count($toArr).' </center></h5>';

		$json = '';
                           
                foreach($toArr as $val) {
                   $toRow = explode(";", $val);
	           $link = $toRow[0];
                   $rank = $toRow[1];
                   $json->$rank=$link;   
                   
                }


		if ($status_code == 200) { // OK
	  		$toDecode = json_decode($toArr, true);
			echo '<pre>'.json_encode($json, JSON_PRETTY_PRINT).'</pre>';
		} else {  // Error occured
			$toDecode = json_decode($toArr, true);
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
		if ($type == 'vt-domain') {
		   $doc =[
	                '_id' => new MongoDB\BSON\ObjectID,
			'domain' => mysql_escape_string($_POST['vt-domain']),
                        'domainInfo' => $json
                   ];
		
                } else if ($type == 'ip') {
			$doc = [
            		'_id' => new MongoDB\BSON\ObjectID,
                        'ip' => $_POST['vt-ip'],
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
