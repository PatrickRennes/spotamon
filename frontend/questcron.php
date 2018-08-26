<?php
require_once('../config/db.php');
$conn = db();
$sql = "UPDATE stops SET quested='0',actquest='0',actreward='0',hour='0', min='0',ampm='0',questby='0' WHERE date < CURDATE()";
if(!mysqli_query($conn,$sql))
{
    echo 'Not Deleted';
}
else
{
    echo 'Deleted';
}
 // ends *_query() call
?>
