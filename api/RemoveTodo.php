<?php
// Used for local host debugging (remove for production purposes)
header('Access-Control-Allow-Origin: *'); 
class RemoveTodoAPI {
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
        // Print all codes in database
        $stmt = $this->db->prepare("DELETE FROM todo WHERE todo_id='".$_GET[id] ."'");
        $stmt->execute();
		//header("Content-type: text/xml");
		//echo "Removed ". $_GET[id] ." from the database.";
        $stmt->close();
    }
}
 
// This is the first thing that gets called when this page is loaded
// Creates a new instance of the RedeemAPI class and calls the redeem method

// im3460 / T3stus3r
$api = new RemoveTodoAPI;
$api->call();


?>