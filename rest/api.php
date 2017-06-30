<?php   
    
    require_once("Rest.inc.php");
    require_once("../db/UserRepository.php");

    class API extends REST {

        private $repo = null;
        
        public function __construct() {
            parent::__construct();
            $this->repo = new UserRepository;
        }
        
        public function processApi() {
            $this->optin();
        }
        
        private function optin() {  
            $result = array();
        
            switch ($this->get_request_method()) {
                case "POST":
                    $result = $this->repo->create($this->_request);
                    break;
                case "GET":
                    $result = $this->repo->read();
                    break;
                default:
                    $this->response('', 406);
                    break;
            }
            
            $this->sendResponse($result);
        }
        
        private function sendResponse($result) {
            if (sizeof($result) > 0 && !array_key_exists('errno', $result)) {
                $this->response($this->json($result), 200);
            } else {
                $this->response($this->json($result), 500);
            }
        }
        
        private function json($data) {
            if (is_array($data)) {
                return json_encode($data);
            }
        }
    }
    
    $api = new API;
    $api->processApi();