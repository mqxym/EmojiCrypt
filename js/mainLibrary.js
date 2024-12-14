/**
 * Helper function to encode a string as UTF-8.
 * @param {string} str - The input string.
 * @returns {Uint8Array} The UTF-8 encoded bytes.
 */
function encodeUTF8(str) {
    return new TextEncoder().encode(str);
}

/**
 * Helper function to decode UTF-8 bytes to a string.
 * @param {Uint8Array} bytes - The UTF-8 encoded bytes.
 * @returns {string} The decoded string.
 */
function decodeUTF8(bytes) {
    return new TextDecoder().decode(bytes);
}

/**
 * Generates a 256-bit key by hashing the input data with SHA-256.
 * @param {Uint8Array} data - The input data to hash.
 * @returns {Promise<Uint8Array>} The 256-bit key as Uint8Array.
 */
async function generate256BitKey(data) {
    const hash = await hashData(data, 'SHA-256');
    return hash; // SHA-256 outputs 256 bits (32 bytes)
}


/**
 * Generates 64 cryptographically secure salts using SHA-256 and a seed string.
 * @param {string} seed - The seed string used to generate salts.
 * @returns {Promise<string[]>} An array of 64 hexadecimal salt strings.
 */
async function generate64Salts(seed) {
    if (typeof seed !== 'string' || seed.length === 0) {
        throw new Error('Seed must be a non-empty string.');
    }

    const numberOfSalts = 64;
    const saltPromises = [];

    for (let i = 0; i < numberOfSalts; i++) {
        // Create a unique input by appending the index to the seed
        const uniqueInput = `${seed}:${i}`;
        const encodedInput = encodeUTF8(uniqueInput);
        const hashPromise = hashData(encodedInput, 'SHA-256');
        saltPromises.push(hashPromise);
    }

    // Await all hashing operations in parallel
    const salts = await Promise.all(saltPromises);
    return salts;
}


/**
 * Generates an 4-kilobyte key by hashing the input data with SHA-512 using predetermined salts.
 * @param {Uint8Array} data - The input data to hash.
 * @param {string[]} salts - An array of salt strings.
 * @returns {Promise<Uint8Array>} The 8192-bit key as Uint8Array.
 */
async function generate4kByteKey(data, salts) {
    if (salts.length !== 64) {
        throw new Error('Exactly 64 salts are required to generate a 4-kilobyte key with SHA-512.');
    }

    // Array to hold the hash promises
    const hashPromises = salts.map(async (salt) => {
        const saltBytes = encodeUTF8(salt);
        const combined = concatUint8Arrays(data, saltBytes);
        const hash = await hashData(combined, 'SHA-512');
        return hash;
    });

    // Await all hash operations
    const hashes = await Promise.all(hashPromises);

    // Concatenate all hashes to form the final key
    const finalKey = concatUint8Arrays(...hashes);

    return finalKey; // 16 hashes × 64 bytes = 1024 bytes (8192 bits)
}


/**
 * Helper function to concatenate multiple Uint8Arrays into a single Uint8Array.
 * @param  {...Uint8Array} arrays - The arrays to concatenate.
 * @returns {Uint8Array} The concatenated array.
 */
function concatUint8Arrays(...arrays) {
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}

/**
 * Helper function to compute a hash using the Web Crypto API.
 * @param {Uint8Array} data - The input data to hash.
 * @param {string} algorithm - The hash algorithm (e.g., 'SHA-256').
 * @returns {Promise<Uint8Array>} The hash as Uint8Array.
 */
async function hashData(data, algorithm) {
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    return new Uint8Array(hashBuffer);
}


/**
 * Maps an array of symbols to a byte array based on the provided unique symbols array.
 *
 * @param {Array} symbolArray - The array of symbols to map.
 * @param {Array} uniqueSymbols - The array of unique symbols representing the base.
 * @returns {Array} The resulting byte array.
 * @throws {Error} If a symbol in symbolArray is not found in uniqueSymbols.
 */
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

/**
 * Maps a byte array to an array of symbols based on the provided unique symbols array.
 *
 * @param {Array} byteArray - The array of bytes to map.
 * @param {Array} uniqueSymbols - The array of unique symbols representing the base.
 * @returns {Array} The resulting array of symbols.
 */
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

