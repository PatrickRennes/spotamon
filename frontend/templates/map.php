<?php
require('config/config.php');
?>
<div id="map" default_loc="<?php echo $mapcenter ?>" session="<?php echo isset($_SESSION["uname"]) ?>"></div>

<script src="frontend/js/map.js"></script>
