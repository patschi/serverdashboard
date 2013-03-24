$(document).ready(function() {
	InitLoad();
});

function InitLoad() {
	LoadingScreen();
	window.setTimeout("LoadData();", 1000);
}

function LoadingScreen() {
	var fields = new Array("latestData", "SW_Web", "SW_DB", "SW_MAIL", "SW_FTP", "HW_OS", "HW_KERNEL", "HW_CPU", "HW_RAM_SWAP", "NET_IP", "NET_DOWN", "NET_UP");
	var empty = new Array("HW_RAM_USED", "HW_RAM_AVAIL", "HW_RAM_PRNT", "HW_SWAP_USED", "HW_SWAP_AVAIL", "HW_SWAP_PRNT");
	$.each(empty, function(index, value) {
		$("#" + value).html('');
	});
	$.each(fields, function(index, value) {
		$("#" + value).html('<span class="loading"><img src="assets/img/ajax-loader.gif"> Loading...</span>');
	});
}

function LoadData() {
	$.ajax({
		url: 'assets/getStatus.php?q=all',
		dataType: 'json',
		async: true,
		success: function(data) {
			$.each(data, function(key, val) {
				if(key == "HW_RAM_USED") {
					val = val + " / ";
					$("#HW_RAM_SWAP").html('');
				 }else if(key == "HW_SWAP_USED") {
					val = val + " / ";
				 }else if(key == "HW_RAM_PRNT") {
					val = "(" + val + "%)";
				 }else if(key == "HW_SWAP_PRNT") {
					val = "(" + val + "%)";
				 }else if(key == "TIMESTAMP") {
					$("#latestData").html(UnixTS(val));
				}
				if(val.toString().substr(-2) == "R0") {
					val = val.replace('R0', '<span style="font-size:12px;">- <span style="color:red;" class="smallText">Not running</span> <img src="assets/img/error.png" class="statusImg"></span>');
				 }else if(val.toString().substr(-2) == "R1") {
					val = val.replace('R1', '<span style="font-size:12px;">- <span style="color:green;" class="smallText">Running</span> <img src="assets/img/okay.png" class="statusImg"></span>');
				}
				$("#" + key).html(val);
			});
		}
	});

	loadSingleData("NetSpeedUp",   "NET_UP");
	loadSingleData("NetSpeedDown", "NET_DOWN");
}

function loadSingleData(DaVal, val) {
	$.ajax({
		url: 'assets/getStatus.php?q=' + DaVal,
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
	if(date.toString().length  == 1) { date  = "0" + date;  }
	if(month.toString().length == 1) { month = "0" + month; }
	if(date.toString().length  == 1) { date  = "0" + date;  }
	if(hour.toString().length  == 1) { hour  = "0" + hour;  }
	if(min.toString().length   == 1) { min   = "0" + min;   }
	if(sec.toString().length   == 1) { sec   = "0" + sec;   }
	var time = date + '. ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}