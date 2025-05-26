/**
 * @file KeyDerivationService
 * @description Service for deriving cryptographic keys.
 */

import { CASE_SALTS, INITIAL_HASH_SALTS } from './constants.js';
import { encodeUTF8, concatUint8Arrays } from './utils.js';
import { HashingService } from './hashingService.js';

export class KeyDerivationService {
    constructor() {
        // Constructor can be used for dependency injection if needed in a larger setup
    }

    /**
     * Calculates a security level based on the SHA-256 hash of the password.
     * @param {string} pass - The password input.
     * @returns {Promise<number>} The calculated security level.
     */
    async getSecLevel(pass) {
        const passBytes = encodeUTF8(pass);
        const hash = await HashingService.hashData(passBytes, 'SHA-256');
        let securitySum = 0;

        for (const byte of hash) {
            const highNibble = (byte >> 4) & 0xF;
            const lowNibble = byte & 0xF;

            [highNibble, lowNibble].forEach(nibble => {
                if (nibble >= 0 && nibble <= 3) {
                    securitySum += 5;
                } else if (nibble >= 4 && nibble <= 7) {
                    securitySum += 1;
                }
            });
        }
        return securitySum;
    }

    /**
     * Repeatedly hashes the seed using a combination of hash algorithms and custom salts. (Private Method)
     * @param {Uint8Array} seed - The seed binary data to hash.
     * @returns {Promise<Uint8Array>} The final hashed key as binary.
     */
    async _returnHash(seed) {
        let key = seed;
        const pastHashes = [];

        // Encode CASE_SALTS once
        const encodedCaseSalts = CASE_SALTS.map(s => encodeUTF8(s));

        for (const salt of INITIAL_HASH_SALTS) {
            const combined = concatUint8Arrays(key, encodeUTF8(salt));
            const hashed = await HashingService.hashData(combined, 'SHA-512');
            pastHashes.push(hashed);
        }

        const nibbles = [];
        for (const byte of seed) {
            nibbles.push((byte >> 4) & 0xF);
            nibbles.push(byte & 0xF);
        }

        for (const nibble of nibbles) {
            let hashInput;
            const caseSalt = encodedCaseSalts[nibble];

            switch (nibble) {
                case 0:
                case 1:
                case 2:
                case 3:
                    hashInput = concatUint8Arrays(key, caseSalt, pastHashes[0], pastHashes[1]);
                    key = await HashingService.hashData(hashInput, 'SHA-384');
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                    hashInput = concatUint8Arrays(key, caseSalt, pastHashes[0], pastHashes[1]);
                    key = await HashingService.hashData(hashInput, 'SHA-512');
                    break;
                case 8:
                case 9:
                case 10:
                case 15: // Case 15 also uses SHA-256
                    hashInput = concatUint8Arrays(key, caseSalt, pastHashes[0], pastHashes[1]);
                    key = await HashingService.hashData(hashInput, 'SHA-256');
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                    hashInput = concatUint8Arrays(key, caseSalt, pastHashes[0], pastHashes[1]);
                    key = await HashingService.hashData(hashInput, 'SHA-1');
                    break;
            }
            pastHashes.push(key);
            pastHashes.shift();
        }

        const finalHashInput = concatUint8Arrays(...pastHashes);
        const finalHash = await HashingService.hashData(finalHashInput, 'SHA-512');
        return finalHash;
    }

    /**
     * Generates 64 cryptographically secure salts using SHA-256 and a seed string.
     * @param {string} seed - The seed string used to generate salts.
     * @returns {Promise<Uint8Array[]>} An array of 64 salt Uint8Arrays.
     */
    async generate64Salts(seed) {
        if (typeof seed !== 'string' || seed.length === 0) {
            throw new Error('Seed must be a non-empty string.');
        }

        const numberOfSalts = 64;
        const saltPromises = [];

        for (let i = 0; i < numberOfSalts; i++) {
            const uniqueInput = `${seed}:${i}`;
            const encodedInput = encodeUTF8(uniqueInput);
            saltPromises.push(HashingService.hashData(encodedInput, 'SHA-256'));
        }
        return Promise.all(saltPromises);
    }