/**
 * Generates a random alphanumeric string of variable length between 6 and 128 characters.
 *
 * @returns {string} The generated random string.
 */

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
    

/**
 * Generates a random alphanumeric string using a secure random number generator
 * 
 * @param {int} length - The length of the generated string
 * @returns {string} The generated random string.
 */

function generateSecureRandomString(length = 15) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsetLength = charset.length;
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);
    let result = '';
    for (let i = 0; i < length; i++) {
        // Use modulo to map the random byte to the charset index
        result += charset[randomValues[i] % charsetLength];
    }
    return result;
}


/**
 * Encrypts data using AES-256-CTR.
 * @param {Uint8Array} key - The AES-CTR key (256-bit).
 * @param {Uint8Array} data - The data to encrypt.
 * @returns {Promise<Uint8Array>} The encrypted data with the IV prepended.
 */
async function aesCtrEncrypt(key, data) {
    // Generate a random 16-byte IV for AES-CTR
    const iv = crypto.getRandomValues(new Uint8Array(16));

    // Import the AES key
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-CTR', counter: iv, length: 128 },
        false,
        ['encrypt']
    );

    // Perform encryption
    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: 'AES-CTR',
            counter: iv,
            length: 128 // 128-bit counter
        },
        cryptoKey,
        data
    );

    // Combine IV and encrypted data
    return concatUint8Arrays(iv, new Uint8Array(encryptedBuffer));
}

/**
 * Decrypts data using AES-256-CTR.
 * @param {Uint8Array} key - The AES-CTR key (256-bit).
 * @param {Uint8Array} data - The encrypted data with the IV prepended.
 * @returns {Promise<Uint8Array>} The decrypted data.
 */
async function aesCtrDecrypt(key, data) {
    // Extract the IV from the first 16 bytes
    const iv = data.slice(0, 16);
    const encryptedData = data.slice(16);

    // Import the AES key
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-CTR', counter: iv, length: 128 },
        false,
        ['decrypt']
    );

    // Perform decryption
    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: 'AES-CTR',
            counter: iv,
            length: 128 // 128-bit counter
        },
        cryptoKey,
        encryptedData
    );

    return new Uint8Array(decryptedBuffer);
}


/**
 * Performs XOR encryption/decryption on data using the provided key.
 * @param {Uint8Array} key - The XOR key.
 * @param {Uint8Array} data - The data to encrypt/decrypt.
 * @returns {Uint8Array} The resulting encrypted/decrypted data.
 */
function XORencrypt(key, data) {
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        result[i] = data[i] ^ key[i % key.length];
    }
    return result;
}

/**
 * Performs XOR decryption/encryption on data using the provided key.
 * (XOR is symmetric, so encryption and decryption are the same)
 * @param {Uint8Array} key - The XOR key.
 * @param {Uint8Array} data - The data to decrypt/encrypt.
 * @returns {Uint8Array} The resulting decrypted/encrypted data.
 */
function XORdecrypt(key, data) {
    return XORencrypt(key, data); // XOR is symmetric
}

/**
 * Encrypts data using AES-256-GCM.
 * @param {Uint8Array} key - The AES-GCM key (256-bit).
 * @param {Uint8Array} data - The data to encrypt.
 * @returns {Promise<Uint8Array>} The encrypted data with the IV prepended.
 */
async function aesGcmEncrypt(key, data) {
    // Generate a random 12-byte IV for AES-GCM
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Import the AES key
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['encrypt']
    );

    // Perform encryption
    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        cryptoKey,
        data
    );

    // Combine IV and encrypted data
    return concatUint8Arrays(iv, new Uint8Array(encryptedBuffer));
}

/**
 * Decrypts data using AES-256-GCM.
 * @param {Uint8Array} key - The AES-GCM key (256-bit).
 * @param {Uint8Array} data - The encrypted data with the IV prepended.
 * @returns {Promise<Uint8Array>} The decrypted data.
 */
