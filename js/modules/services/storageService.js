/**
 * @file StorageService
 * @description Handles encrypted key storage, plain text preferences, and data migration.
 */

import { CryptoService } from '../services/cryptoService.js'
import { HashingService } from './../services/hashingService.js';
import { encodeUTF8, decodeUTF8 } from '../utils.js';

export class StorageService {
    constructor() {
        this.storageEncryptionKeyUtf8 = 'MBiqUOUsyCEMbLEwsLEmEtr';
        this.encryptionKey = null; // Will be set asynchronously
    }

    /**
     * A private helper method to prepare and cache the AES key for localStorage encryption.
     * @returns {Promise<Uint8Array>} The AES encryption key.
     */
    async _getEncryptionKey() {
        if (!this.encryptionKey) {
            const keyBytes = encodeUTF8(this.storageEncryptionKeyUtf8);
            this.encryptionKey = await HashingService.hashData(keyBytes, 'SHA-256');
        }
        return this.encryptionKey;
    }

    // --- Key Storage Methods (Encrypted) ---

    /**
     * Saves an encrypted key to a specific slot in localStorage.
     * @param {number} slot - The slot number (1-5).
     * @param {string} keyData - The key data string to encrypt and save.
     * @throws {Error} If slot is invalid.
     */
    async saveKey(slot, keyData) {
        if (slot < 1 || slot > 5) {
            throw new Error("Slot must be an integer between 1 and 5.");
        }
        const aesKey = await this._getEncryptionKey();
        const dataToEncryptBytes = encodeUTF8(keyData);
        const encryptedDataBytes = await CryptoService.aesGcmEncrypt(aesKey, dataToEncryptBytes);
        // Convert Uint8Array to a string of characters, then to Base64
        const encryptedBase64 = btoa(String.fromCharCode(...encryptedDataBytes));
        localStorage.setItem('nKey' + slot, encryptedBase64);
    }

    /**
     * Reads and decrypts a key from a specific slot in localStorage.
     * @param {number} slot - The slot number (1-5).
     * @returns {Promise<string|null>} The decrypted key data string, or null if not found or decryption fails.
     * @throws {Error} If slot is invalid.
     */
    async readKey(slot) {
        if (slot < 1 || slot > 5) {
            throw new Error("Slot must be an integer between 1 and 5.");
        }
        const aesKey = await this._getEncryptionKey();
        const encryptedBase64 = localStorage.getItem('nKey' + slot);

        if (!encryptedBase64) {
            if (window.DEBUG_APP) console.warn(`No data found for nKey${slot}`);
            return null;
        }

        try {
            // Convert Base64 string back to Uint8Array
            const encryptedDataBytes = Uint8Array.from(atob(encryptedBase64), char => char.charCodeAt(0));
            const decryptedBytes = await CryptoService.aesGcmDecrypt(aesKey, encryptedDataBytes);
            return decodeUTF8(decryptedBytes);
        } catch (error) {
            if (window.DEBUG_APP) console.error(`Failed to decrypt nKey${slot}:`, error);
            return null;
        }
    }

    // --- Preferences Storage Methods (Plain Text) ---

    setItem(key, value) {
        localStorage.setItem(key, value);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }

    removeItem(key) {
        localStorage.removeItem(key);
    }

    getDarkMode() {
        return this.getItem('nDarkMode') === 'true';
    }

    setDarkMode(value) {
        this.setItem('nDarkMode', value ? 'true' : 'false');
    }

    getLanguage() {
        return this.getItem('nLang');
    }

    setLanguage(value) {
        this.setItem('nLang', value);
    }

    getLastSite() {
        return this.getItem('nLastSite');
    }

    setLastSite(value) {
        this.setItem('nLastSite', value);
    }

    getPrivateAlgorithmId() {
        return this.getItem('nPa');
    }

    setPrivateAlgorithmId(id) {
        this.setItem('nPa', id);
    }

    removePrivateAlgorithmId() {
        this.removeItem('nPa');
    }
    
    getInformationHidden() {
        return this.getItem('nInformationHidden') === 'true';
    }

    setInformationHidden(value) {
        this.setItem('nInformationHidden', value ? 'true' : 'false');
    }

    // --- Migration Methods ---

    /**
     * Encrypts old unencrypted keys stored in localStorage.
     */
    async encryptOldKeys() {
        if (window.DEBUG_APP) console.log("Attempting to encrypt old keys...");
        const aesKey = await this._getEncryptionKey();
        for (let slot = 1; slot <= 5; slot++) {
            const oldKeyData = localStorage.getItem('key' + slot);
            if (oldKeyData) {
                try {
                    if (window.DEBUG_APP) console.log(`Found old key in slot ${slot}. Encrypting...`);
                    const dataToEncryptBytes = encodeUTF8(oldKeyData);
                    const encryptedDataBytes = await CryptoService.aesGcmEncrypt(aesKey, dataToEncryptBytes);
                    const encryptedBase64 = btoa(String.fromCharCode(...encryptedDataBytes));
                    localStorage.setItem('nKey' + slot, encryptedBase64);
                    localStorage.removeItem('key' + slot);
                    if (window.DEBUG_APP) console.log(`Successfully encrypted and migrated key for slot ${slot}.`);
                } catch (error) {
                    if (window.DEBUG_APP) console.error(`Error encrypting key for slot ${slot}:`, error);
                }
            }
        }
    }

    /**
     * Migrates old localStorage keys to new prefixed keys.
     * @param {string[]} keysToMigrateArray - Array of old key names to migrate.
     */
    migrateLocalStorageKeys(keysToMigrateArray) {
        if (window.DEBUG_APP) console.log("Attempting to migrate localStorage keys...");
        keysToMigrateArray.forEach(oldKey => {
            const value = localStorage.getItem(oldKey);
            if (value !== null) {
                const newKey = `n${oldKey.charAt(0).toUpperCase()}${oldKey.slice(1)}`;
                localStorage.setItem(newKey, value);
                localStorage.removeItem(oldKey);
                if (window.DEBUG_APP) console.log(`Migrated '${oldKey}' to '${newKey}'.`);
            }
        });
    }
}
