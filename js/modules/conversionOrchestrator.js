/**
 * @file ConversionOrchestrator.js
 * @description Orchestrates the conversion of messages to/from emojis, with optional simple encryption.
 */

import { EmojiService } from './emojiService.js';
import { CryptoService } from './cryptoService.js';
import { HashingService } from './hashingService.js';
// Utility functions will be passed as an object, so direct imports are no longer needed here.
// import { encodeUTF8, decodeUTF8, extractEmojis } from './utils.js'; 
import { EMOJI_ARRAY } from './constants.js'; // This is still needed if passed separately

export class ConversionOrchestrator {
    /**
     * Constructs an instance of ConversionOrchestrator.
     * @param {EmojiService} emojiService - Instance of EmojiService.
     * @param {CryptoService} cryptoService - Instance of CryptoService.
     * @param {HashingService} hashingService - Instance of HashingService.
     * @param {object} utils - Consolidated utility functions object.
     * @param {string[]} emojiArrayConstant - The EMOJI_ARRAY constant.
     */
    constructor(emojiService, cryptoService, hashingService, utils, emojiArrayConstant) {
        this.emojiService = emojiService;
        this.cryptoService = cryptoService;
        this.hashingService = hashingService;
        this.utils = utils; // Store the whole utils object
        
        this.EMOJI_ARRAY = emojiArrayConstant; // EMOJI_ARRAY is passed directly
    }

    /**
     * Encodes a message into emojis, with optional simple XOR encryption.
     * @param {string} message - The message to encode.
     * @param {string[] | null} customEmojiArrayUsed - A custom emoji array, or null to use the default.
     * @param {boolean} useSimpleEncrypt - Whether to apply simple XOR encryption.
     * @returns {Promise<string>} The encoded message as an emoji string, or "" on failure.
     */
    async encodeToEmojis(message, customEmojiArrayUsed, useSimpleEncrypt) {
        try {
            let bytes = this.utils.encodeUTF8(message);
            const emojiSetToUse = customEmojiArrayUsed || this.EMOJI_ARRAY;

            if (useSimpleEncrypt) {
                if (!emojiSetToUse || emojiSetToUse.length === 0) {
                    console.error("Cannot use simple encrypt with an empty or invalid emoji set.");
                    return "";
                }
                const customEmojiArrayString = emojiSetToUse.join('');
                const customEmojiArrayBytes = this.utils.encodeUTF8(customEmojiArrayString);
                const key = await this.hashingService.hashData(customEmojiArrayBytes, 'SHA-512');
                
                bytes = await this.cryptoService.simpleXOREncrypt(bytes, key);
                if (!bytes || bytes.length === 0) { // simpleXOREncrypt might return empty on internal failure
                    console.error("Simple XOR encryption failed.");
                    return "";
                }
            }

            const encodedEmoji = this.emojiService.mapBytesToSymbols(bytes, emojiSetToUse);
            return encodedEmoji.join('');
        } catch (error) {
            console.error("Encoding to emojis failed in Orchestrator:", error);
            return "";
        }
    }

    /**
     * Decodes a message from emojis, with optional simple XOR decryption.
     * @param {string} emojiMessage - The emoji string to decode.
     * @param {string[] | null} customEmojiArrayUsed - A custom emoji array, or null to use the default.
     * @param {boolean} useSimpleEncrypt - Whether to apply simple XOR decryption (primarily if the content is expected to be encrypted).
     * @returns {Promise<string>} The decoded message, or "" on failure.
     */
    async decodeFromEmojis(emojiMessage, customEmojiArrayUsed, useSimpleEncrypt) {
        try {
            const emojiSetToUse = customEmojiArrayUsed || this.EMOJI_ARRAY;
            let bytesArray;

            const emojiArray = this.utils.extractEmojis(emojiMessage);
            if (!emojiArray || emojiArray.length === 0) {
                if (emojiMessage.length > 0) { // Only warn if original message wasn't empty
                    console.warn("Could not extract emojis from message, or message was empty.");
                }
                return ""; // Return empty string if no emojis extracted or message is empty
            }
            
            const bytes = this.emojiService.mapSymbolsToBytes(emojiArray, emojiSetToUse);
            bytesArray = Uint8Array.from(bytes); 

            // Check for the simple XOR encryption flag (255)
            // The useSimpleEncrypt flag acts as an additional condition to attempt decryption.
            if (bytesArray.length > 0 && bytesArray[0] === 255 && useSimpleEncrypt) {
                 if (!emojiSetToUse || emojiSetToUse.length === 0) {
                    console.error("Cannot use simple decrypt with an empty or invalid emoji set.");
                    return "";
                }
                const customEmojiArrayString = emojiSetToUse.join('');
                const customEmojiArrayBytes = this.utils.encodeUTF8(customEmojiArrayString);
                const key = await this.hashingService.hashData(customEmojiArrayBytes, 'SHA-512');
                
                bytesArray = await this.cryptoService.simpleXORDecrypt(bytesArray, key);
                if (!bytesArray) { // simpleXORDecrypt might return null or empty on failure
                    console.error("Simple XOR decryption failed.");
                    return "";
                }
            } else if (bytesArray.length > 0 && bytesArray[0] === 255 && !useSimpleEncrypt) {
                // Data is flagged as encrypted, but decryption is not enabled.
                // This might indicate an issue or an intentional choice not to decrypt.
                // For now, we'll proceed to decode it as is, which will likely fail or produce garbage.
                // Alternatively, could return an error or specific message here.
                console.warn("Data appears to be simple XOR encrypted, but decryption was not enabled via useSimpleEncrypt flag.");
            }
            
            const decoded = this.utils.decodeUTF8(bytesArray);
            return decoded;
        } catch (error) {
            console.error("Decoding from emojis failed in Orchestrator:", error);
            return "";
        }
    }
}
