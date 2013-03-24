$(document).ready(function() {
	InitLoad();
});

function InitLoad() {
	LoadingScreen();
	window.setTimeout("LoadData();", 1000);
}

function LoadingScreen() {
	var fields = new Array("latestData", "SW_Web", "SW_DB", "SW_MAIL", "SW_FTP", "HW_OS", "HW_KERNEL", "HW_CPU", "HW_RAM_SWAP", "NET_IP", "NET_DOWN", "NET_UP");
	var empty = new Array("HW_RAM_USED", "HW_RAM_AVAIL", "HW_SWAP_USED", "HW_SWAP_AVAIL");
	$.each(empty, function(index, value) {
		$("#" + value).html('');
	});
	$.each(fields, function(index, value) {
		$("#" + value).html('<span class="loading"><img src="assets/img/ajax-loader.gif"> Loading...</span>');
	});
}

function LoadData() {
	$.ajax({
		url: 'assets/getStatus.php?all',
		dataType: 'json',
		async: true,
		success: function(data) {
			$.each(data, function(key, val) {
				if(key == "HW_RAM_USED") {
					val = val + " / ";
					$("#HW_RAM_SWAP").html('');
				 }else if(key == "HW_SWAP_USED") {
					val = val + " / ";
				 }else if(key == "TIMESTAMP") {
					$("#latestData").html(UnixTS(val));
				}
				if(val == "R0") {
					val = '<font color="red">Not running</font>';
				 }else if(val == "R1") {
					val = '<font color="green">Running</font>';
				}
				$("#" + key).html(val);
			});
		}
	});

	loadSingleData("NetSpeedUp", "NET_UP");
	loadSingleData("NetSpeedDown", "NET_DOWN");
}

function loadSingleData(url, val) {
	$.ajax({
		url: 'assets/getStatus.php?' + url,
		dataType: 'json',
		async: true,
		success: function(data) {
			$("#" + val).html(data.value);
		}
	});
}

function UnixTS(uts){
	var a = new Date(uts * 1000);
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + '. ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
 }