<?php

  require_once('/var/www/html/config.php');

/* Redirect to a different page in the current directory that was requested */
$host  = $_SERVER['HTTP_HOST'];

$extra = 'advertising/examples.php';

function getRandomString() {
  $randomChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $randomString = '';
  $pageSize = 30;
  for ($i = 0; $i < $pageSize; $i++) {
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
   $randomstr = getRandomString();
   $page = '/var/www/html/rp/'.$randomstr.'.html';  
   shell_exec("sudo -S touch $page");
   $contents = pageContents();
   file_put_contents($page,$contents);
   header("Location: http://137.30.124.130/rp/".$randomstr.'.html');
   exit;
}


if($host == "137.30.124.130") {
  header("Location: http://$host$uri/$extra");
} else if($host == "quickwebchecker.com") {
   echo pageContents(); 
   getRandomPage();

}

exit;
?>
