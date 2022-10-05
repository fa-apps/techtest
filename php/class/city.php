<?php

require_once("weather.php");

    class City{
        // Connection

        private $conn;
        
        // Table

        private $db_table = "city";
        
        // Columns

        public $city_id;
        public $city_label;
        public $country;
        public $date;

        // Db connection
        
        public function __construct($db){
            $this->conn = $db;
        }

        // GET ALL
        
        public function getAll(){
            $sqlQuery = "SELECT c.city_id, city_label, country , creation_date, count(w.weather_id) report_count FROM " . $this->db_table . " c LEFT JOIN weather w ON w.city_id = c.city_id GROUP BY c.city_id ORDER BY c.city_label";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function deleteCity($city_id) {

          $weather = new Weather($this->conn);
          $weather->deleteAllFromCity($city_id);

          $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE city_id = ?";
          $stmt = $this->conn->prepare($sqlQuery);
          $stmt->bindParam(1, $city_id);
      
          if($stmt->execute()){
              return true;
          }
          return false;
        }

        public function addCity($city_label,$country) {

          $sqlQuery = "INSERT INTO " . $this->db_table . " (country,city_label) VALUES (?,?)";
          $stmt = $this->conn->prepare($sqlQuery);
          $stmt->bindParam(1, $country);
          $stmt->bindParam(2, $city_label);
      
          if($stmt->execute()){
              return true;
          }
          return false;
        }

        
    }
?>