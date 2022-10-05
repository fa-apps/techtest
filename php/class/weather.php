<?php
    class Weather{
        // Connection

        private $conn;
        
        // Table

        private $db_table = "weather";
        
        // Columns

        public $weather_id;
        public $city_id;
        public $temperature;
        public $weather;
        public $precipitation;
        public $humidity;
        public $wind;
        public $date;

        // Db connection
        
        public function __construct($db){
            $this->conn = $db;
        }

        // GET ALL
        
        public function getAll($city_id){
          $sqlQuery = "SELECT weather_id, city_id, temperature, weather, precipitation, humidity, wind, date  FROM " . $this->db_table . " WHERE city_id = ? ORDER BY date";
          $stmt = $this->conn->prepare($sqlQuery);
          $stmt->bindParam(1, $city_id);
          $stmt->execute();
          return $stmt;
        }

        public function deleteAllFromCity($city_id){


          $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE city_id = ?";
          $stmt = $this->conn->prepare($sqlQuery);
          $stmt->bindParam(1, $city_id);
      
          if($stmt->execute()){
              return true;
          }
          return false;
        }

        public function deleteWeather($city_id,$weather_id){


          $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE city_id = ? AND weather_id = ?";
          $stmt = $this->conn->prepare($sqlQuery);
          $stmt->bindParam(1, $city_id);
          $stmt->bindParam(2, $weather_id);
      
          if($stmt->execute()){
              return true;
          }
          return false;
        }


        public function addWeather($weather) {

          $sqlQuery = "INSERT INTO " . $this->db_table . " (`city_id`, `temperature`, `weather`, `precipitation`, `humidity`, `wind`, `date`) 
            VALUES  (?,?,?,?,?,?,?)";
          $stmt = $this->conn->prepare($sqlQuery);
          $stmt->bindParam(1, $weather["city_id"]);
          $stmt->bindParam(2, $weather["temperature"]);
          $stmt->bindParam(3, $weather["weather"]);
          $stmt->bindParam(4, $weather["precipitation"]);
          $stmt->bindParam(5, $weather["humidity"]);
          $stmt->bindParam(6, $weather["wind"]);
          $stmt->bindParam(7, $weather["date"]);
      
          if($stmt->execute()){
              return true;
          }
          return false;
        }

    }
?>