/**
 * @file ConversionOrchestrator.js
 * @description Orchestrates the conversion of messages to/from emojis, with optional simple encryption.
 */

import { EmojiService } from '../services/emojiService.js';
import { CryptoService } from '../services/cryptoService.js';
import { HashingService } from '../services/hashingService.js';
import { encodeUTF8, decodeUTF8, extractEmojis } from '../utils.js';

export class ConversionOrchestrator {
  /**
   * @param {EmojiService} emojiService
   * @param {CryptoService} cryptoService
   * @param {HashingService} hashingService
   * @param {string[]} emojiArrayConstant
   */
  constructor(emojiService, cryptoService, hashingService, emojiArrayConstant) {
    this.emojiService = emojiService;
    this.cryptoService = cryptoService;
    this.hashingService = hashingService;
    this.EMOJI_ARRAY = emojiArrayConstant;
  }

  async encodeToEmojis(message, customEmojiArrayUsed, useSimpleEncrypt) {
    try {
      let bytes = encodeUTF8(message);
      const emojiSetToUse = customEmojiArrayUsed || this.EMOJI_ARRAY;

      if (useSimpleEncrypt) {
        if (!emojiSetToUse || emojiSetToUse.length === 0) {
          if (window.DEBUG_APP) console.error("Cannot use simple encrypt with an empty or invalid emoji set.");
          return "";
        }
        const customEmojiArrayString = emojiSetToUse.join('');
        const customEmojiArrayBytes = encodeUTF8(customEmojiArrayString);
        const key = await this.hashingService.hashData(customEmojiArrayBytes, 'SHA-512');

        bytes = await this.cryptoService.simpleXOREncrypt(bytes, key);
        if (!bytes || bytes.length === 0) {
          if (window.DEBUG_APP) console.error("Simple XOR encryption failed.");
          return "";
        }
      }

      const encodedEmoji = this.emojiService.mapBytesToSymbols(bytes, emojiSetToUse);
      return encodedEmoji.join('');
    } catch (error) {
      if (window.DEBUG_APP) console.error("Encoding to emojis failed in Orchestrator:", error);
      return "";
    }
  }

  async decodeFromEmojis(emojiMessage, customEmojiArrayUsed, useSimpleEncrypt) {
    try {
      const emojiSetToUse = customEmojiArrayUsed || this.EMOJI_ARRAY;
      let bytesArray;

      const emojiArray = extractEmojis(emojiMessage);
      if (!emojiArray || emojiArray.length === 0) {
        if (emojiMessage.length > 0 && window.DEBUG_APP) console.warn("Could not extract emojis, or message empty.");
        return "";
      }

      const bytes = this.emojiService.mapSymbolsToBytes(emojiArray, emojiSetToUse);
      bytesArray = Uint8Array.from(bytes);

      if (bytesArray.length > 0 && bytesArray[0] === 255) {
        if (!emojiSetToUse || emojiSetToUse.length === 0) {
          if (window.DEBUG_APP) console.error("Cannot use simple decrypt with an empty or invalid emoji set.");
          return "";
        }
        const customEmojiArrayString = emojiSetToUse.join('');
        const customEmojiArrayBytes = encodeUTF8(customEmojiArrayString);
        const key = await this.hashingService.hashData(customEmojiArrayBytes, 'SHA-512');

        bytesArray = await this.cryptoService.simpleXORDecrypt(bytesArray, key);
        if (!bytesArray) {
          if (window.DEBUG_APP) console.error("Simple XOR decryption failed.");
          return "";
        }
      }

      const decoded = decodeUTF8(bytesArray);
      return decoded;
    } catch (error) {
      if (window.DEBUG_APP) console.error("Decoding from emojis failed in Orchestrator:", error);
      return "";
    }
  }
}