    /**
     * Generates a 4-kilobyte key by hashing input data with SHA-512 using provided salts. (Private Method)
     * @param {Uint8Array} data - The input data to hash.
     * @param {Uint8Array[]} salts - An array of Uint8Array salts.
     * @returns {Promise<Uint8Array>} The 4096-byte key as Uint8Array.
     */
    async _generate4kByteKey(data, salts) {
        if (!salts || salts.length !== 64) {
            throw new Error('Exactly 64 salts (as Uint8Arrays) are required.');
        }

        const hashPromises = salts.map(async (salt) => {
            const saltBytes = encodeUTF8(salt);
            const combined = concatUint8Arrays(data, saltBytes);
            return HashingService.hashData(combined, 'SHA-512');
        });

        const hashes = await Promise.all(hashPromises);
        return concatUint8Arrays(...hashes); // 64 salts * 64 bytes/SHA-512 hash = 4096 bytes
    }

    /**
     * Generates a set of cryptographic keys based on the input password string.
     * @param {string} keyInput - The password input string.
     * @param {Uint8Array | null} inputSalt - An optional 48-bit (6-byte) salt.
     * @returns {Promise<{ aesKey1: Uint8Array, aesKey2: Uint8Array, xorKey: Uint8Array, customSalt: Uint8Array }>} Derived keys.
     */
    async deriveCryptoKeys(keyInput, inputSalt = null) {
        console.log("Started Calculating Password Hash.");
        console.time("keyHash");

        const passBytes = encodeUTF8(keyInput);
        const hashPromises = [
            HashingService.hashData(passBytes, 'SHA-512'),
            HashingService.hashData(passBytes, 'SHA-256'),
            HashingService.hashData(passBytes, 'SHA-1'),
            HashingService.hashData(passBytes, 'SHA-384'),
        ];
        const hashes = await Promise.all(hashPromises);

        let customSalt;
        if (inputSalt) {
            customSalt = inputSalt;
        } else {
            customSalt = crypto.getRandomValues(new Uint8Array(6)); // 48-bit salt
        }
        hashes.push(customSalt);
        const seedHash = concatUint8Arrays(...hashes);

        let hashPass = await this._returnHash(seedHash);

        const securityLevelKeyBased = await this.getSecLevel(keyInput);
        const securityLevelSaltBased = customSalt[0]; // First byte of salt
        const securityLevelCombined = Math.floor((securityLevelKeyBased + securityLevelSaltBased) / 2);
        const securityLevel = 383 + securityLevelCombined - 121;

        for (let i = 0; i < securityLevel; i++) {
            const iterationInput = concatUint8Arrays(
                hashPass,
                new Uint8Array([
                    (i * 31) & 0xFF,
                    (i * 41 >> 8) & 0xFF,
                    (i * 51 >> 16) & 0xFF,
                    (i * 92 >> 24) & 0xFF
                ]),
                customSalt
            );
            hashPass = await this._returnHash(iterationInput);
        }

        const aesKey1 = await HashingService.generate256BitKey(hashPass);

        for (let i = 0; i < 15; i++) {
            const iterationInput = concatUint8Arrays(
                hashPass,
                new Uint8Array([
                    (i * 420) & 0xFF,
                    (i * 420 >> 8) & 0xFF,
                    (i * 420 >> 16) & 0xFF,
                    (i * 420 >> 24) & 0xFF
                ]),
                customSalt
            );
            hashPass = await this._returnHash(iterationInput);
        }
        const aesKey2 = await HashingService.generate256BitKey(hashPass);

        for (let i = 0; i < 15; i++) {
            const iterationInput = concatUint8Arrays(
                hashPass,
                new Uint8Array([
                    (i * 99) & 0xFF,
                    (i * 99 >> 8) & 0xFF,
                    (i * 99 >> 16) & 0xFF,
                    (i * 99 >> 24) & 0xFF
                ]),
                customSalt
            );
            hashPass = await this._returnHash(iterationInput);
        }

        
        const xorKeySalts = await this.generate64Salts("Today is not the day I learned to code.");
        const xorKey = await this._generate4kByteKey(hashPass, xorKeySalts);
        console.timeEnd("keyHash");
        return { aesKey1, aesKey2, xorKey, customSalt };
       
    }
}
