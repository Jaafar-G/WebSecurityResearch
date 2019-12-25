<?php
	  session_start();
	  $username = "pwnuno";
	  $password = 'a#nsus6y3!';
	  $dbName = 'botDetector';
	  $collectionName = 'reCaptchaTest';
          define('SITE_KEY', '6Lf1tsgUAAAAAGeYgdejWRjrKIcGylPLrwLlBFNK');
          define('SECRET_KEY', '6Lf1tsgUAAAAAOgqJNDinZj8Cs7fcmUB0lK0hB9q');
          $received_token = $_POST['name'];
	  $urlAddr = $_POST['urlName'];
          $secret_key = '6Lf1tsgUAAAAAOgqJNDinZj8Cs7fcmUB0lK0hB9q';
          $url = 'https://www.google.com/recaptcha/api/siteverify';
          $data = array('secret' => $secret_key, 'response' => $received_token);
          $options = array(
          'http' => array(
          'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
          'method'  => 'POST',
          'content' => http_build_query($data)
          )
          );
          $context  = stream_context_create($options);
          $result = file_get_contents($url, false, $context);
          //echo($result);
	  $score = json_decode($result);
	  //echo $score-> score;
	  //echo $urlAddr;
try {

    $m = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost/$dbName");
    $bulk = new MongoDB\Driver\BulkWrite;
    $doc = [
            '_id' => new MongoDB\BSON\ObjectID,
            'url' => $urlAddr,
            'score' => $score,
            'session_id' => 'sess_'.session_id()
	  ];
    $bulk->insert($doc);
    $m->executeBulkWrite("botDetector.reCaptchaTest", $bulk);

} catch (MongoDB\Driver\Exception\Exception $e) {
    $filename = basename(__FILE__);
    echo "Exception:", $e->getMessage(), "\n";
    echo "In file:", $e->getFile(), "\n";
    echo "Line: #", $e->getLine(), "\n";
}
?>


