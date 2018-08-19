<?php
include_once('./auth.php');
if(session_destroy()) // Destroying All Sessions
{
    header("Location: ../index.php"); // Redirecting To Home Page
}
?>
