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
 $text = "Description
         Niagara Falls is a city on the Niagara River, in New York State.\n
         It’s known for the vast Niagara Falls, which straddle the Canadian border.\n
         In Niagara Falls State Park, the Observation Tower, at Prospect Point,\n
         juts out over Niagara Gorge for a view of all 3 waterfalls. \n
         Trails from the Niagara Gorge Discovery Center lead to other viewpoints.
         The Aquarium of Niagara is home to Humboldt penguins, seals and sea lions.";

return $text;
}


function getRandomPage() {
  $randomstr = getRandomString(40);
  header('Location: ?r='.$randomstr);
}

if(isset($_GET['r'])) {
  echo pageContents();
} else {
 getRandomPage();
}
exit;

?>

