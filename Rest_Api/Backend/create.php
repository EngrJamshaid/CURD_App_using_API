<?php
include "connection.php";



header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,Access-Control-Allow-Methods');
$data=json_decode(file_get_contents("php://input"),true);
$student_name=$data['name'];
$student_age=$data['age'];
$student_city=$data['city'];

// ✅ Validation: Check if any field is empty
if (empty($student_name) || empty($student_age) || empty($student_city)) {
    echo json_encode(array('message' => "All fields are required", "status" => false));
    exit;
}

$sql="INSERT INTO student_data(name,age,city) VALUES ('{$student_name}', '{$student_age}', '{$student_city}')";



if(mysqli_query($conn,$sql)){
echo json_encode(array('message'=>"Data Inserted Sucessfully", "status"=>True));

}else{

echo json_encode(array('message'=>"Data not Inserted", "status"=>false));

}



?>