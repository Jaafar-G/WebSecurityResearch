<?php
session_start();
// Debug mode set 
ini_set('log_errors', 1);
error_log("Here's some of the data for you".file_get_contents('php://input').PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
$fingerprint = file_get_contents('php://input');
if (strlen($fingerprint) < 1){ 
    exit(0);
}

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

//function createfp($fingerprint, $headers) {
//  $json = json_decode($fingerprint, true);
//  $new_json = array();
//  foreach($headers as $arr) {
//   foreach($arr as $key => $value) {
//       $new_json[$key] = $value;
//    }
//  }
// //$new_json = json_encode($new_json);
//
//return $new_json;

// $array[] = array_reverse(json_decode($new_json, true));
// $array[] = json_decode($fingerprint, true);
//
// //return $array;
//
// $to_return = array();
//
//  foreach($array as $arr) {
//   foreach($arr as $key => $value) {
//       $to_return[$key] = $value;
//    }
//  }
//
// return $to_return;
//}

function getClientCodeHash($m) {
   $session = 'sess_'.session_id();
   $filter = ['data.head' => true];
   $options = [
          'projection' => ['_id' => 0, 'data.hash' => 1, 'data.totalSequence' => 1]
    ];
   $query = new \MongoDB\Driver\Query($filter, $options);
   $rows = $m->executeQuery('botDetector.sess_'.session_id(), $query); 
   $hash = '';

   foreach($rows as $r){
       $hash = $r->data->hash;
   }

  return $hash;
}

function getDataLength($m) {

   $session = 'sess_'.session_id();
   $filter = ['data.head' => true];
   $options = [
          'projection' => ['_id' => 0, 'data.hash' => 1, 'data.totalSequence' => 1, 'data.datalen' => 1]
    ];
   $query = new \MongoDB\Driver\Query($filter, $options);
   $rows = $m->executeQuery("botDetector.".'sess_'.session_id(), $query); 
   $dataLength = 0;

   foreach($rows as $r){
     if(!empty($r->data->datalen)) {
       return $r->data->datalen;
     }
   }

  return $dataLength;
}


function recreateData($m) {
   $session = 'sess_'.session_id();
   $filter = ['data.head' => true];
   $options = [
        'projection' => ['_id' => 0, 'data.hash' => 1, 'data.totalSequence' =>1]
    ];
   $query = new \MongoDB\Driver\Query($filter, $options);
   $rows = $m->executeQuery("botDetector.".'sess_'.session_id(), $query); 
   $hash = '';
   $totalSequence = 0;

   foreach($rows as $r){
       //$hash = $r->data->hash;
      if(!empty($r->data->totalSequence)) {
         $totalSequence = intval($r->data->totalSequence);
      }
    }

   $dataBlob = '';
  
   for($i=0; $i <= $totalSequence; $i++) {
       $filter = ['data.sequence' => $i];
       $options = [
          'projection' => ['_id' => 0, 'data.parts' => 1, 'data.sequence' => 0]
       ];
       $query = new \MongoDB\Driver\Query($filter, $options);
       $rows = $m->executeQuery("botDetector.".'sess_'.session_id(), $query); 
       foreach($rows as $r) {
         if(!empty($r->data->parts)) {
             $dataBlob = $dataBlob.$r->data->parts;
         }
       }
   }
    return $dataBlob;
}


function insertDB($m, $bulk) {
    $fingerprint = recreateData($m);
    $decode = json_decode($fingerprint, true);
    $doc = [
            '_id' => new MongoDB\BSON\ObjectID, 
            'fingerprint' => $fingerprint,
            'webGLData_hash' => hash('sha256',$decode['webGLData']),
            'canvas_hash' => hash('sha256',$decode['canvas']),
            'session_id' => 'sess_'.session_id(),
            'client_fingerprint_hash' => getClientCodeHash($m),
            'server_fingerprint_hash' =>  hash('sha256', $fingerprint),
            'received_data_length' => strlen($fingerprint),
            'sent_data_length' => getDataLength($m)
     ];
     $bulk->insert($doc);
     $m->executeBulkWrite("botDetector.browserFP", $bulk);
     //error_log("Full insertion complete".'\n', 3, '/tmp/debug_bfp_php.txt');
}


try {
    $m = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost/$dbName");
    $bulk = new MongoDB\Driver\BulkWrite;

    if (empty($_SESSION['counter'])) {
        $_SESSION['counter'] = 0;
    } else if(empty($_SESSION['totalSequence'])) {
        $_SESSION['totalSequence'] = -1;
    }

    $data = json_decode($fingerprint, true);

    if($data['head']) {
       //error_log("created total sequence", 3, '/tmp/debug_bfp_php.txt');
       $_SESSION['totalSequence'] =  intval($data['totalSequence']);
       //error_log("created total sequence ".$_SESSION['totalSequence'], 3, '/tmp/debug_bfp_php.txt');
    } else {
        $_SESSION['counter'] = $_SESSION['counter'] + 1;
        $doc = [
            '_id' => new MongoDB\BSON\ObjectID, 
            'data' => $data
        ;
        $bulk->insert($doc);
        $m->executeBulkWrite("botDetector.".'sess_'.session_id(), $bulk);
        if ($_SESSION['totalSequence'] == $_SESSION['counter']) {
	    insertDB($m, $bulk);
	}
    }

   // error_log("Done inserting".PHP_EOL, 3, '/tmp/debug_bfp_php.txt');

} catch (MongoDB\Driver\Exception\Exception $e) {
    $filename = basename(__FILE__);
    error_log("Exception:".$e->getMessage().PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
    error_log("In file:".$e->getFile().PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
    error_log("Line: #".$e->getLine().PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
}
?>
