function getVersion () {
	return "0.6.1";
}

function isDebug () {
	return true;
}

function getSecLevel(pass) {

	seed = CryptoJS.MD5(pass).toString();
	sum = 0;

	//console.log(parseInt(seed,16));
	//maybe use parseInt(hex)

	for (let i = 0; i < seed.length; i++) {
		let currentChar = seed.charAt(i).toLowerCase();
		switch (currentChar) {
			case "0":
			case "1":
			case "2":
			case "3":
				sum += 4;
				break;
			case "4":
			case "5":
			case "6":
			case "7":
				sum += 3;
				break;
			case "9":
			case "a":
			case "b":
			case "c":
				sum += 5;
				break;
			case "d":
			case "e":
			case "f":
				sum += 2;
				break;
		}

	}

	return 1024+sum;
}

function getPassword(pass) {
	
	let seed = CryptoJS.SHA512(pass).toString() + CryptoJS.SHA224(pass).toString() + CryptoJS.SHA256(pass).toString() + CryptoJS.SHA1(pass).toString() + CryptoJS.SHA3(pass).toString() + CryptoJS.SHA384(pass).toString() + CryptoJS.MD5(pass).toString();
	let hashPass = returnHash(seed);
	let secLevel = getSecLevel(pass);

	for (let i = 0; i < secLevel; i++) {
		hashPass = returnHash(hashPass)
	}

	hashPass = CryptoJS.SHA512(hashPass).toString();
	console.log("Hashed Password:\n" + hashPass);

	return hashPass;
}

function returnHash(seed) {

	let key = seed;

	//console.log(key);

	for (let i = 0; i < seed.length; i++) {
		let currentChar = seed.charAt(i).toLowerCase();
		switch (currentChar) {
			case "0":
			case "1":
				key = CryptoJS.MD5(key).toString();
				break;
			case "2":
			case "3":
				key = CryptoJS.SHA1(key).toString();
				break;
			case "4":
			case "5":
			case "6":
				key = CryptoJS.SHA3(key).toString();
				break;
			case "7":
			case "9":
				key = CryptoJS.SHA256(key).toString();
				break;
			case "a":
			case "b":
			case "c":
				key = CryptoJS.SHA512(key).toString();
				break;
			case "d":
			case "e":
			case "f":
				key = CryptoJS.SHA384(key).toString();
				break;
		}
	}

	return key;
}

function em_encrypt(message, key) {
	let testHex;
	let encryptedHex;
	let emojiString;

	console.log("Start Blowfish Encryption...");
	BlowfishString = CryptoJS.Blowfish.encrypt(message, key).toString();
	console.log("Start AES Encryption...");
	AESString = CryptoJS.AES.encrypt(BlowfishString, key).toString();
	encryptedHex = base64ToHex(AESString);
	console.log(encryptedHex);
	emojiString = hexToEmo(encryptedHex, emoArray);
	//console.log(emojiString);
	//console.log("Checking if encrypted String is emoji compatible...");

	return emojiString.slice(16);

}

function em_decrypt(message, key) {

	let hexString = emoToHex("🥳🍿📠🚼😸🥛💾📳" + message, emoArray);
	let baseString = hexToBase64(hexString);
	console.log("Start Blowfish Deryption...")
	let BlowfishDecryptedString = CryptoJS.Blowfish.decrypt(baseString, key).toString(CryptoJS.enc.Utf8);
	console.log("Start AES Deryption...")
	let decrypted = CryptoJS.AES.decrypt(BlowfishDecryptedString, key).toString(CryptoJS.enc.Utf8);

	return decrypted;
}

function generateRandomEmo() {
	let length = (2 + (Math.floor(Math.random() * 4))) * 32;

	let emoString = "";
	let i = 0;

	emoArray = getEmoArray();

	while (i < length) {
		let random = Math.floor(Math.random() * 1024);
		emoString = emoString + emoArray[random];
		++i;
	}

	return emoString;
}

