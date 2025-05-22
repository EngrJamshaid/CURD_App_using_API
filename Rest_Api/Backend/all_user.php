<?php
header('Content-Type: application/json');


// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific headers and methods if needed
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");


include "connection.php";

$sql="SELECT *FROM student_data";
$result=mysqli_query($conn,$sql) or die('SQL Query failed');

if(mysqli_num_rows($result)>0){
    $output=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);

}else{

echo json_encode(array('message'=>"No data found", "status"=>false));

}

?>