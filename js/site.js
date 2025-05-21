/* This software is licensed under the MIT License: https://github.com/spacehuhntech/esp8266_deauther */

var langJson = {};

const lockico = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M13 14a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"/><path fill="#fff" fill-rule="evenodd" d="M7 8.12c-1.684.412-3 1.84-3 3.65v5.538C4 19.973 6.315 22 9 22h6c2.685 0 5-2.027 5-4.692v-5.539c0-1.81-1.316-3.237-3-3.649V7A5 5 0 0 0 7 7v1.12ZM15 7v1H9V7a2.995 2.995 0 0 1 3-3 3.001 3.001 0 0 1 3 3Zm-9 4.77c0-.904.819-1.77 2-1.77h8c1.181 0 2 .866 2 1.77v5.538C18 18.72 16.734 20 15 20H9c-1.734 0-3-1.28-3-2.692v-5.539Z" clip-rule="evenodd"/></svg>`
const sico = `<svg xmlns="http://www.w3.org/2000/svg"class="cp" viewBox="0 0 72 72" width="24" height="24" fill="#fff"><path d="M57.531 30.556A3 3 0 0 1 60 33.509v4.983a3 3 0 0 1-2.469 2.953l-2.974.535a19.41 19.41 0 0 1-1.214 2.907l1.73 2.49a3 3 0 0 1-.342 3.834l-3.523 3.523a3 3 0 0 1-3.834.342l-2.49-1.731c-.93.477-1.898.889-2.906 1.214l-.535 2.974A3 3 0 0 1 38.491 60h-4.983a3 3 0 0 1-2.953-2.469l-.535-2.974c-1.009-.325-1.977-.736-2.906-1.214l-2.49 1.731a3 3 0 0 1-3.834-.342l-3.523-3.523a3 3 0 0 1-.342-3.834l1.73-2.49a19.41 19.41 0 0 1-1.214-2.907l-2.974-.535A3 3 0 0 1 12 38.491v-4.983a3 3 0 0 1 2.469-2.953l2.974-.535a19.41 19.41 0 0 1 1.214-2.907l-1.73-2.49a3 3 0 0 1 .342-3.834l3.523-3.523a3 3 0 0 1 3.834-.342l2.49 1.731c.93-.477 1.898-.889 2.906-1.214l.535-2.974A3 3 0 0 1 33.509 12h4.983a3 3 0 0 1 2.953 2.469l.535 2.974c1.009.325 1.977.736 2.906 1.214l2.49-1.731a3 3 0 0 1 3.834.342l3.523 3.523a3 3 0 0 1 .342 3.834l-1.73 2.49a19.41 19.41 0 0 1 1.214 2.907l2.972.534zM36 45a9 9 0 1 0 0-18 9 9 0 1 0 0 18z"/></svg>`
const logo = `<svg xmlns="http://www.w3.org/2000/svg" class="cp m5" width="126" height="30" fill="none" xmlns:v="https://vecta.io/nano"><style><![CDATA[.B{stroke:#f33d3d}.C{stroke-width:2.149}.D{stroke-width:1.653}.E{stroke-width:2.314}.F{stroke-width:1.983}.G{stroke-width:1.488}]]></style><g stroke="#fff"><g class="E"><path d="M1.165 23.471V0"/><path d="M1 13.057h9.587m.826 10.413v-9.256m4.744-.661v9.917m-.04-10.478V12"/></g><path d="M72.056 13.71v9.917m0-10.578v-.992m-33.718 4.629v-1.653m-4.959 8.264v-1.653" class="F"/><path d="M36.355 22.471h1.653" class="D"/><g class="E"><path d="M21.81 21.917v-1.653m3.802 1.653v-1.653m-1.984 3.306v-1.653m3.967-1.653V12"/><path transform="matrix(0 -1 -1 0 19 20.2642)" d="M0-1.157h8.264"/></g><g class="F"><path d="M53.214 23.462V21.81m1.983 1.652V21.81m.992 1.652V21.81"/><path transform="matrix(0 -1 -1 0 50.2385 21.8096)" d="M0-.992h10.413"/><path transform="matrix(0 -1 -1 0 57.1804 21.8096)" d="M0-.992h10.413"/><path d="M43.462 13.71v-2.149m1.983 2.149v-2.149m1.984 3.802v-2.149m-3.967 5.124v-1.653m1.983 1.653v-1.653m-3.967-3.14v9.752m-3.14-8.264V13.38m-2.975 9.917v-1.653m-2.975-9.256h4.958m-4.958 5.289h4.958m-5.95-4.297v8.264"/></g><path d="M66.437 12.471h-4.463m4.463 5.124h-4.463m4.463 5.124h-4.463" stroke-width="1.818"/><g class="D"><path d="M66.437 14.206h1.653m-7.769 6.777h1.653"/><path d="M60.321 14.206h1.653m4.463 5.124h1.653m-7.769-3.471h1.653m4.463 5.124h1.653m9.586-7.933h4.959"/></g></g><path d="M108.774 11.29h4.9m-4.9 6.44h5.46" class="B C"/><g stroke="#fff" class="D"><path transform="matrix(0 -1 -1 0 82.6343 21.9746)" d="M0-.826h8.099"/><path transform="matrix(0 -1 -1 0 76.0232 21.9746)" d="M0-.826h8.099"/></g><g class="B C"><path transform="matrix(0 -1 -1 0 107.374 24.4043)" d="M0-1.074h12.04"/><path transform="matrix(0 -1 -1 0 117.675 24.4282)" d="M0-1.074h12.04"/><path transform="matrix(0 -1 -1 0 113.674 24.4043)" d="M0-1.074h12.04"/></g><g stroke="#fff" class="D"><path d="M77.676 22.801h4.959m3.966-.826V13.71m4.959 8.265v-4.959m-5.785-3.966h1.653m-1.653 9.751h1.653m3.305 0h1.653m-4.958-8.264h1.653m0 0h1.653"/><path d="M90.733 16.19h1.653"/></g><path d="M103.734 23.33h1.4m14.194-11.851h1.4" class="B C"/><g class="G"><path stroke="#c53434" d="M122.073 17.501h1.4"/><path d="M122.073 17.501h1.4m-2.799 0h1.4" class="B"/></g><path d="M120.65 11.479h1.4" class="B C"/><path d="M119.274 17.501h1.4" class="B G"/><path d="M119.274 23.47h1.818m.88-11.991h1.488m-2.786 11.991h1.4m-.001 0h1.4" class="C B"/><g class="D"><path d="M123.46 13.38h1.983m-1.983 6.611h1.983m-1.969-5.373h1.983" class="B"/><path d="M123.46 19h1.983m-1.969-2.982h1.983" class="B"/><path stroke="#c53434" d="M123.474 21.618h1.983"/><path d="M123.46 21.644h1.983" class="B"/></g><path d="M98.089 10.405v12.6m.325.325h5.32" class="C B"/></svg>`
const sicoe = getE("sico");
const logoe = getE("logoe");
logoe.innerHTML = logo;
sicoe.innerHTML = sico;
sicoe.addEventListener("click", ()=>{window.location.href = "./settings.html"})

