<?php
// Debug mode set 
error_reporting(E_ALL);
ini_set('log_errors', TRUE);
ini_set('error_log', '/tmp/lifetime_php_errors.log');

//error_log('testing here!!');
//error_log('i am entering here');
//error_log('Invalid input on user login\r\n', 3, '/tmp/test_again_php_plz.txt');


session_start();

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

if (! isset($_POST['data'])){
    error_log('post data \r\n', 3, '/tmp/test_again_php_plz.txt');
    //error_log('request here:\r\n'.var_dump($_REQUEST), 3, '/tmp/test_again_php_plz.txt');
    error_log('here:\r\n'.print_r($_POST), 3, '/tmp/test_again_php_plz.txt');
    error_log('here all:\r\n'.file_get_contents('php://input'), 3, '/tmp/test_again_php_plz.txt');
    exit(0);
}
else {
    try {
        $client_time = intval($_POST['data']);
        error_log('intval \n', 3, '/tmp/test_again_php_plz.txt');
    }
    catch (Exception $e) {
	error_log('error intval \n', 3, '/tmp/test_again_php_plz.txt');
        exit(0);
    }
}

if(isset($_SESSION['first_seen_time'])){
    if ($client_time > $_SESSION['last_seen_time']){
        $_SESSION['last_seen_time'] = $client_time;
    error_log('first seen \n', 3, '/tmp/test_again_php_plz.txt');
    }
} 
else {
    $_SESSION['first_seen_time'] = $client_time;
    $_SESSION['last_seen_time'] = $client_time;
    $_SESSION['client_ip'] = get_client_ip();
    error_log('else seen \n', 3, '/tmp/test_again_php_plz.txt');
}


?>
