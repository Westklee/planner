<?php
if($_GET[completed] != ""){
	$db = new mysqli("westonkleecom.ipagemysql.com","demo_user","Plann3r!","planner");
	$query = "UPDATE todo SET completed='";
	$query .= $_GET[completed];
	$query .= "' WHERE todo_id='";
	$query .= $_GET[id];
	$query .= "'";
	
	$stmt = $db->prepare($query);
	$stmt->execute();
	//header("Content-type: text/xml");
	$stmt->close();
	$db->close();
}
?>