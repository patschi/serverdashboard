<?php

// Set the default network interface
// for the network speed here.
$config["interface"] = "eth0";

// Allow external access for example with AJAX?
// (From other domains/urls)
$config["AllowExternalAccess"] = false;

// How long the values should be cached
// to prevent high load on more visitors
// or some refresh attacks?
// Set "0" to disable.
$config["cacheminutes"] = 5; // 5 minutes

// Set software services
// Format: array("Displayname", "Processname")
$config["Software"] = array(
	'SW_Web'  => array($_SERVER['SERVER_SOFTWARE']	=> 'nginx'),
	'SW_DB'   => array('MySQL'						=> 'mysqld'),
	'SW_MAIL' => array('Postfix'					=> 'postfix'),
	'SW_FTP'  => array('ProFTPd'					=> 'proftpd')
);

?>