<?php
include "connection.php";



header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,Access-Control-Allow-Methods');
$data=json_decode(file_get_contents("php://input"),true);
$student_id=$data['sid'];
$student_name=$data['name'];
$student_age=$data['age'];
$student_city=$data['city'];



$sql = "UPDATE student_data SET name = '{$student_name}', age = '{$student_age}', city = '{$student_city}' WHERE id = {$student_id}";




if(mysqli_query($conn,$sql)){
echo json_encode(array('message'=>"Data updated Sucessfully", "status"=>True));

}else{

echo json_encode(array('message'=>"Data not updated", "status"=>false));

}



?>