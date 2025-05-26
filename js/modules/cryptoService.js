/**
 * @file CryptoService
 * @description Provides cryptographic functionalities.
 */

import { concatUint8Arrays } from './utils.js';

/**
 * CryptoService object literal.
 * @namespace CryptoService
 */
export const CryptoService = {
    /**
     * Encrypts data using AES-256-GCM.
     * @param {Uint8Array} key - The AES-GCM key (256-bit).
     * @param {Uint8Array} data - The data to encrypt.
     * @returns {Promise<Uint8Array>} The encrypted data with the IV prepended.
     * @memberof CryptoService
     */
    async aesGcmEncrypt(key, data) {
        const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM
        const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['encrypt']);
        const encryptedBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, cryptoKey, data);
        return concatUint8Arrays(iv, new Uint8Array(encryptedBuffer));
    },

    /**
     * Decrypts data using AES-256-GCM.
     * @param {Uint8Array} key - The AES-GCM key (256-bit).
     * @param {Uint8Array} data - The encrypted data with the IV prepended.
     * @returns {Promise<Uint8Array>} The decrypted data.
     * @memberof CryptoService
     */
    async aesGcmDecrypt(key, data) {
        const iv = data.slice(0, 12);
        const encryptedData = data.slice(12);
        const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['decrypt']);
        const decryptedBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, cryptoKey, encryptedData);
        return new Uint8Array(decryptedBuffer);
    },

    /**
     * Encrypts data using AES-256-CTR.
     * @param {Uint8Array} key - The AES-CTR key (256-bit).
     * @param {Uint8Array} data - The data to encrypt.
     * @returns {Promise<Uint8Array>} The encrypted data with the IV prepended.
     * @memberof CryptoService
     */
    async aesCtrEncrypt(key, data) {
        const iv = crypto.getRandomValues(new Uint8Array(16)); // 16-byte IV for AES-CTR
        const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'AES-CTR', counter: iv, length: 128 }, false, ['encrypt']);
        const encryptedBuffer = await crypto.subtle.encrypt({ name: 'AES-CTR', counter: iv, length: 128 }, cryptoKey, data);
        return concatUint8Arrays(iv, new Uint8Array(encryptedBuffer));
    },

    /**
     * Decrypts data using AES-256-CTR.
     * @param {Uint8Array} key - The AES-CTR key (256-bit).
     * @param {Uint8Array} data - The encrypted data with the IV prepended.
     * @returns {Promise<Uint8Array>} The decrypted data.
     * @memberof CryptoService
     */
    async aesCtrDecrypt(key, data) {
        const iv = data.slice(0, 16);
        const encryptedData = data.slice(16);
        const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'AES-CTR', counter: iv, length: 128 }, false, ['decrypt']);
        const decryptedBuffer = await crypto.subtle.decrypt({ name: 'AES-CTR', counter: iv, length: 128 }, cryptoKey, encryptedData);
        return new Uint8Array(decryptedBuffer);
    },

    /**
     * Performs XOR encryption/decryption on data using the provided key.
     * @param {Uint8Array} key - The XOR key.
     * @param {Uint8Array} data - The data to encrypt/decrypt.
     * @returns {Uint8Array} The resulting encrypted/decrypted data.
     * @memberof CryptoService
     */
    XORencrypt(key, data) {
        const result = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
            result[i] = data[i] ^ key[i % key.length];
        }
        return result;
    },

    /**
     * Performs XOR decryption/encryption on data using the provided key.
     * (XOR is symmetric, so encryption and decryption are the same)
     * @param {Uint8Array} key - The XOR key.
     * @param {Uint8Array} data - The data to decrypt/encrypt.
     * @returns {Uint8Array} The resulting decrypted/encrypted data.
     * @memberof CryptoService
     */
    XORdecrypt(key, data) {
        return this.XORencrypt(key, data); // XOR is symmetric
    },

    /**
     * Derives a variable-length key using PBKDF2 with the provided password and IV.
     * @param {Uint8Array} password - The binary password used for key derivation.
     * @param {Uint8Array} iv - The Initialization Vector used as salt.
     * @param {number} keyLengthBits - The desired key length in bits.
     * @returns {Promise<Uint8Array>} A promise that resolves to the derived key as Uint8Array.
     * @memberof CryptoService
     */
    async generatePBKDF2Key(password, iv, keyLengthBits) {
        const iterations = 1000;
        const hash = 'SHA-512';
        const bytesPerIteration = 64; // SHA-512 output size
        const keyLengthBytes = keyLengthBits / 8;
        const iterationsNeeded = Math.ceil(keyLengthBytes / bytesPerIteration);

        const cryptoKey = await crypto.subtle.importKey('raw', password, { name: 'PBKDF2' }, false, ['deriveBits']);
        const derivedKeyChunks = [];

        for (let i = 0; i < iterationsNeeded; i++) {
            const counter = i + 1;
            const counterArray = new Uint8Array([counter]);
            const salt = concatUint8Arrays(iv, counterArray);
            const derivedBits = await crypto.subtle.deriveBits(
                { name: 'PBKDF2', salt: salt, iterations: iterations, hash: hash },
                cryptoKey,
                bytesPerIteration * 8
            );
            derivedKeyChunks.push(new Uint8Array(derivedBits));
        }
        const finalKey = concatUint8Arrays(...derivedKeyChunks);
        return finalKey.slice(0, keyLengthBytes);
    },

    /**
     * Encrypts binary data using a simple XOR encryption algorithm with a PBKDF2-derived key.
     * @param {Uint8Array} data - The binary data to encrypt.
     * @param {Uint8Array} password - The binary password used for encryption.
     * @returns {Promise<Uint8Array>} A promise that resolves to the encrypted binary data, prefixed with the IV.
     * @memberof CryptoService
     */
    async simpleXOREncrypt(data, password) {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const keyLength = data.length;
        let xorKey;
        try {
            xorKey = await this.generatePBKDF2Key(password, iv, keyLength * 8);
        } catch (err) {
            console.error("Error deriving key in simpleXOREncrypt:", err);
            return new Uint8Array(0); // Return empty array on error
        }
        const xorEncrypted = this.XORencrypt(xorKey, data);
        const flag = new Uint8Array([255]);
        return concatUint8Arrays(flag, iv, xorEncrypted);
    },

    /**
     * Decrypts binary data that was encrypted using the simple XOR encryption algorithm with a PBKDF2-derived key.
     * @param {Uint8Array} data - The encrypted binary data to decrypt, prefixed with the IV.
     * @param {Uint8Array} password - The binary password used for decryption.
     * @returns {Promise<Uint8Array>} A promise that resolves to the decrypted binary data.
     * @memberof CryptoService
     */
    async simpleXORDecrypt(data, password) {
        if (data.length < 13) {
            throw new Error('Data is too short to contain an IV and flag.');
        }
        const flag = data.slice(0,1); // Not used in this version, but extracted
        const iv = data.slice(1, 13);
        const encryptedData = data.slice(13);
        const keyLength = encryptedData.length;
        let xorKey;
        try {
            xorKey = await this.generatePBKDF2Key(password, iv, keyLength * 8);
        } catch (err) {
            console.error("Error deriving key in simpleXORDecrypt:", err);
            return new Uint8Array(0); // Return empty array on error
        }
        const decrypted = this.XORdecrypt(xorKey, encryptedData);
        return decrypted;
    }
};
