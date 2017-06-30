<?php

require_once('../db/config.php');

class Database 
{
    private $db = null;
    
    public function __construct() {
    }
    
    private function connect() {
        $this->db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
        
        if ($this->db->connect_errno) {
            die('Connection Error: ' . $this->db->connect_errno);
        }
    }
    
    public function query($query, $args = array()) {    
        $result = null;
        $results_array = array();
        
        $this->connect();
        
        $escapedStrings = $this->escapeStrings($args);
        $sql = vsprintf($query, $escapedStrings);
        
        $this->db->real_query($sql);

        if (!$this->db->errno) {
            if ($this->db->field_count) {
                $result = $this->db->store_result();
                
                while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                    array_push($results_array, $row);
                }
                                
                $result->free_result();
            }
        } else {
            $results_array['errno'] = $this->db->errno;
            $results_array['error'] = $this->db->error;
        }
        
        $this->db->close();
        
        return $results_array;
    }
    
    private function escapeStrings($args) {
        $escapedStrings = array();
        
        foreach ($args as $a) {
            array_push($escapedStrings, $this->db->real_escape_string($a));
        }
        
        return $escapedStrings;
    }
}