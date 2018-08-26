<?php

function db () {
    require(dirname(__FILE__)."/config.php");
    require(dirname(__FILE__).'/version.php');
    static $conn;
    if ($conn===NULL){
        // Create connection
        $conn = new mysqli($servername, $username, $password, $database);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    }
    // Update db if needed
    $versionquery = "SELECT version FROM version";
    $versionresult = $conn->query($versionquery);
    $rowversion = $versionresult->fetch_array(MYSQLI_NUM);
    $version = $rowversion[0];

    if ($version =='') {
        $conn->query("INSERT IGNORE INTO `version` (`version`) VALUES ('1')");
        require_once('config/dbcreate.php');
    } else if ($version < $lastversion) {
        echo "<meta http-equiv='refresh' content='1;url=update.php'>";
    }
    return $conn;
}

?>
