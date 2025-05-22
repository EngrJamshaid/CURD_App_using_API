<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,Access-Control-Allow-Methods');
$data=json_decode(file_get_contents("php://input"),true);
$student_id=$data['sid'];

include "connection.php";


$sql = "DELETE FROM student_data WHERE id = {$student_id}";

$result=mysqli_query($conn,$sql) or die('SQL Query failed');
if($result){
   echo json_encode(array('message'=>"Record Deleted Sucessfully", "status"=>true)); 
}else{
     echo json_encode(array('message'=>"Record not Deleted", "status"=>false));   
}


?>