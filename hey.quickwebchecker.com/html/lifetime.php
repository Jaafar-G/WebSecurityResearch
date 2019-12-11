<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$username = "pwnuno";
$password = 'a#nsus6y3!';
$dbName = 'botDetector';
$collectionName = 'requestHeader';


function getTimestamp() {
  $dateTime = date("Y-m-d H:i:s.v"); 
  return $dateTime;
}

function getFullURL() {
  $uri = $_SERVER['REQUEST_URI'];
  return $uri;
}

function get_client_ip() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

try {

    $m = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost/$dbName");
    $bulk = new MongoDB\Driver\BulkWrite;
    $ip = get_client_ip();
    $doc = [
            '_id' => new MongoDB\BSON\ObjectID, 
            'ip' => $ip, 
            'url'=> getFullURL(),
            'visitTimestamp' => getTimestamp()
          ];
    $bulk->insert($doc);
    $m->executeBulkWrite("botDetector.lifetime", $bulk);

} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    echo "Exception:", $e->getMessage(), "\n";
    echo "In file:", $e->getFile(), "\n";
    echo "Line: #", $e->getLine(), "\n";
}

?>