async function aesGcmDecrypt(key, data) {
    // Extract the IV from the first 12 bytes
    const iv = data.slice(0, 12);
    const encryptedData = data.slice(12);

    // Import the AES key
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );

    // Perform decryption
    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        cryptoKey,
        encryptedData
    );

    return new Uint8Array(decryptedBuffer);
}

/**
 * Generates a cryptographically secure permutation of symbols based on a binary input array.
 *
 * This function uses the SHA-256 hashing algorithm to create a deterministic yet secure
 * permutation of the provided symbols. The permutation is derived from the input binary array,
 * ensuring that the same input will always produce the same permutation, while different
 * inputs yield different permutations.
 *
 * @async
 * @function generateSecurePermutation
 * @param {Uint8Array} inputBytes - The input binary array used to seed the permutation generation.
 * @param {Array<string>} symbolsArray - An array of symbols to be permuted.
 * @returns {Promise<Array<string>>} A promise that resolves to the securely permuted array of symbols.
 *
 * @example
 * const inputBytes = new Uint8Array([0x73, 0x65, 0x63, 0x75, 0x72, 0x65, 0x53, 0x65, 0x65, 0x64]);
 * const symbols = ["apple", "banana", "cherry", "date"];
 * generateSecurePermutation(inputBytes, symbols).then(permutation => {
 *   console.log(permutation);
 *   // Output might be: ["cherry", "apple", "date", "banana"]
 * });
 */
async function generateSecurePermutation(inputBytes, symbolsArray) {
    // Compute the SHA-256 hash of the input bytes to derive the seed.
    const seedHashBuffer = await crypto.subtle.digest('SHA-256', inputBytes);
    const seedHash = new Uint8Array(seedHashBuffer);

    /**
     * Generate a hash for each symbol by concatenating the seedHash with the symbol's index
     * and computing the SHA-256 hash of the combined data.
     */
    const symbolHashes = await Promise.all(symbolsArray.map(async (symbol, index) => {
        // Create a 4-byte buffer to represent the symbol's index in big-endian format.
        const indexBuffer = new ArrayBuffer(4);
        new DataView(indexBuffer).setUint32(0, index, false); // false for big-endian
        const indexBytes = new Uint8Array(indexBuffer);

        // Concatenate the seedHash with the indexBytes to form the data to be hashed.
        const data = new Uint8Array(seedHash.length + indexBytes.length);
        data.set(seedHash);
        data.set(indexBytes, seedHash.length);

        // Compute the SHA-256 hash of the concatenated data.
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return { symbol, hash: new Uint8Array(hashBuffer) };
    }));

    /**
     * Sort the symbols based on their corresponding hash values in ascending order.
     * This ensures a deterministic and secure permutation.
     */
    symbolHashes.sort((a, b) => {
        const hashA = a.hash;
        const hashB = b.hash;
        for (let i = 0; i < hashA.length; i++) {
            if (hashA[i] !== hashB[i]) {
                return hashA[i] - hashB[i];
            }
        }
        return 0; // If hashes are identical, maintain original order
    });

    // Extract and return the sorted symbols from the sorted hash objects.
    const sortedSymbols = symbolHashes.map(item => item.symbol);
    return sortedSymbols;
}

/**
 * Generates a cryptographically secure permutation of symbols based on an input string.
 *
 * This helper function encodes the input string into a binary array and delegates the permutation
 * generation to the `generateSecurePermutation` function.
 *
 * @async
 * @function generateSecurePermutationFromString
 * @param {string} inputString - The input string used to seed the permutation generation.
 * @param {Array<string>} symbolsArray - An array of symbols to be permuted.
 * @returns {Promise<Array<string>>} A promise that resolves to the securely permuted array of symbols.
 *
 * @example
 * const input = "secureSeed";
 * const symbols = ["apple", "banana", "cherry", "date"];
 * generateSecurePermutationFromString(input, symbols).then(permutation => {
 *   console.log(permutation);
 *   // Output might be: ["cherry", "apple", "date", "banana"]
 * });
 */
async function generateSecurePermutationFromString(inputString, symbolsArray) {
    // Initialize a TextEncoder to convert the input string to a Uint8Array.
    const encoder = new TextEncoder();
    const inputBytes = encoder.encode(inputString);

    // Delegate to the main generateSecurePermutation function.
    return generateSecurePermutation(inputBytes, symbolsArray);
}

