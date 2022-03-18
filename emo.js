 	function getPassword(pass) {
		 console.log("MD5:" + CryptoJS.MD5(pass));

		 return pass;
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
		str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
	  );
	}	
	
	function generateRandomEmo(length, emo_array) {
		var i = 0;
		var emo_string = "";

		while (i < length) {
			var random = Math.floor(Math.random() * 1024);
			emo_string = emo_string + emo_array[random];
			++i;
		}

		return emo_string;
	}

	function hexToEmo (hex, emo_array) {
		var i = 0;
		var count_four = 0;
		var double_hex = "";
		var emo_string = ""; 


		while (i < hex.length) {
			if (i % 2 == 0) {
				double_hex = hex[i];
				if (i == hex.length-1) {
					console.log("Fehler");
				}
			} else {
				
				double_hex = double_hex + hex[i];
				emo_match = emo_array[parseInt("0x"+double_hex)+(256*count_four)];
				emo_string = emo_string + emo_match;
				
				count_four++;
				if(count_four > 3){
					count_four = 0;
				}

			}

			++i;
		}

		return emo_string;
	}

	function emoToHex(emo_string, emo_array) {
		emo_string_array = stringToArray(emo_string);
		var i = 0;
		var count_four = 0;
		var index = 0;
		hex_string = "";

		while (i < emo_string_array.length) {
			index = emo_array.indexOf(emo_string_array[i]);
			index = index - 256*count_four;
			if (index < 16) {
				hex_string = hex_string + "0";
			}
			hex_string = hex_string + index.toString(16);

			
			count_four++;
			if(count_four > 3){
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
	  var i = 0;
	  while (i < arr.length) {
	    if (arr[i] === value) {
	      arr.splice(i, 1);
	    } else {
	      ++i;
	    }
	  }
	  return arr;
	}