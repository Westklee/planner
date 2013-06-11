<?php
 
class AddTodoDate {
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
    	if($_GET[due_date] != ""){
	        // Print all codes in database
	        $stmt = $this->db->prepare("INSERT INTO todo (due_date) VALUES ('" . $_GET[due_date] ."')");
	        $stmt->execute();
			//header("Content-type: text/xml");
			echo "Added ". $_GET[due_date] ." to the database.";
    	}
        $stmt->close();
    }
}
 
// This is the first thing that gets called when this page is loaded
// Creates a new instance of the RedeemAPI class and calls the redeem method

// im3460 / T3stus3r
$api = new AddTodoDate;
$api->call();


?>