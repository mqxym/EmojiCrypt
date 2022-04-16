function base64ToHex(str) {
	let raw = atob(str);
	let result = "";

	for (let i = 0; i < raw.length; i++) {
		let hex = raw.charCodeAt(i).toString(16);
		result += (hex.length === 2 ? hex : '0' + hex);
	}
	return result.toUpperCase();
}
  
function hexToBase64(str) {
	return btoa(String.fromCharCode.apply(null,
	  str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
	);
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }

  function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
  }

function stringToArray(s) {
	const retVal = [];

	for (const ch of s) {
		retVal.push(ch);
	}

	return retVal;
}