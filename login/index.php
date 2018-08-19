<?php
include("auth.php"); //include auth.php file on all secure pages

$tpl_uname = $_SESSION['uname'];
include('./templates/welcome.php');
?>
