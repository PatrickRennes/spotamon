	<?php
	require_once('../config/db.php');
	$conn = db();
	$sql = "UPDATE gyms SET egg='0',hour='0',min='0',ampm='0',eggby='' WHERE date < (NOW() - INTERVAL 1 MINUTE)";
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
