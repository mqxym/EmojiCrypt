/**
 * @file EncryptionOrchestrator.js
 * @description Orchestrates the encryption and decryption processes using various services.
 */

import { KeyDerivationService } from './keyDerivationService.js';
import { CryptoService } from './cryptoService.js';
import { EmojiService } from './emojiService.js';
// Utility functions will be passed as an object, so direct imports are no longer needed here.
// import { encodeUTF8, decodeUTF8, generateRandomString, concatUint8Arrays, extractEmojis } from './utils.js'; 
import { EMOJI_ARRAY } from './constants.js'; // This is still needed if passed separately
import { HashingService } from './hashingService.js';

export class EncryptionOrchestrator {
    /**
     * Constructs an instance of EncryptionOrchestrator.
     * @param {KeyDerivationService} keyDerivationService - Instance of KeyDerivationService.
     * @param {CryptoService} cryptoService - Instance of CryptoService.
     * @param {EmojiService} emojiService - Instance of EmojiService.
     * @param {HashingService} hashingService - Instance of HashingService.
     * @param {object} utils - Consolidated utility functions object.
     * @param {string[]} emojiArrayConstant - The EMOJI_ARRAY constant.
     */
    constructor(keyDerivationService, cryptoService, emojiService, hashingService, utils, emojiArrayConstant) {
        this.keyDerivationService = keyDerivationService;
        this.cryptoService = cryptoService;
        this.emojiService = emojiService;
        this.hashingService = hashingService;
        this.utils = utils; // Store the whole utils object

        this.EMOJI_ARRAY = emojiArrayConstant; // EMOJI_ARRAY is passed directly
    }

    /**
     * A private helper method to generate default cryptographic keys.
     * This is used when no keyInput is provided for encryption/decryption.
     * @returns {Promise<{ aesKey1: Uint8Array, aesKey2: Uint8Array, xorKey: Uint8Array, customSalt: Uint8Array }>} Default keys.
     */
    async _getDefaultKeys() {
        // These specific strings are from the original getCryptoKeys default case
        const defaultAesKey1Seed = "I'm looking for friends :)";
        const defaultAesKey2Seed = "Do you wanna be my friend?";
        const defaultXorKeySeed = "You are a kind stranger.";

        const aesKey1 = await this.hashingService.generate256BitKey(this.utils.encodeUTF8(defaultAesKey1Seed));
        const aesKey2 = await this.hashingService.generate256BitKey(this.utils.encodeUTF8(defaultAesKey2Seed));
        // The original default XOR key was also 256-bit. For consistency, we'll use generate256BitKey.
        // If a 4k byte key was intended, the seed and generation logic would differ.
        const xorKey = await this.hashingService.generate256BitKey(this.utils.encodeUTF8(defaultXorKeySeed)); 
        
        // The original default salt was 4 bytes.
        const customSalt = crypto.getRandomValues(new Uint8Array(4)); 
        
        return { aesKey1, aesKey2, xorKey, customSalt };
    }

    /**
     * Encrypts a message using derived keys and converts it to emojis.
     * @param {string} message - The message to encrypt.
     * @param {string} keyInput - The input key string for deriving encryption keys.
     * @returns {Promise<string>} The encrypted message represented as emojis, or empty string on failure.
     */
    async encryptMessage(message, keyInput) {
        try {
            let keys;
            if (!keyInput) { // Handles empty string, null, or undefined
                keys = await this._getDefaultKeys();
            } else {
                keys = await this.keyDerivationService.deriveCryptoKeys(keyInput);
            }

            const messageBytes = this.utils.encodeUTF8(message);
            const aesGcmEncrypted = await this.cryptoService.aesGcmEncrypt(keys.aesKey1, messageBytes);
            const aesCtrEncrypted = await this.cryptoService.aesCtrEncrypt(keys.aesKey2, aesGcmEncrypted);
            const xorEncrypted = this.cryptoService.XORencrypt(keys.xorKey, aesCtrEncrypted);
            
            // Ensure customSalt is always 6 bytes for encryption output, pad if default was 4 bytes
            let saltToConcat = keys.customSalt;
            if (saltToConcat.length < 6 && !keyInput) { // Default salt is 4 bytes, pad it
                const paddedSalt = new Uint8Array(6);
                paddedSalt.set(saltToConcat); // Copies the 4 bytes, remaining 2 are 0
                saltToConcat = paddedSalt;
            } else if (saltToConcat.length !==6 && keyInput) {
                 // deriveCryptoKeys is expected to return a 6-byte salt if keyInput is present
                 console.warn("Custom salt from deriveCryptoKeys is not 6 bytes. This might be an issue.");
            }


            const finalOutput = this.utils.concatUint8Arrays(saltToConcat, xorEncrypted);

            const emojiArrayPermutation = await this.emojiService.generateSecurePermutationFromString(keyInput || "", this.EMOJI_ARRAY);
            const encryptedEmoji = this.emojiService.mapBytesToSymbols(finalOutput, emojiArrayPermutation);

            return encryptedEmoji.join('');
        } catch (error) {
            console.error("Encryption failed in Orchestrator:", error);
            return "";
        }
    }

    /**
     * Decrypts a message represented as emojis.
     * @param {string} emojiMessage - The encrypted message represented as emojis.
     * @param {string} keyInput - The input key string for deriving decryption keys.
     * @returns {Promise<string>} The decrypted message, or empty string on failure.
     */
    async decryptMessage(emojiMessage, keyInput) {
        try {
            const emojiArrayPermutation = await this.emojiService.generateSecurePermutationFromString(keyInput || "", this.EMOJI_ARRAY);
            
            const emojiArray = this.utils.extractEmojis(emojiMessage);
            if (!emojiArray || emojiArray.length === 0) {
                console.error("Decryption failed: Could not extract emojis from message.");
                return "";
            }

            const decodedBytes = this.emojiService.mapSymbolsToBytes(emojiArray, emojiArrayPermutation);
            if (!decodedBytes || decodedBytes.length < 6) { // Must be at least 6 bytes for salt
                console.error("Decryption failed: Decoded bytes are invalid or too short.");
                return "";
            }

            const customSalt = decodedBytes.slice(0, 6);
            const encryptedBytes = decodedBytes.slice(6);

            // deriveCryptoKeys handles empty keyInput and uses the provided salt.
            const keys = await this.keyDerivationService.deriveCryptoKeys(keyInput, customSalt);

            const aesCtrEncrypted = this.cryptoService.XORdecrypt(keys.xorKey, encryptedBytes);
            const aesGcmEncrypted = await this.cryptoService.aesCtrDecrypt(keys.aesKey2, aesCtrEncrypted);
            const decryptedBytes = await this.cryptoService.aesGcmDecrypt(keys.aesKey1, aesGcmEncrypted);
            
            return this.utils.decodeUTF8(decryptedBytes);
        } catch (error) {
            console.error("Decryption failed in Orchestrator:", error);
            return "";
        }
    }

    /**
     * Generates a random application key (an encrypted random message).
     * @returns {Promise<string>} The generated random app key as an emoji string.
     */
    async generateRandomAppKey() {
        const randomMessage = this.utils.generateRandomString();
        // Encrypt with an empty keyInput, which will use default keys.
        const keyString = await this.encryptMessage(randomMessage, ''); 
        return keyString;
    }
}