/**
 * Extracts all emoji characters from a given string.
 *
 * This function scans the input string for emojis using a predefined regular expression
 * and returns an array containing all matched emoji characters.
 *
 * @function
 * @param {string} str - The input string from which emojis will be extracted.
 * @returns {string[]} An array of emoji characters found in the input string.
 *
 * @example
 * const text = "Hello 😊! How are you doing today? 🤔 Let's grab some coffee ☕️.";
 * const emojis = extractEmojis(text);
 * console.log(emojis);
 * // Output: ['😊', '🤔', '☕️']
 */
function extractEmojis(str) {
    const regex = getEmojiRegex();
    let emojis = [];
    let match;
  
    while ((match = regex.exec(str)) !== null) {
      emojis.push(match[0]);
    }
     
    console.log(emojis);
    return emojis;
}

/**
 * Counts the number of emoji characters and non-emoji characters in a given string.
 *
 * This function analyzes the input string to determine how many emojis it contains
 * and how many non-emoji characters are present. It returns an object with the counts.
 *
 * @function
 * @param {string} str - The input string to be analyzed.
 * @returns {{ matches: number, notMatches: number }} An object containing:
 *   - `matches`: The number of emoji characters found.
 *   - `notMatches`: The number of non-emoji characters.
 *
 * @example
 * const text = "Hello 😊! How are you doing today? 🤔 Let's grab some coffee ☕️.";
 * const counts = countEmojisAndNonEmojis(text);
 * console.log(counts);
 * // Output: { matches: 3, notMatches: 39 }
 */
function countEmojisAndNonEmojis(str) {
    const regex = getEmojiRegex();
    let match;
    let matchCount = 0;
    let notMatchCount = 0;
    let lastIndex = 0;

    while ((match = regex.exec(str)) !== null) {
        matchCount++;
        
        // Calculate the number of non-emoji characters between the last match and the current match
        notMatchCount += match.index - lastIndex;
        
        // Update lastIndex to the end of the current match
        lastIndex = regex.lastIndex;
    }

    // Add any remaining non-emoji characters after the last match
    notMatchCount += str.length - lastIndex;

    const result = {
        matches: matchCount,
        notMatches: notMatchCount
    };
    return result;
}

/**
 * Retrieves the regular expression used to match emoji characters.
 * 
 * Source: https://github.com/mathiasbynens/emoji-regex/blob/main/index.js (<3 to all contributors)
 *
 * @function
 * @returns {RegExp} A regular expression that matches all relevant unicode Emoji charcaters including multi-codepoint Emojis.
 *
 * @example
 * const emojiRegex = getEmojiRegex();
 */
function getEmojiRegex () {
	return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
}

/**
 * Encrypts binary data using a simple XOR encryption algorithm with a PBKDF2-derived key.
 *
 * @async
 * @function simpleXOREncrypt
 * @param {Uint8Array} data - The binary data to encrypt.
 * @param {Uint8Array} password - The binary password used for encryption.
 * @returns {Promise<Uint8Array>} A promise that resolves to the encrypted binary data, prefixed with the IV.
 *
 * @description
 * This function performs the following steps to encrypt the input data:
 * 1. Generates a 12-byte Initialization Vector (IV) using `crypto.getRandomValues`.
 * 2. Determines the desired key length based on the input data's byte length.
 * 3. Derives a variable-length XOR key using PBKDF2 with the provided password and IV.
 * 4. Encrypts the data by applying XOR encryption with the derived XOR key.
 * 5. Prepends the IV to the XOR-encrypted data.
 * 6. Returns the combined IV and encrypted data as the final ciphertext.
 *
 * @note
 * The use of XOR encryption is not recommended for secure applications.
 */
