/**
 * @file EncryptionOrchestrator.js
 * @description Orchestrates the encryption and decryption processes using various services.
 */

import { KeyDerivationService } from '../deprecated/keyDerivationService.js';
import { CryptoService } from '../services/cryptoService.js';
import { EmojiService } from '../services/emojiService.js';
import { HashingService } from '../services/hashingService.js';
import { Cryptit } from '../../lib/cryptit/cryptit.browser.min.js';
import { delay, encodeUTF8, decodeUTF8, extractEmojis, generateRandomString } from '../utils.js';

export class EncryptionOrchestrator {
  /**
   * @param {KeyDerivationService} keyDerivationService
   * @param {CryptoService} cryptoService
   * @param {EmojiService} emojiService
   * @param {HashingService} hashingService
   * @param {string[]} emojiArrayConstant
   * @param {CryptitInstance} cryptitInstance
   */
  constructor(keyDerivationService, cryptoService, emojiService, hashingService, emojiArrayConstant, cryptitInstance) {
    this.keyDerivationService = keyDerivationService;
    this.cryptoService = cryptoService;
    this.emojiService = emojiService;
    this.hashingService = hashingService;
    this.cryptitInstance = cryptitInstance;

    this.EMOJI_ARRAY = emojiArrayConstant;
  }

  async encryptMessage(message, keyInput) {
    try {
      await delay(150);
      const encrypted = await this.cryptitInstance.encryptText(message, keyInput)
      const encryptedEmoji = this.emojiService.mapBytesToSymbols(encrypted.uint8array, this.EMOJI_ARRAY);
      encrypted.clear();
      return encryptedEmoji.join('');
    } catch (error) {
      if (window.DEBUG_APP) console.error("Encryption failed in Orchestrator:", error);
      return "";
    }
  }

  async decryptMessage(emojiMessage, keyInput) {
    try {
      await delay(150);

      const emojiArrayPermutation = await this.emojiService.generateSecurePermutationFromString(keyInput || "", this.EMOJI_ARRAY);

      const emojiArray = extractEmojis(emojiMessage);
      if (!emojiArray || emojiArray.length === 0) {
        if (window.DEBUG_APP) console.error("Decryption failed: Could not extract emojis from message.");
        return "";
      }

      const decodedBytesCryptit = this.emojiService.mapSymbolsToBytes(emojiArray, this.EMOJI_ARRAY);
      const decodedUint8 = new Uint8Array(decodedBytesCryptit);

      const isEncryptedWithCryptit = await Cryptit.isEncrypted(decodedUint8);
      if (isEncryptedWithCryptit) {
        const decrypted = await this.cryptitInstance.decryptText(decodedUint8, keyInput);
        return decrypted.text;
      }

      const decodedBytes = this.emojiService.mapSymbolsToBytes(emojiArray, emojiArrayPermutation);
      if (!decodedBytes || decodedBytes.length < 6) {
        if (window.DEBUG_APP) console.error("Decryption failed: Decoded bytes invalid/too short.");
        return "";
      }

      const customSalt = decodedBytes.slice(0, 6);
      const encryptedBytes = decodedBytes.slice(6);
      const keys = await this.keyDerivationService.deriveCryptoKeys(keyInput, customSalt);

      const aesCtrEncrypted = this.cryptoService.XORdecrypt(keys.xorKey, encryptedBytes);
      const aesGcmEncrypted = await this.cryptoService.aesCtrDecrypt(keys.aesKey2, aesCtrEncrypted);
      const decryptedBytes = await this.cryptoService.aesGcmDecrypt(keys.aesKey1, aesGcmEncrypted);

      return decodeUTF8(decryptedBytes);
    } catch (error) {
      if (window.DEBUG_APP) console.error("Decryption failed in Orchestrator:", error);
      return "";
    }
  }

  async generateRandomAppKey() {
    await delay(100);
    const randomMessage = generateRandomString();
    const randomPassword = generateRandomString();
    const keyString = await this.encryptMessage(randomMessage, randomPassword);
    return keyString;
  }
}
