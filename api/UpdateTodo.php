<?php
if($_GET[title] != ""){
	$db = new mysqli("westonkleecom.ipagemysql.com","demo_user","Plann3r!","planner");
	$query = "UPDATE todo SET title='";
	$query .= $_GET[title];
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