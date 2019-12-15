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
try {

    $m = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost/$dbName");
    $bulk = new MongoDB\Driver\BulkWrite;
    $doc = [
            '_id' => new MongoDB\BSON\ObjectID, 
            'fingerprint' => $fingerprint, 
	         'session_id' => 'sess_'.session_id()
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
