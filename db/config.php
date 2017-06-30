<?php

    switch ($_SERVER['SERVER_NAME']) {
        case "offer.betfred.com":
            $dbHost = "petfre-mysqldb2.cenhgfamfqug.eu-west-1.rds.amazonaws.com";
            $dbUsername = "offeruser";
            //$dbPassword = "asaC8PeiyE";
            $dbPassword = "QrhXu1gxnWi9";
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