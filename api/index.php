<?php

 // Quick router + controller

  $q = explode("/",$_SERVER['REQUEST_URI']);
  $root= array_shift($q);

  if ($q[0] == 'cities') {

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once './config/database.php';
    $database = new Database();
    $db = $database->getConnection();

      include_once './class/city.php';

    if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    
      $result = array();

      if (count($q) == 1) {
        //get cities

        $items = new City($db);
        $stmt = $items->getAll();
        $itemCount = $stmt->rowCount();
        $result["data"] = array();
        $result["count"] = $itemCount;
        if($itemCount > 0){      
          while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $model = array(
              "city_id" => $city_id,
              "city_label" => $city_label,
              "country" => $country,
              "creation_date" => $creation_date,
              "report_count" => $report_count
            );
            array_push($result["data"], $model);
          }
        }
      } else if (count($q) == 3 && $q[2] =="weather") {
        //get reports for a city

        $items = new Weather($db);
        $stmt = $items->getAll($q[1]);
        $itemCount = $stmt->rowCount();
        $result["data"] = array();
        $result["count"] = $itemCount;
        if($itemCount > 0){      
          while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $model = array(
              "weather_id" => $weather_id,
              "city_id" => $city_id,
              "temperature" => $temperature,
              "weather" => $weather,
              "precipitation" => $precipitation,
              "humidity" => $humidity,
              "wind" => $wind,
              "date" => $date,
            );
            array_push($result["data"], $model);
          }
        }
      }
      echo json_encode($result);

    }  
    else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') { 
      if (count($q) == 2) {
        // delete city

        $items = new City($db);
        $stmt = $items->deleteCity($q[1]);
        echo(json_encode("city has been deleted"));
      }
      if (count($q) == 4 && $q[2] =="weather") {
        // delete report

        $items = new Weather($db);
        $stmt = $items->deleteWeather($q[1],$q[3]);
        echo(json_encode("weather has been deleted"));
      }
    } 
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
      if (count($q) == 1) {
        // add city
        
        $entityBody = json_decode(file_get_contents('php://input'),true);

        if ( isset($entityBody["city_label"]) && isset($entityBody["country"])){
          $city_label =$entityBody["city_label"];
          $country =$entityBody["country"];
          $items = new City($db);
          $stmt = $items->addCity($city_label,$country);
          echo(json_encode("city has been added"));
        }
      }
      if (count($q) == 3 && $q[2] =="weather") {
        // add report
        
        $entityBody = json_decode(file_get_contents('php://input'),true);

        $items = new Weather($db);
        $stmt = $items->addWeather($entityBody);
        echo(json_encode("weather has been added"));
      }
    }
  }
?>