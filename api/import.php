<?php 
  
echo "importing...";

$db = new PDO("mysql:host=mysql;port=3306", "root", "12345");

$sql = file_get_contents('weather_v1.sql');

$qr = $db->exec($sql);

echo "Done."

?>