function hexToEmo(hex) {
	let i = 0;
	let count_four = 0;
	let double_hex = "";
	let emoString = "";

	emoArray = getEmoArray();

	console.log(hex.length);


	while (i < hex.length) {
		if (i % 2 == 0) {
			double_hex = hex[i];
			if (i == hex.length - 1) {
				console.log("Fehler");
			}
		} else {

			double_hex = double_hex + hex[i];
			emo_match = emoArray[parseInt("0x" + double_hex) + (256 * count_four)];
			emoString = emoString + emo_match;

			count_four++;
			if (count_four > 3) {
				count_four = 0;
			}

		}

		++i;
	}

	return emoString;
}

function emoToHex(emoString) {
	emoString_array = stringToArray(emoString);
	let i = 0;
	let count_four = 0;
	let index = 0;
	hex_string = "";

	emoArray = getEmoArray();

	while (i < emoString_array.length) {
		index = emoArray.indexOf(emoString_array[i]);
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

function getEmoArray(array) {
	let emo ="😃😄😁😆😅😂🤣☺️😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹️😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤮🤧😷🤒🤕🤨🤩🤯🧐🤫🤪🤭🥱🥳🥴🥶🥵😈👿🤬👹👺💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽😿😾🙀🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐽🐸🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🦆🦅🦉🦇🐺🐗🐴🦄🐝🐛🦋🐌🐚🐞🐜🕷🕸🐢🐍🦎🦂🦀🦑🐙🦐🐠🐟🐡🐬🦈🐳🐋🐊🐆🐅🐃🐂🐄🦌🐪🐫🐘🦏🦍🐎🐖🐐🐏🐑🐕🐩🐈🐓🦃🕊🐇🐁🐀🐿🐾🐉🐲🦖🦕🦒🦔🦓🦗🦧🦮🦥🦦🦨🦩🌵🎄🌲🌳🌴🌱🌿☘️🍀🎍🎋🍃🍂🍁🍄🌾💐🌷🌹🥀🌻🌼🌸🌺🌎🌍🌏🌕🌖🌗🌘🌑🌒🌓🌔🌚🌝🌞🌛🌜🌙💫⭐️🌟✨⚡️🔥💥☄️🛸☀️🌤⛅️🌥🌦🌈☁️🌧⛈🌩🌨☃️⛄️❄️🌬💨🌪🌫🌊💧💦☔️🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🥝🥑🍅🍆🥒🥕🌽🌶🥔🍠🌰🥜🍯🥐🍞🥖🧀🥚🍳🥓🧄🧅🥞🧇🍤🍗🍖🍕🌭🍔🍟🥙🌮🌯🥗🥘🍝🍜🦪🍲🍥🍣🍱🍛🍚🧆🍙🍘🍢🍡🍧🍨🍦🍰🎂🍮🍭🍬🍫🍿🍩🍪🥛🧈🍼☕️🍵🍶🍺🍻🥂🍷🥃🍸🍹🍾🧉🧃🧊🥄🍴🍽⚽️🏀🏈⚾️🎾🏐🏉🎱🏓🏸🥅🏒🏑🏏⛳️🏹🎣🥊🥋⛸🎿⛷🏂🏋️‍♀️🏋️🤺🤼‍♀️🤼‍♂️🤸‍♀️🤸‍♂️⛹️‍♀️⛹️🤾‍♀️🤾‍♂️🏌️‍♀️🏌️🏄‍♀️🏄🏊‍♀️🏊🤽‍♀️🤽‍♂️🚣‍♀️🚣🤿🏇🚴‍♀️🚴🚵‍♀️🚵🎖🥇🥈🥉🏆🏵🎗🎫🎟🎪🤹‍♀️🤹‍♂️🎭🎨🎬🎤🎧🎼🎹🥁🎷🎺🎸🎻🪕🎲🎯🎳🪀🪁🎮🎰🚗🚕🚙🚌🚎🏎🚓🚑🚒🚐🚚🚛🚜🛴🚲🛵🏍🛺🚨🚔🚍🚘🚖🚡🚠🚟🚃🚋🚞🚝🚄🚅🚈🚂🚆🚇🚊🚉🚁🛩✈️🛫🛬🪂💺🛶⛵  🛳⛴🚢⚓️🚧⛽️🚏🚦🚥🗺🗿🗽⛲️🗼🏰🏯🏟🎡🎢🎠⛱🏖🏝⛰🏔🗻🌋🏜🏕⛺️🛤🛣🏗🏭🏠🏡🏘🏚🏢🏬🏣🏤🏥🏦🏨🏪🏫🏩💒🏛⛪️🕌🕍🛕🕋⛩🗾🎑🏞🌅🌄🌠🎇🎆🌇🌆🏙🌃🌌🪐🌉🌁⌚️📱📲💻⌨🖥🖨🖱🖲🕹🗜💽💾💿📀📼📷📸📹🎥📽🎞📞☎📟📠📺📻🎙🎚🎛⏱⏲⏰🕰⌛️⏳📡🔋🔌💡🔦🕯🗑🛢💸💵💴💶💷💰💳💎🧿⚖️🔧🔨⚒🛠⛏🪓🔩⚙️⛓🔫🪁💣🪒🔪🗡⚔️🛡🚬⚰️⚱️🏺🪔🔮📿💈⚗️🔭🔬🕳🦯🩺💊💉🩸🩹🦠🧫🧬🌡🚽🚰🚿🛁🛀🛎🔑🗝🚪🛋🛏🛌🪑🖼🛍🛒🎁🎈🎏🎀🎊🎉🎎🏮🎐✉️📩📨📧💌📥📤📦🏷📪📫📬📭📮📯📜📃📄📑📊📈📉🗒🗓📆📅📇🗃🗳🗄📋📁📂🗂🗞📰📓📔📒📕📗📘📙📚📖🔖🔗📎🖇📐📏📌📍🎌🏳️🏴🏁🏳️‍🌈✂️🖊🖋✒️🖌🖍📝✏️🔍🔎🔏🔐🔒🔓💄👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂️💛💚💙💜🖤🤎🤍🧡💔❣️💕💞💓💗💖💘💝💟☮️✝️☪️🕉☸️✡️🔯🕎☯️☦️🛐⛎♈️♉️♊️♋️♌️♍️♎️♏️♐️♑️♒️♓️🆔⚛️🈳🉑☢️☣️📴📳🈶🈚️🈸🈺🈷️✴️🆚🉐㊙️㊗️🈴🈵🈹🈲🅰️🅱️🆎🆑🅾️🆘🚼❌⭕️🛑⛔️📛🚫💯💮💢♨️🚷🚯🚳🚱🔞📵🚭❗️❕❓❔‼️⁉️🔅🔆〽️⚠️🚸🔱⚜️🔰♻️✅🈯️💹❇️✳️❎🌐💠Ⓜ️🌀💤🏧🚾♿️🅿️🈂️🛂🛃🛄🛅🚹🚺🚻🚮➿🎦📶🈁🔣ℹ️🔤🔡🔠🆖🆙🆒🆕🆓▶️⏸⏯⏹⏺⏭⏮⏩⏪⏫⏬◀️🔼🔽➡️⬅️⬆️⬇️↗️↘️↙️↖️↪️↩️⤴️⤵️🔀🔁🔂🔄🔃🔚🔙🔛🔝🔜☑️↕️↔️🎵🎶➕➖➗✖️💲💱™️©️®️〰️➰✔️🔘⚫️⚪️🔴🔵🟣​🟠🟢🟣🔺🔻🔸🔹🔶🔷🔳🔲▪️▫️◾️◽️◼️◻️⬛️⬜️🟧🟩🟦🔈🔇🔉🔊🔔🔕📣📢👁‍🗨💬💭🗯♠️♣️♥️♦️🃏🎴🀄️🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕡🕢🕣🕤🕥🕦🕧"
	emo = removeItemAll(emo, "️");
	emo = removeItemAll(emo, " ");
	emo = removeItemAll(emo, "‍");
	emo = removeItemAll(emo, "​");
	return emo;
}