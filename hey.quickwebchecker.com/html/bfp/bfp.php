<?php
session_start();
// Debug mode set 
echo("Hi there");
ini_set('log_errors', TRUE);
//error_log("Here's some of the data for you".file_get_contents('php://input').PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
$fingerprint = file_get_contents('php://input');
if (strlen($fingerprint) < 10) 
    exit(0);

$username = "pwnuno";
$password = 'a#nsus6y3!';
$dbName = 'botDetector';
$collectionName = 'browserFP';

error_reporting(E_ALL);
ini_set('error_log', '/tmp/bfp_php_errors.log');

function getHeadersFromSessionId($m) {
    $filter = ['session_id' => 'sess_'.session_id()];
    $options = [
         'projection' => ['_id' => 0, 'url' => 0, 'ip' => 0, 'cymru' => 0, 'queryInsertTimeStamp' =>0, 'session_id' =>0],
    ];
    $query = new \MongoDB\Driver\Query($filter, $options);
    $rows = $m->executeQuery('botDetector.requestHeader', $query);
    $headers = '';
    foreach($rows as $r){
      $headers = $r;
    }
    return $headers;
}

function createfp($fingerprint, $headers) {
  $json = json_decode($fingerprint, true);
  $new_json = array();
  foreach($headers as $arr) {
   foreach($arr as $key => $value) {
       $new_json[$key] = $value;
    }
  }
 $new_json = json_encode($new_json);

 $array[] = array_reverse(json_decode($new_json, true));
 $array[] = json_decode($fingerprint, true);

 //return $array;

 $to_return = array();

  foreach($array as $arr) {
   foreach($arr as $key => $value) {
       $to_return[$key] = $value;
    }
  }

 return $to_return;
}


try {
    $m = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost/$dbName");
    $bulk = new MongoDB\Driver\BulkWrite;
    $decode = json_decode($fingerprint, true);
    $doc = [
            '_id' => new MongoDB\BSON\ObjectID, 
            'fingerprint' => $fingerprint,
            'webGLData_hash' => hash('sha256',$decode['webGLData']),
            'canvas_hash' => hash('sha256',$decode['canvas']),
	    'session_id' => 'sess_'.session_id(),
            'fpwithheaders' => createfp($fingerprint, getHeadersFromSessionId($m))

          ];
    echo print_r($doc);
    $bulk->insert($doc);
    $m->executeBulkWrite("botDetector.browserFP", $bulk);
    error_log("Done inserting".PHP_EOL, 3, '/tmp/debug_bfp_php.txt');

} catch (MongoDB\Driver\Exception\Exception $e) {
    $filename = basename(__FILE__);
    error_log("Exception:".$e->getMessage().PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
    error_log("In file:".$e->getFile().PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
    error_log("Line: #".$e->getLine().PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
}
?>
