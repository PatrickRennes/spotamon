<?php

function register_body(){
    require_once('../config/db.php');
    $conn = db();

    // If form submitted, insert values into the database.
    if (isset($_REQUEST['uname'])){
        $uname = stripslashes($_REQUEST['uname']); // removes backslashes
        $uname = mysqli_real_escape_string($conn,$uname); //escapes special characters in a string
        $email = stripslashes($_REQUEST['email']);
        $email = mysqli_real_escape_string($conn,$email);
        $upass = stripslashes($_REQUEST['password']);
        $upass = mysqli_real_escape_string($conn,$upass);
        $offtrades = 0;
        $reqtrades = 0;
        $usergroup = 1;
        $trn_date  = date("Y-m-d H:i:s");

        $checkuserquery = "SELECT * FROM users WHERE uname='$uname'";
        $userresult     = $conn->query($checkuserquery);
        $row_cnt        = $userresult->num_rows;
        if ($row_cnt == 1) {
            include('./templates/register_collision.php');
        } else {
            $query  = "INSERT into `users` (uname, upass, email, usergroup, trn_date, url, lastUpload, offtrades, reqtrades) VALUES ('$uname', '" . md5($upass) . "', '$email', '$usergroup', '$trn_date', '', '', '$offtrades', '$reqtrades')";
            $result = mysqli_query($conn, $query);
            if ($result) {
                include('./templates/register_success.php');
            }
        }
    } else {
        include('./templates/register_form.php');
    }
}

include('./templates/register.php')

?>
