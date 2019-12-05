<?php

require_once('/var/www/hey.quickwebchecker.com/html/config.php'); 
 
/* Redirect to a different page in the current directory that was requested */
session_start();

$host  = $_SERVER['HTTP_HOST'];

function getRandomString($size) {
 $randomChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 $randomString = '';
 for ($i = 0; $i < $size; $i++) {
   $index = rand(0, strlen($randomChars) - 1);
   $randomString .= $randomChars[$index];
 }
   return $randomString;
}

function pageContents() {
  $text = '
    <!DOCTYPE html>
<html lang="en">
  <head>
    <title>Browser Fringerprint</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://www.google.com/recaptcha/api.js?render=6Lesb8UUAAAAAAg1VI34Ofi-eEnVehT6nLw4P0XN"></script>
    <script src="./detector/recaptcha/recaptcha.js"></script>
    <script src=".detector/fingerprintjs/js/jquery-2.2.4.min.js"></script>
    <script src="./detector/fingerprintjs/js/fingerprint2.min.js"></script>
    <script src="./detector/fingerprintjs/js/md5.min.js"></script>
    <script src="./detector/fingerprintjs/js/script.js"></script>
    <script type="text/javascript" src="./detector/jsdetectbot/driverdetect.js"> </script>
    <script type="text/javascript" src="./detector/jsdetectbot/interaction-detector.js"></script>
    <link rel="stylesheet" type="text/css" href="detector/fingerprintjs/css/style.css">  
  </head>
  <body>
    Niagara Falls is a group of three waterfalls at the southern end of Niagara Gorge, between the Canadian province of Ontario and the US state of New York. The largest is Horseshoe Falls, also known as Canadian Falls, which straddles the international border between Canada and the United States.[1] The smaller American Falls and Bridal Veil Falls lie entirely within the United States. Bridal Veil Falls are separated from Horseshoe Falls by Goat Island and from American Falls by Luna Island.

    Located on the Niagara River, which drains Lake Erie into Lake Ontario, the combined falls have the highest flow rate of any waterfall in North America that has a vertical drop of more than 50 metres (160 ft). During peak daytime tourist hours, more than 168,000 m3 (six million cubic feet) of water goes over the crest of the falls every minute.[2] Horseshoe Falls is the most powerful waterfall in North America, as measured by flow rate.[3]

    The falls are 27 kilometres (17 mi) north-northwest of Buffalo, New York, and 121 kilometres (75 mi) south-southeast of Toronto, between the twin cities of Niagara Falls, Ontario, and Niagara Falls, New York. Niagara Falls was formed when glaciers receded at the end of the Wisconsin glaciation (the last ice age), and water from the newly formed Great Lakes carved a path through the Niagara Escarpment en route to the Atlantic Ocean.

    Niagara Falls is famed both for its beauty and as a valuable source of hydroelectric power. Balancing recreational, commercial, and industrial uses has been a challenge for the stewards of the falls since the 19th century.
    </body>
    </html>
    ';
  return $text;
}


function getRandomPage() {
  $randomstr = getRandomString(40);
  //header('Location: ?r='.$randomstr);

  $id = '/' != ($_SERVER['REQUEST_URI']) ? str_replace('/?id=' ,"", $_SERVER['REQUEST_URI']) : 0;
  header('Location: ?r'.$id);
}

//if(isset($_GET['r'])) {
//  echo pageContents();
//} else {
  pageContents();
  //getRandomPage();
//}


exit;

?>

