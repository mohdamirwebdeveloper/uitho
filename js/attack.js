/* This software is licensed under the MIT License: https://github.com/spacehuhntech/esp8266_deauther */

var attackJSON = [[false, 0, 0], [false, 0, 0], [false, 0, 0]];

function draw() {
	getE("deauth").innerText = attackJSON[0][0] ? lang("stop") : lang("start");
	getE("beacon").innerText = attackJSON[1][0] ? lang("stop") : lang("start");
	getE("probe").innerText = attackJSON[2][0] ? lang("stop") : lang("start");

	getE("dtar").innerHTML = esc(attackJSON[0][1] + "");
	getE("btar").innerHTML = esc(attackJSON[1][1] + "");
	getE("ptar").innerHTML = esc(attackJSON[2][1] + "");

	getE("dpkt").innerHTML = esc(attackJSON[0][2] + "/" + attackJSON[0][3]);
	getE("bpkt").innerHTML = esc(attackJSON[1][2] + "/" + attackJSON[1][3]);
	getE("ppkt").innerHTML = esc(attackJSON[2][2] + "/" + attackJSON[2][3]);
}

function stopAll() {
	getFile("run?cmd=stop attack", function () {
		load();
	});
}

function start(mode) {
	switch (mode) {
		case 0:
			attackJSON[0][0] = !attackJSON[0][0];
			break;
		case 1:
			attackJSON[1][0] = !attackJSON[1][0];
			break;
		case 2:
			attackJSON[2][0] = !attackJSON[2][0];
			break;
	}
	getFile("run?cmd=attack" + (attackJSON[0][0] ? " -d" : "") + (attackJSON[1][0] ? " -b" : "") + (attackJSON[2][0] ? " -p" : ""), function () {
		setTimeout(load, 2000);
		draw();
	});
}

function load() {
	getFile("attack.json", function (response) {
		attackJSON = JSON.parse(response);
		console.log(response);
		showMessage("connected");
		draw();
	});
}