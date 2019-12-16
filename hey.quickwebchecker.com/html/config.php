<?php
//require_once '/var/www/html/vendor/autoload.php';
//include "/var/www/html/utils/utilities.php";


session_start();
$username = "pwnuno";
$password = 'a#nsus6y3!';
$dbName = 'botDetector';
$collectionName = 'requestHeader';


function getTimestamp() {
  $dateTime = date("Y-m-d H:i:s.v").gettimeofday()['usec']; 
  return $dateTime;
}

function getcymruASNinfo() {
  try {
      $cymru = explode("|", exec("whois -h whois.cymru.com  -v ".get_client_ip()));
      $json_val = null;
      $json_val->asn  = trim($cymru[0]);
      $json_val->ip  = trim($cymru[1]);
      $json_val->bgpPrefix  = trim($cymru[2]);
      $json_val->cc  = trim($cymru[3]);
      $json_val->registry  = trim($cymru[4]);
      $json_val->allocated  = trim($cymru[5]);
      $json_val->asname  = trim($cymru[6]);
      //$json_val->whois = getwhoisInfo();
      $format_json = json_encode($json_val);
      return $json_val;
  } catch(Exception $e) { 
      print("Exception in processing");
      return null;
 }

}

function getwhoisInfo() {
   $result = shell_exec('whois '.get_client_ip());
   // remove string before result (introductory string)
   $result = strstr($result, 'NetRange'); 
   // remove string at end of the result
   $result = strstr($result,'#', true);
   // separate each result new line 
   $result = explode("\n", $result);
   
   $result = array_diff($result, array(" "));
   
   foreach($result as $key => $value) {
     if(empty($value)) {
       unset($result[$key]);
     }
   }

   $map = array();

   foreach($result as $val) {
      $val = explode(":", $val);
      $map[trim($val[0])] = trim($val[1]);
   }
   return $map;
}

function getFullURL() {
  //$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
  //return $actual_link;
  $uri = $_SERVER['REQUEST_URI'];
  return $uri;
}

function getIPStackInfo($ip) {
  // blocking self ip for limit testing request 
  // bacharya@'s IP address
  if($ip != "137.30.126.213") {
     $client = new \GuzzleHttp\Client();
     $response = $client->request('GET', 'http://api.ipstack.com/'.$ip.'?access_key=0f239f219974d3614c2a385132a0d787');
     return json_decode($response->getBody()); # '{"id": 1420053, "name": "guzzle", ...}'
  } else {
    return "omitting ipstack call for self computer - being frugal on call request";
 }
}

function getShodanHostInfo($ip) {
  // blocking self ip for limit testing request 
  // bacharya@'s IP address
//  if($ip != "137.30.126.213") {
     $client = new \GuzzleHttp\Client();
     $response = $client->request('GET', 'https://api.shodan.io/shodan/host/'.$ip.'?key=349HpFD6Gmn2Jji6eZhT8qkZNuA7tkD1');
     return json_decode($response->getBody()); // '{"id": 1420053, "name": "guzzle", ...}'
//  } else {
//    return "omitting ipstack call for self computer - being frugal on call request";
// }
}


function get_nginx_headers($function_name='getallheaders'){
$all_headers=array();
 if(function_exists($function_name)){ 
   $all_headers=$function_name();
    }
    else{

        foreach($_SERVER as $name => $value){
        if(substr($name,0,5)=='HTTP_'){
        $name=substr($name,5);
                $name=str_replace('_',' ',$name);
                $name=strtolower($name);
                $name=ucwords($name);
                $name=str_replace(' ', '-', $name);
                $all_headers[strtolower($name)] = $value; 
            } elseif($function_name=='apache_request_headers'){
                $all_headers[strtolower($name)] = $value; 
            }
       }
    }

    return $all_headers;           
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
            'headers' => get_nginx_headers(), 
            'ip' => $ip, 
            'cymru' => getcymruASNinfo(),
            // 'whois' => getwhoisInfo(),
            //'geoInfo' => getIPStackInfo($ip),
            //'hostInfo' => getShodanHostInfo($ip),
            'url'=> getFullURL(),
            'queryInsertTimeStamp' => getTimestamp(), // time lags with current time, use session_first_seen time
	    'session_id' => 'sess_'.session_id()
          ];
    //echo print_r($doc);
    $bulk->insert($doc);
    $m->executeBulkWrite("botDetector.requestHeader", $bulk);

} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    echo "Exception:", $e->getMessage(), "\n";
    echo "In file:", $e->getFile(), "\n";
    echo "Line: #", $e->getLine(), "\n";
}

?>

