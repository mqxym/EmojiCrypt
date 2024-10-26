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
 * Generates a cryptographically secure permutation of symbols based on an input string.
 *
 * This function uses the SHA-256 hashing algorithm to create a deterministic yet secure
 * permutation of the provided symbols. The permutation is derived from the input string,
 * ensuring that the same input will always produce the same permutation, while different
 * inputs yield different permutations.
 *
 * @async
 * @function generateSecurePermutation
 * @param {string} inputString - The input string used to seed the permutation generation.
 * @param {Array<string>} symbolsArray - An array of symbols to be permuted.
 * @returns {Promise<Array<string>>} A promise that resolves to the securely permuted array of symbols.
 *
 * @example
 * const input = "secureSeed";
 * const symbols = ["apple", "banana", "cherry", "date"];
 * generateSecurePermutation(input, symbols).then(permutation => {
 *   console.log(permutation);
 *   // Output might be: ["cherry", "apple", "date", "banana"]
 * });
 */
async function generateSecurePermutation(inputString, symbolsArray) {
    // Initialize a TextEncoder to convert the input string to a Uint8Array.
    const encoder = new TextEncoder();
    const inputBytes = encoder.encode(inputString);

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