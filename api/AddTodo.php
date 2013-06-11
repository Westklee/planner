<?php
header('Access-Control-Allow-Origin: *'); 
class AddTodoAPI {
    private $db;
     
    // Constructor - open DB connection
    function __construct() {
        $this->db = new mysqli("westonkleecom.ipagemysql.com","demo_user","Plann3r!","planner");
    }
 
    // Destructor - close DB connection
    function __destruct() {
        $this->db->close();
    }
    
    // Main method to redeem a code
    function call() {
    	if($_GET[title] != ""){
	        // Print all codes in database
	        $stmt = $this->db->prepare("INSERT INTO todo (title, due_date, user_id) 
                VALUES ('" . $_GET[title] ."', '" . $_GET[due_date] ."', '" . $_SERVER['REMOTE_ADDR'] . "')");
	        $stmt->execute();
			//header("Content-type: text/xml");
			echo "Added ". $_GET[title] ." to the database.";
    	}
        $stmt->close();
    }
}
 
// This is the first thing that gets called when this page is loaded
// Creates a new instance of the RedeemAPI class and calls the redeem method

$api = new AddTodoAPI;
$api->call();


?>