<?php
session_start();
// Debug mode set 
echo("Hi there");
ini_set('log_errors', TRUE);
//error_log("Here's some of the data for you".file_get_contents('php://input').PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
$debug_stuff = file_get_contents('php://input');
error_log($debug_stuff.PHP_EOL, 3, '/tmp/debug_google.txt');
?>
