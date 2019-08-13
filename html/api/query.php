<?php
// Initialize the session

session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(!$_SESSION["loggedin"]) {
    header("location: login.php");
    exit;
}

$domain_err = "Please enter domain name";
$ip_err = "Please enter IP";

?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif;}
        .wrapper{ width: 350px; margin: 0;
	padding: 0;}
	form, p { 
		margin: 0 auto; 
		width:200px;
	}

        img {
  	  display: block;
  	  margin-left: auto;
  	  margin-right: auto;
  	  width: 50%;
       }

	table {
 		 table-layout: fixed;
 		 width: 800px;
	}

         tr, td {
 		border: 0px white;
         }

    </style>
</head>
<body>
    
	<img src="uno-logo.jpg" style="align:center; width:10%"/>
        <h3 align="center">University of New Orleans</h3>
        <h4 align="center"> Center for Cyber Security Research Database </h4>
	<p align="center"> <a href="logout.php"> logout </a> </p>
	<br /> <br /> 
	<br /> <br />

        <p align="center"><b> API Access </b></p>
	<br /> <br />

    <table align="center">
        <tr>
            <td>
                <div>
                    <form action="api.php" method="post">
                        <div class="form-group">
                            <label>Search by Domain Name </label> <br />
			    <input type="radio" name="store" value="yes"> Display and Store Data <br>
                            <input type="radio" name="store" value="no"> Display Only Data <br> <br />
                            <input type="text" name="domain" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn btn-primary" value="submit">
                        </div>
                    </form>
                </div>
            </td>

            <td>
                <div>
                        <form action="api.php" method="post">
                        <div class="form-group">
                            <label>Search by IP Address </label> <br />
			    <input type="radio" name="store" value="yes"> Display and Store Data <br>
                            <input type="radio" name="store" value="no"> Display Only Data <br> <br />
                            <input type="text" name="ip" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn btn-primary" value="submit">
                        </div>
                        </form>
                </div>
            </td>
        </tr>



</body>
</html>
