<?php

    switch ($_SERVER['SERVER_NAME']) {
        case "live":
            $dbHost = "";
            $dbUsername = "";
            //$dbPassword = "";
            $dbPassword = "";
            $dbName = "optin_campaigns_test";
            break;
        case "localhost":
            $dbHost = "localhost";
            $dbUsername = "root";
            $dbPassword = "";
            $dbName = "optin_campaigns";
            break;
        default:
            $dbHost = "";
            $dbUsername = "";
            $dbPassword = "";
            $dbName = "";
    }
    
    define('DB_HOST', $dbHost);
	define('DB_USERNAME', $dbUsername);
	define('DB_PASSWORD', $dbPassword);
	define('DB_NAME', $dbName);