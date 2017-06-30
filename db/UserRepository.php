<?php

require_once("../db/db.php");

class UserRepository {

    private $optedInUsersTable = "optedin_users";
    
    public function __construct() {        
        $this->db = new Database;
    }
        
    public function create($args) {
        $result = array();
        
        $promoId = $args['promoId'];
        $pfNum = $args['pfNumber'];
        $deviceId = $args['deviceId'];

        if ($this->isPfNumValid($pfNum)) {
            if ($this->isDateWithinRange($promoId)) {
                if (!$this->hasUserOptedin($pfNum, $promoId)) {
                    $this->db->query(
                        "INSERT INTO " . $this->optedInUsersTable . " (promotions_id, pf_number, device_id) VALUES ('%s', '%s', '%s')",
                        array($promoId, $pfNum, $deviceId)
                    );
                    
                    $result = array('message' => 'Thank you for opting in.<br/> Good Luck!');
                } else {
                    $result = array('message' => 'You have already opted in for this promotion.');
                }
            } else {
                $result = array('message' => 'Sorry, the opt in promotion has expired...');
            }
        } else {
            $result = array('errno' => '-1', 'error' => 'Invalid request.');
        }
        
        return $result;
    }
    
    public function read() {
        return $this->db->query("SELECT * FROM " . $this->optedInUsersTable);
    }
    
    private function findOptedInUser($pfNum, $promoId) {
        return $this->db->query(
            "SELECT * FROM " . $this->optedInUsersTable . " WHERE pf_number = '%s' AND promotions_id = '%s'", 
            array($pfNum, $promoId)
        );
    }
    
    private function isPfNumValid($pfNum) {
        return substr($pfNum, 0, 2) == "PF" && is_numeric(substr($pfNum, 2));
    }
    
    private function hasUserOptedin($pfNum, $promoId) {
        $user = $this->findOptedInUser($pfNum, $promoId);
        
        return count($user) > 0 && !array_key_exists('errno', $user);
    }
    
    private function isDateWithinRange($id) {
        $resp = $this->db->query(
            "SELECT *
             FROM promotions
             WHERE
                promotions.id = '%s' AND
                NOW() > promotions.start_date AND
                NOW() < promotions.end_date", 
            array($id)
        );
        
        return count($resp) > 0;
    }
}