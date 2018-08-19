<?php
include_once('./auth.php');
require('../config/config.php');

// If form submitted, insert values into the database.
if (isset($_POST['uname'])){

		$uname = stripslashes($_REQUEST['uname']); // removes backslashes
		$uname = mysqli_real_escape_string($conn,$uname); //escapes special characters in a string
		$upass = stripslashes($_REQUEST['upass']);
		$upass = mysqli_real_escape_string($conn,$upass);

		//Checking is user existing in the database or not
    $query = "SELECT * FROM `users` WHERE uname='$uname' and upass='".md5($upass)."'";
		$result = mysqli_query($conn,$query) or die(mysql_error());
		$rows = mysqli_num_rows($result);
    if($rows==1){
				$_SESSION['uname'] = $uname;
				$_SESSION['upass'] = $upass;
				header('Location:./');
    }else{
				include('./templates/badauth.php');
		}
}else{
		include('./templates/login.php');
}
?>
