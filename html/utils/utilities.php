<?php
function getHost($ip) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $fullhost = gethostbyaddr($ip);
    $host = preg_replace("/^[^.]+./", "*.", $fullhost);
    return $host;

}


?>
