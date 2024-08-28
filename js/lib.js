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
    const symbolArrayLength = uniqueSymbols.length;

    // Determine how many bits per symbol we used
    const bitsPerSymbol = Math.floor(Math.log2(symbolArrayLength));
    const maxValuePerSymbol = Math.pow(2, bitsPerSymbol) - 1;

    let buffer = 0;
    let bufferLength = 0;
    const byteArray = [];

    for (let symbol of symbolArray) {
        const symbolIndex = uniqueSymbols.indexOf(symbol);
        if (symbolIndex === -1) {
            throw new Error(`Symbol ${symbol} not found in uniqueSymbols array.`);
        }

        // Add the symbol index to the buffer
        buffer = (buffer << bitsPerSymbol) | symbolIndex;
        bufferLength += bitsPerSymbol;

        // Extract bytes from the buffer as long as we have full bytes
        while (bufferLength >= 8) {
            bufferLength -= 8;
            byteArray.push((buffer >> bufferLength) & 0xFF);
        }
    }

	if (byteArray[ byteArray.length - 1 ] == 0) { 
		byteArray.pop();
	}
    return byteArray;
}


function mapBytesToSymbols(byteArray, uniqueSymbols) {
    const symbolArrayLength = uniqueSymbols.length;
    const symbols = [];

    // Determine how many bits per symbol we can map
    const bitsPerSymbol = Math.floor(Math.log2(symbolArrayLength));
    const maxValuePerSymbol = Math.pow(2, bitsPerSymbol) - 1;

    let buffer = 0;
    let bufferLength = 0;

    for (let byte of byteArray) {
        // Add the current byte to the buffer
        buffer = (buffer << 8) | byte;
        bufferLength += 8;

        // Extract symbols from the buffer as long as we have enough bits
        while (bufferLength >= bitsPerSymbol) {
            bufferLength -= bitsPerSymbol;
            const symbolIndex = (buffer >> bufferLength) & maxValuePerSymbol;
            symbols.push(uniqueSymbols[symbolIndex]);
        }
    }

    // If there are remaining bits in the buffer, map them as well
    if (bufferLength > 0) {
        const symbolIndex = (buffer << (bitsPerSymbol - bufferLength)) & maxValuePerSymbol;
        symbols.push(uniqueSymbols[symbolIndex]);
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