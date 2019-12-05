<?php

//require_once('/var/www/hey.quickwebchecker.com/html/config.php'); 
 
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
  include 'detector/index.html'
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
  echo pageContents();
  //getRandomPage();
//}


exit;

?>

