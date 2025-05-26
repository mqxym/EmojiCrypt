/**
 * @file HashingService
 * @description Provides hashing functionalities.
 */

/**
 * HashingService object literal.
 * @namespace HashingService
 */
export const HashingService = {
    /**
     * Helper function to compute a hash using the Web Crypto API.
     * @param {Uint8Array} data - The input data to hash.
     * @param {string} algorithm - The hash algorithm (e.g., 'SHA-256').
     * @returns {Promise<Uint8Array>} The hash as Uint8Array.
     * @memberof HashingService
     */
    async hashData(data, algorithm) {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        return new Uint8Array(hashBuffer);
    },

    /**
     * Generates a 256-bit key by hashing the input data with SHA-256.
     * @param {Uint8Array} data - The input data to hash.
     * @returns {Promise<Uint8Array>} The 256-bit key as Uint8Array.
     * @memberof HashingService
     */
    async generate256BitKey(data) {
        const hash = await this.hashData(data, 'SHA-256');
        return hash; // SHA-256 outputs 256 bits (32 bytes)
    }
};
