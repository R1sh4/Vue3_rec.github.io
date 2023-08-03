<?php
header('Content-Type: application/json; charset=utf-8');
function cal_body_type($growth, $shoulder, $bust, $waistline, $femur) {
    
    $ratio_x = round($bust / $waistline, 2);
    $ratio_y = round($femur / $waistline, 2);

    if(abs($ratio_x - $ratio_y) < 0.08)
    {
        if($ratio_x>0 and $ratio_y>0 and $ratio_x<0.96 and $ratio_y<0.96)
            $body_type = "rectangle";
        if($ratio_x>0.95 and $ratio_y>0.95 and $ratio_x<1.37 and $ratio_y<1.37)
            $body_type = "hourglass";
        if($ratio_x>1.36 and $ratio_y>1.36 and $ratio_x<2 and $ratio_y<2)
            $body_type = "pear";
    }
    else
    {
        if(ratio_x > ratio_y){
            $body_type = "triangle";
        }
        else
            $body_type = "pear";
    }
    


$conn = new mysqli("localhost", "root", "", "fittingroomdb");
			if($conn->connect_error){
			    die("Ошибка: " . $conn->connect_error);
			}
    

$query = 'SELECT title,recommendation FROM body_types';
$res = $conn->query($query);
foreach($res as $row)
{
    if($body_type == $row['title']) 
    {
        $result = $row['recommendation'];
    }
}
    mysqli_close($conn);
return $result;
}
$_POST = json_decode(file_get_contents('php://input'), true);
$res = cal_body_type($_POST['growth'],$_POST['shoulder'],$_POST['bust'],$_POST['waistline'],$_POST['femur']);
// $json = json_encode($res);
//             echo $json;
echo $_POST;
?>
