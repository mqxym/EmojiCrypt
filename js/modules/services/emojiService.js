/**
 * @file EmojiService
 * @description Provides functionalities for mapping bytes to symbols (emojis) and generating secure permutations.
 */

import { encodeUTF8 } from '../utils.js';

/**
 * EmojiService object literal.
 * @namespace EmojiService
 */
export const EmojiService = {
    /**
     * Maps a byte array to an array of symbols based on the provided unique symbols array.
     * @param {Array} byteArray - The array of bytes to map.
     * @param {Array} uniqueSymbols - The array of unique symbols representing the base.
     * @returns {Array} The resulting array of symbols.
     * @memberof EmojiService
     */
    mapBytesToSymbols(byteArray, uniqueSymbols) {
        const base = uniqueSymbols.length;
        let bigIntValue = BigInt(0);

        for (let byte of byteArray) {
            bigIntValue = (bigIntValue * 256n) + BigInt(byte);
        }

        const symbols = [];
        if (bigIntValue === 0n && byteArray.length > 0) { // Handle case where byteArray might be [0] or [0,0] etc.
             if (uniqueSymbols.length > 0) {
                symbols.unshift(uniqueSymbols[0]);
             } else {
                return []; // Or throw error, depending on desired behavior for empty uniqueSymbols
             }
        } else {
            while (bigIntValue > 0n) {
                const symbolIndex = Number(bigIntValue % BigInt(base));
                symbols.unshift(uniqueSymbols[symbolIndex]);
                bigIntValue = bigIntValue / BigInt(base);
            }
        }
        return symbols;
    },

    /**
     * Maps an array of symbols to a byte array based on the provided unique symbols array.
     * @param {Array} symbolArray - The array of symbols to map.
     * @param {Array} uniqueSymbols - The array of unique symbols representing the base.
     * @returns {Array} The resulting byte array.
     * @throws {Error} If a symbol in symbolArray is not found in uniqueSymbols.
     * @memberof EmojiService
     */
    mapSymbolsToBytes(symbolArray, uniqueSymbols) {
        const base = uniqueSymbols.length;
        let bigIntValue = BigInt(0);

        for (let symbol of symbolArray) {
            const symbolIndex = uniqueSymbols.indexOf(symbol);
            if (symbolIndex === -1) {
                throw new Error(`Symbol ${symbol} not found in uniqueSymbols array.`);
            }
            bigIntValue = bigIntValue * BigInt(base) + BigInt(symbolIndex);
        }

        const byteArray = [];
         if (bigIntValue === 0n && symbolArray.length > 0) { // Handle case where symbolArray might be [uniqueSymbols[0]]
            byteArray.unshift(0);
        } else {
            while (bigIntValue > 0n) {
                byteArray.unshift(Number(bigIntValue % 256n));
                bigIntValue = bigIntValue / 256n;
            }
        }
        return byteArray;
    },

    /**
     * Generates a cryptographically secure permutation of symbols based on a binary input array.
     * This function uses the SHA-256 hashing algorithm directly via `crypto.subtle.digest`.
     * @param {Uint8Array} inputBytes - The input binary array used to seed the permutation generation.
     * @param {Array<string>} symbolsArray - An array of symbols to be permuted.
     * @returns {Promise<Array<string>>} A promise that resolves to the securely permuted array of symbols.
     * @memberof EmojiService
     */
    async generateSecurePermutation(inputBytes, symbolsArray) {
        const seedHashBuffer = await crypto.subtle.digest('SHA-256', inputBytes);
        const seedHash = new Uint8Array(seedHashBuffer);

        const symbolHashes = await Promise.all(symbolsArray.map(async (symbol, index) => {
            const indexBuffer = new ArrayBuffer(4);
            new DataView(indexBuffer).setUint32(0, index, false); // false for big-endian
            const indexBytes = new Uint8Array(indexBuffer);

            const data = new Uint8Array(seedHash.length + indexBytes.length);
            data.set(seedHash);
            data.set(indexBytes, seedHash.length);

            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            return { symbol, hash: new Uint8Array(hashBuffer) };
        }));

        symbolHashes.sort((a, b) => {
            const hashA = a.hash;
            const hashB = b.hash;
            for (let i = 0; i < hashA.length; i++) {
                if (hashA[i] !== hashB[i]) {
                    return hashA[i] - hashB[i];
                }
            }
            return 0;
        });

        return symbolHashes.map(item => item.symbol);
    },

    /**
     * Generates a cryptographically secure permutation of symbols based on an input string.
     * @param {string} inputString - The input string used to seed the permutation generation.
     * @param {Array<string>} symbolsArray - An array of symbols to be permuted.
     * @returns {Promise<Array<string>>} A promise that resolves to the securely permuted array of symbols.
     * @memberof EmojiService
     */
    async generateSecurePermutationFromString(inputString, symbolsArray) {
        const inputBytes = encodeUTF8(inputString); // Using imported encodeUTF8
        return this.generateSecurePermutation(inputBytes, symbolsArray); // Calling internal method
    }
};
