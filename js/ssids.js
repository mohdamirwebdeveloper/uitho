/* This software is licensed under the MIT License: https://github.com/spacehuhntech/esp8266_deauther */

var ssidJson = { "random": false, "ssids": [] };
const lockico = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M13 14a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"/><path fill="#fff" fill-rule="evenodd" d="M7 8.12c-1.684.412-3 1.84-3 3.65v5.538C4 19.973 6.315 22 9 22h6c2.685 0 5-2.027 5-4.692v-5.539c0-1.81-1.316-3.237-3-3.649V7A5 5 0 0 0 7 7v1.12ZM15 7v1H9V7a2.995 2.995 0 0 1 3-3 3.001 3.001 0 0 1 3 3Zm-9 4.77c0-.904.819-1.77 2-1.77h8c1.181 0 2 .866 2 1.77v5.538C18 18.72 16.734 20 15 20H9c-1.734 0-3-1.28-3-2.692v-5.539Z" clip-rule="evenodd"/></svg>`
function load() {
	getFile("run?cmd=save ssids", function () {
		getFile("ssids.json", function (res) {
			ssidJson = JSON.parse(res);
			showMessage("connected");
			draw();
		});
	});
}

function draw() {
	var html;
	console.log(ssidJson)
	html = "<tr>"
		+ "<th class='id'></th>"
		+ "<th class='ssid'></th>"
		+ "<th class='lock'></th>"
		+ "<th class='save'></th>"
		+ "<th class='remove'></th>"
		+ "</tr>";



	for (var i = 0; i < ssidJson.ssids.length; i++) {
		const originalSsid = ssidJson.ssids[i][0];
		const ml = 20;
		let displayedSsid;
		if (originalSsid.length > ml) {
			displayedSsid = originalSsid.substring(0, ml) + "...";
		} else {
			displayedSsid = originalSsid;
		}
		const escapedDisplayedSsid = esc(displayedSsid);
		html += "<tr>"
			+ "<td class='id'>" + i + "</td>"
			+ "<td class='ssid tov' contenteditable='true' id='ssid_" + i + "'>" + escapedDisplayedSsid + "</td>" // SSID
			+ "<td class='lock clickable' onclick='changeEnc(" + i + ")' id='enc_" + i + "'>" + (ssidJson.ssids[i][1] ? lockico : "-") + "</td>" // Enc
			+ "<td class='save'><button class='cb butnstyle attackpbtn' onclick='save(" + i + ")'>" + "save" + "</button></td>" // Save
			+ "<td class='remove'><button class='attackpbtn butnstyle' onclick='remove(" + i + ")'>X</button></td>" // Remove
			+ "</tr>";
	}

	getE("randomBtn").innerHTML = ssidJson.random ? lang("disable_random") : lang("enable_random");

	getE("ssidTable").innerHTML = html;
}

const dssid = getE("dssid");

dssid.addEventListener("click", removeAll);


function remove(id) {
	ssidJson.ssids.splice(id, 1);
	getFile("run?cmd=remove ssid " + id);
	draw();
}

function add() {
	let ssidstr = getE("SSID_NAME")
	var ssidStr = ssidstr.value;
	var wpa2 = getE("SSID_PASSWORD").checked;
	var clones = getE("SSID_NUMBER").value;
	var force = getE("ow").checked;
	if (ssidStr.length > 0) {
		var cmdStr = "add ssid \"" + ssidStr + "\"" + (force ? " -f" : " ") + " -cl " + clones;
		if (wpa2) cmdStr += " -wpa2";

		getFile("run?cmd=" + cmdStr);

		for (var i = 0; i < clones; i++) {
			if (ssidJson.ssids.length >= 60) ssidJson.ssids.splice(0, 1);
			ssidJson.ssids.push([ssidStr, wpa2]);
		}

		draw();
	}
}

function enableRandom() {
	console.log("calleed")
	if (ssidJson.random) {
		getFile("run?cmd=disable random", function () {
			load();
		});
	} else {
		getFile("run?cmd=enable random " + getE("interval").value, function () {
			load();
		});
	}

}

function disableRandom() {

}

function addSelected() {
	getFile("run?cmd=add ssid -s" + (getE("ow").checked ? " -f" : ""));
}

function changeEnc(id) {
	ssidJson.ssids[id][1] = !ssidJson.ssids[id][1];
	draw();
	save(id);
}

function removeAll() {
	ssidJson.ssids = [];
	getFile("run?cmd=remove ssids");
	draw();
}

function save(id) {
	var name = getE("ssid_" + id).innerHTML.replace("<br>", "").substring(0, 32);

	var wpa2 = ssidJson.ssids[id][1];
	ssidJson.ssids[id] = [name, wpa2];
	console.log(name, wpa2)
	getFile("run?cmd=replace ssid " + id + " -n \"" + name + "\" " + (wpa2 ? "-wpa2" : ""));
}

