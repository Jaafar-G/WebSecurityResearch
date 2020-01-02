<?php
session_start();

$file_path = "/var/www/hey.quickwebchecker.com/logs/log_" .  date('Y_m_d_H') . '.txt';
$sess_id = 'sess_' . session_id();
$now = time();


// Debug mode set 
ini_set('log_errors', TRUE);
//error_log("Here's some of the data for you".file_get_contents('php://input').PHP_EOL, 3, '/tmp/debug_bfp_php.txt');
$debug_stuff = file_get_contents('php://input');
$log_line = $sess_id . " " . $now . " " . $debug_stuff . PHP_EOL; 
error_log($log_line, 3, $file_path);
?>