async function simpleXOREncrypt(data, password) {
    // Generate a 12-byte IV
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Determine key length
    const keyLength = data.length;

    let xorKey;

    // Derive the XOR key using PBKDF2 with variable key length
    try {
        xorKey = await generatePBKDF2Key(password, iv, keyLength * 8); // keyLength in bits
    } catch (err) {
        return "";
    }

    // Perform XOR encryption
    const xorEncrypted = XORencrypt(xorKey, data);

    //Add a flag to mark simple xor encrypted text
    const flag = new Uint8Array([255]);

    // Prepend IV to the encrypted data
    const fullCipher = concatUint8Arrays(flag, iv, xorEncrypted);

    return fullCipher;
}

/**
 * Decrypts binary data that was encrypted using the simple XOR encryption algorithm with a PBKDF2-derived key.
 *
 * @async
 * @function simpleXORDecrypt
 * @param {Uint8Array} data - The encrypted binary data to decrypt, prefixed with the IV.
 * @param {Uint8Array} password - The binary password used for decryption.
 * @returns {Promise<Uint8Array>} A promise that resolves to the decrypted binary data.
 *
 * @description
 * This function performs the following steps to decrypt the input data:
 * 1. Extracts the 12-byte Initialization Vector (IV) from the first 1-13 bytes of the input data (Byte 0 is a flag).
 * 2. Extracts the encrypted data by slicing off the IV.
 * 3. Determines the desired key length based on the encrypted data's byte length.
 * 4. Derives the same XOR key using PBKDF2 with the provided password and extracted IV.
 * 5. Decrypts the data by applying XOR decryption with the derived XOR key.
 * 6. Returns the decrypted binary data.
 *
 * @note
 * The use of XOR decryption is not recommended for secure applications. 
 */
async function simpleXORDecrypt(data, password) {
    if (data.length < 13) {
        throw new Error('Data is too short to contain an IV.');
    }

    // Extract the IV from the first 12 bytes and remove flag
    const iv = data.slice(1, 13);

    // Extract the encrypted data
    const encryptedData = data.slice(13);

    const keyLength = encryptedData.length;

    // Derive the XOR key using PBKDF2 with variable key length
    const xorKey = await generatePBKDF2Key(password, iv, keyLength * 8); 

    // Perform XOR decryption
    const decrypted = XORdecrypt(xorKey, encryptedData);

    return decrypted;
}

/**
 * Derives a variable-length key using PBKDF2 with the provided password and IV.
 *
 * @async
 * @function generatePBKDF2Key
 * @param {Uint8Array} password - The binary password used for key derivation.
 * @param {Uint8Array} iv - The Initialization Vector used as salt.
 * @param {number} keyLengthBits - The desired key length in bits.
 * @returns {Promise<Uint8Array>} A promise that resolves to the derived key as Uint8Array.
 *
 * @description
 * This function derives a key of specified length using PBKDF2 with SHA-512.
 * It performs multiple PBKDF2 iterations with incremental salts to achieve the desired key length.
 *
 * @throws {Error} If key derivation fails.
 */
async function generatePBKDF2Key(password, iv, keyLengthBits) {
    const iterations = 1000; // Number of PBKDF2 iterations
    const hash = 'SHA-512'; // Hash function for PBKDF2
    const bytesPerIteration = 64;
    const keyLength = keyLengthBits / 8; 
    const iterationsNeeded = Math.ceil(keyLength / bytesPerIteration); // Number of iterations needed

    // Import the password as a CryptoKey for PBKDF2
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        password,
        {
            name: 'PBKDF2'
        },
        false,
        ['deriveBits']
    );

    const derivedKeyChunks = [];

    for (let i = 0; i < iterationsNeeded; i++) {
        const counter = i + 1; // Counter starts at 1
        const counterArray = new Uint8Array([counter]); // Single-byte counter

        // Create a unique salt by appending the counter to the IV
        const salt = concatUint8Arrays(iv, counterArray);

        // Derive bits using PBKDF2
        const derivedBits = await crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: iterations,
                hash: hash
            },
            cryptoKey,
            bytesPerIteration * 8 // Number of bits to derive
        );

        derivedKeyChunks.push(new Uint8Array(derivedBits));
    }

    // Concatenate all derived chunks to form the final key
    const finalKey = concatUint8Arrays(...derivedKeyChunks);

    // Slice the final key to the desired length in case of overflows
    return finalKey.slice(0, keyLength);
}