<?php

$cacheminutes = 5; // 5 minutes
$cachetime = $cacheminutes * 60;

$flag = true;

$get = trim($_SERVER['argv'][0]);
if(!file_exists("cache_".$get.".txt")) {
	file_put_contents("cache_".$get.".txt", "");
	$flag = false;
}

if((filemtime("cache_".$get.".txt") + $cachetime) > time() && $flag) {
	echo file_get_contents("cache_".$get.".txt");

}else{
	$memInfo = getMemInfo();
	$time = time();

	if($_GET["data"] == "NetSpeedUp") {
		$data["value"]      = getSpeed("tx");

	}else if($_GET["data"] == "NetSpeedDown") {
		$data["value"]      = getSpeed("rx");

	} else if($_GET["data"] == "all") {

		$data["SW_Web"]	       = CheckRunningProcess("nginx");
		$data["SW_DB"]         = CheckRunningProcess("mysqld");
		$data["SW_FTP"]        = CheckRunningProcess("proftpd");
		$data["SW_MAIL"]       = CheckInitdProcess("postfix");

		$data["HW_OS"]         = getOperatingSystem();
		$data["HW_KERNEL"]     = getKernel();
		$data["HW_CPU"]        = getCPU();

		$data["HW_RAM_USED"]   = getSize($memInfo["MemTotal"] - $memInfo["MemFree"]);
		$data["HW_RAM_AVAIL"]  = getSize($memInfo["MemTotal"]);
		$data["HW_SWAP_USED"]  = getSize($memInfo["SwapTotal"] - $memInfo["SwapFree"]);
		$data["HW_SWAP_AVAIL"] = getSize($memInfo["SwapTotal"]);

		$data["NET_IP"]        = getIP();

	}else{
		die("ERROR");
	}

	$data["CACHE"]     = $cachetime; 
	$data["TIMESTAMP"] = $time;
	$data = json_encode($data);
	file_put_contents("cache_".$get.".txt", $data);
	echo $data;
}

// Functions
function CheckRunningProcess($prc) {
	$o = shell_exec("pidof ".$prc);
	if(empty($o)) {
		return "R0";
	 }else{
		return "R1";
	}
}

function CheckInitdProcess($prc) {
	$o = shell_exec("/etc/init.d/".$prc." status");
	if(strpos($o, "running") !== false) {
		return "R0";
	 }else{
		return "R1";
	}
}

function getOperatingSystem() {
	$o = shell_exec("lsb_release -d");
	$o = explode(":", $o);
	return trim($o[1]);
}

function getCPU() {
	$o = shell_exec("cat /proc/loadavg");
	$o = explode(" ", $o);
	return $o[0]." ".$o[1]." ".$o[2];
}

function getKernel() {
	$o = shell_exec("uname -r");
	return $o;
}

function getMemInfo() {
	$o = shell_exec("cat /proc/meminfo");
	$o = explode("\n", $o);
	foreach($o as $i) {
		if(!empty($i)) {
			$i = explode(":", $i);
			$t = trim($i[1]);
			$t = explode(" ", $t);
			$t = ($t[0] * 1024);
			$memInfo[$i[0]] = $t;
		}
	}
	return $memInfo;
}

function getIP() {
	return $_SERVER["SERVER_ADDR"];
}

function getSpeed($r) {
	if($r == "rx") {
		$cmd = "sudo ifconfig eth0 | grep 'RX bytes' | cut -d: -f2 | awk '{ print $1 }'";
	 }else if($r == "tx") {
		$cmd = "sudo ifconfig eth0 | grep 'TX bytes' | cut -d: -f3 | awk '{ print $1 }'";
	}else{
		die("ERROR");
	}
	$o1 = shell_exec($cmd);
	sleep(1);
	$o2 = shell_exec($cmd);
	sleep(1);
	$o3 = shell_exec($cmd);
	sleep(1);
	$o4 = shell_exec($cmd);
	$o1 = $o2 - $o1;
	$o2 = $o3 - $o2;
	$o3 = $o4 - $o3;
	$o = (($o1 + $o2 + $o3) / 3);
	return getSize($o)."/s";
}

function getSize($size) {
	$round = 2;
	if ($size<=1024) $size = $size." Byte";
	else if ($size<=1024000) $size = round($size/1024,$round)." KB";
	else if ($size<=1048576000) $size = round($size/1048576,$round)." MB";
	else if ($size<=1073741824000) $size = round($size/1073741824,$round)." GB";
	$size = explode(" ", $size);
	$size = number_format($size[0], $round, '.', '')." ".$size[1];
	return $size;
}

?>