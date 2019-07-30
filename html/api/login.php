<?php
// Initialize the session

session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: query.php");
    exit;
}
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }

    // Validate credentials
    if(empty($username_err) && empty($password_err)){
	if ($password == '$Coyote34#' && $username == 'admin') {
		session_start();
                // Store data in session variables
                $_SESSION["loggedin"] = true;
                $_SESSION["id"] = "0";
                $_SESSION["username"] = $username;
		header("location: query.php");  
	}
   }
}
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
		width:450px;
	}

        img {
  	  display: block;
  	  margin-left: auto;
  	  margin-right: auto;
  	  width: 50%;
       }
    </style>
</head>
<body>
    <div>
	<img src="uno-logo.jpg" style="align:center; width:10%"/>
        <h3 align="center">University of New Orleans</h3>
        <h4 align="center"> Center for Cyber Security Research Database </h4>
	<br /> <br /> 
        <p align="center">Please fill in your credentials to login.</p>
	<br /> <br />
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Login">
            </div>
            <p>Don't have an account? <a href="mailto:bacharya@uno.edu">Request access</a>.</p>
        </form>
    </div>
</body>
</html>
