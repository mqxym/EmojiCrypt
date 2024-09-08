function hexToBase64(str) {
	return btoa(String.fromCharCode.apply(null,
	  str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
	);
}

function base64ToBytes(base64String) {
    const binaryString = base64.decode(base64String);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }
    return byteArray;
}


function bytesToBase64(bytes) {
    // Convert the bytes to a string of characters
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    
    // Convert the binary string to a Base64 string
    return window.btoa(binary);
}

function mapSymbolsToBytes(symbolArray, uniqueSymbols) {
    const base = uniqueSymbols.length;
    let bigIntValue = BigInt(0); // Big integer to accumulate the result

    // Convert symbol array to a large integer in the given base
    for (let symbol of symbolArray) {
        const symbolIndex = uniqueSymbols.indexOf(symbol);
        if (symbolIndex === -1) {
            throw new Error(`Symbol ${symbol} not found in uniqueSymbols array.`);
        }
        bigIntValue = bigIntValue * BigInt(base) + BigInt(symbolIndex);
    }

    // Convert the large integer to bytes (base 256)
    const byteArray = [];
    while (bigIntValue > 0n) {
        byteArray.unshift(Number(bigIntValue % 256n)); // Extract the least significant byte
        bigIntValue = bigIntValue / 256n; // Shift right by 8 bits (base 256)
    }

    return byteArray;
}

function mapBytesToSymbols(byteArray, uniqueSymbols) {
    const base = uniqueSymbols.length; 
    let bigIntValue = BigInt(0);

    // Convert byte array (base 256) to a large integer
    for (let byte of byteArray) {
        bigIntValue = (bigIntValue * 256n) + BigInt(byte);
    }

    // Convert the large integer to the desired base (e.g., base 3500)
    const symbols = [];
    while (bigIntValue > 0n) {
        const symbolIndex = Number(bigIntValue % BigInt(base));
        symbols.unshift(uniqueSymbols[symbolIndex]);
        bigIntValue = bigIntValue / BigInt(base);
    }

    return symbols;
}


// Super simple XOR encrypt function
function XORencrypt(key, plaintext) {
	let cyphertext = [];
	// Convert to hex to properly handle UTF8
	plaintext = Array.from(plaintext).map(function(c) {
		if(c.charCodeAt(0) < 128) return c.charCodeAt(0).toString(16).padStart(2, '0');
		else return encodeURIComponent(c).replace(/\%/g,'').toLowerCase();
	}).join('');
	// Convert each hex to decimal
	plaintext = plaintext.match(/.{1,2}/g).map(x => parseInt(x, 16));
	// Perform xor operation
	for (let i = 0; i < plaintext.length; i++) {
		cyphertext.push(plaintext[i] ^ key.charCodeAt(Math.floor(i % key.length)));
	}
	// Convert to hex
	cyphertext = cyphertext.map(function(x) {
		return x.toString(16).padStart(2, '0');
	});
	return cyphertext.join('');
}

// Super simple XOR decrypt function
function XORdecrypt(key, cyphertext) {
	try {
		cyphertext = cyphertext.match(/.{1,2}/g).map(x => parseInt(x, 16));
		let plaintext = [];
		for (let i = 0; i < cyphertext.length; i++) {
			plaintext.push((cyphertext[i] ^ key.charCodeAt(Math.floor(i % key.length))).toString(16).padStart(2, '0'));
		}
		return decodeURIComponent('%' + plaintext.join('').match(/.{1,2}/g).join('%'));
	}
	catch(e) {
		return false;
	}
}

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (128 - 6 + 1)) + 6;
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }