function isDebug() {
	return false;
}

function getSecLevel() {
	return 1024;
}

function getPassword(pass, secLevel) {

	let seed = CryptoJS.SHA512(pass).toString() + CryptoJS.SHA224(pass).toString() + CryptoJS.SHA256(pass).toString() + CryptoJS.SHA1(pass).toString() + CryptoJS.SHA3(pass).toString() + CryptoJS.SHA384(pass).toString() + CryptoJS.MD5(pass).toString();
	let hashPass = returnHash(seed);
	for (let i = 0; i < secLevel; i++) {
		hashPass = returnHash(hashPass)
	}

	return CryptoJS.SHA512(hashPass).toString() + CryptoJS.SHA224(hashPass).toString() + CryptoJS.SHA256(hashPass).toString() + CryptoJS.SHA1(hashPass).toString() + CryptoJS.SHA3(hashPass).toString() + CryptoJS.SHA384(hashPass).toString() + CryptoJS.MD5(hashPass).toString();
}

function returnHash(seed) {

	let key = seed;

	//console.log(key);

	for (let i = 0; i < seed.length; i++) {
		let currentChar = seed.charAt(i).toLowerCase();
		switch (currentChar) {
			case "0":
				key = CryptoJS.MD5(key).toString();
				break;
			case "1":
				key = CryptoJS.MD5(key).toString();
				break;
			case "2":
				key = CryptoJS.SHA1(key).toString();
				break;
			case "3":
				key = CryptoJS.SHA1(key).toString();
				break;
			case "4":
				key = CryptoJS.SHA3(key).toString();
				break;
			case "5":
				key = CryptoJS.SHA3(key).toString();
				break;
			case "6":
				key = CryptoJS.SHA224(key).toString();
				break;
			case "7":
				key = CryptoJS.SHA224(key).toString();
				break;
			case "8":
				key = CryptoJS.SHA256(key).toString();
				break;
			case "9":
				key = CryptoJS.SHA256(key).toString();
				break;
			case "a":
				key = CryptoJS.SHA256(key).toString();
				break;
			case "b":
				key = CryptoJS.SHA512(key).toString();
				break;
			case "c":
				key = CryptoJS.SHA512(key).toString();
				break;
			case "d":
				key = CryptoJS.SHA512(key).toString();
				break;
			case "e":
				key = CryptoJS.SHA384(key).toString();
				break;
			case "f":
				key = CryptoJS.SHA384(key).toString();
				break;
		}
	}

	return key;
}

function base64ToHex(str) {
	const raw = atob(str);
	let result = '';
	for (let i = 0; i < raw.length; i++) {
		const hex = raw.charCodeAt(i).toString(16);
		result += (hex.length === 2 ? hex : '0' + hex);
	}
	return result.toUpperCase();
}

function hexToBase64(str) {
	return btoa(String.fromCharCode.apply(null,
		str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

function generateRandomEmo(emo_array) {
	let length = (2 + (Math.floor(Math.random() * 4))) * 32;

	let emo_string = "";
	let i = 0;

	while (i < length) {
		let random = Math.floor(Math.random() * 1024);
		emo_string = emo_string + emo_array[random];
		++i;
	}

	return emo_string;
}

function hexToEmo(hex, emo_array) {
	let i = 0;
	let count_four = 0;
	let double_hex = "";
	let emo_string = "";


	while (i < hex.length) {
		if (i % 2 == 0) {
			double_hex = hex[i];
			if (i == hex.length - 1) {
				console.log("Fehler");
			}
		} else {

			double_hex = double_hex + hex[i];
			emo_match = emo_array[parseInt("0x" + double_hex) + (256 * count_four)];
			emo_string = emo_string + emo_match;

			count_four++;
			if (count_four > 3) {
				count_four = 0;
			}

		}

		++i;
	}

	return emo_string;
}

function emoToHex(emo_string, emo_array) {
	emo_string_array = stringToArray(emo_string);
	let i = 0;
	let count_four = 0;
	let index = 0;
	hex_string = "";

	while (i < emo_string_array.length) {
		index = emo_array.indexOf(emo_string_array[i]);
		index = index - 256 * count_four;
		if (index < 16) {
			hex_string = hex_string + "0";
		}
		hex_string = hex_string + index.toString(16);


		count_four++;
		if (count_four > 3) {
			count_four = 0;
		}
		++i;
	}

	return hex_string.toUpperCase();
}

function stringToArray(s) {
	const retVal = [];

	for (const ch of s) {
		retVal.push(ch);
	}

	return retVal;
}

function removeItemAll(arr, value) {
	let i = 0;
	while (i < arr.length) {
		if (arr[i] === value) {
			arr.splice(i, 1);
		} else {
			++i;
		}
	}
	return arr;
}

function cleanArray(array) {

	array = removeItemAll(array, "️");
	array = removeItemAll(array, " ");
	array = removeItemAll(array, "‍");
	array = removeItemAll(array, "​");
	return array;
}