function getE(name) {
	return document.getElementById(name);
}

function esc(str) {
	if (str) {
		return str.toString()
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\"/g, '&quot;')
			.replace(/\'/g, '&#39;')
			.replace(/\//g, '&#x2F;');
	}
	return "";
}

function convertLineBreaks(str) {
	if (str) {
		str = str.toString();
		str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
		return str;
	}
	return "";
}

function showMessage(msg) {
	if (msg.startsWith("ERROR")) {
		getE("indicator").classList.remove('cc', 'cd')
		getE("indicator").classList.add('ca', 'blink')
		console.error("disconnected (" + msg + ")")
	}

	else if (msg.startsWith("LOADING")) {
		getE("indicator").classList.remove('cd', 'ca', 'blink');
		getE("indicator").classList.add('cc');
	} 

	else {
		getE("indicator").classList.remove('ca', 'cc','blink');
		getE("indicator").classList.add('cd');
		console.log("" + msg + "");
	}
}

function getFile(adr, callback, timeout, method, onTimeout, onError) {
	/* fallback stuff */
	if (adr === undefined) return;
	if (callback === undefined) callback = function () { };
	if (timeout === undefined) timeout = 8000;
	if (method === undefined) method = "GET";
	if (onTimeout === undefined) {
		onTimeout = function () {
			showMessage("ERROR: timeout loading file " + adr);
		};
	}
	if (onError === undefined) {
		onError = function () {
			showMessage("ERROR: loading file: " + adr);
		};
	}

	/* create request */
	var request = new XMLHttpRequest();
	console.log("TEST" + " ", adr)
	/* set parameter for request */
	request.open(method, encodeURI(adr), true);
	request.timeout = timeout;
	request.ontimeout = onTimeout;
	request.onerror = onError;
	request.overrideMimeType("application/json");

	request.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				showMessage("CONNECTED");
				callback(this.responseText);
			}
		}
	};

	showMessage("LOADING");

	/* send request */
	request.send();

	console.log(adr);
}

function lang(key) {
	return convertLineBreaks(esc(langJson[key]));
}

function parseLang(fileStr) {
	langJson = JSON.parse(fileStr);
	if (langJson["lang"] != "en") {// no need to update the HTML	
		var elements = document.querySelectorAll("[data-translate]");
		for (i = 0; i < elements.length; i++) {
			var element = elements[i];
			element.innerHTML = lang(element.getAttribute("data-translate"));
		}
	}
	document.querySelector('html').setAttribute("lang", langJson["lang"]);
	if (typeof load !== 'undefined') load();
}

function loadLang() {
	var language = "default"; //navigator.language.slice(0, 2);
	getFile("lang/" + language + ".lang",
		parseLang,
		2000,
		"GET",
		function () {
			getFile("lang/en.lang", parseLang);
		}, function () {
			getFile("lang/en.lang", parseLang);
		}
	);
}

window.addEventListener('load', function () {
	getE("indicator").classList.add('cd');
});