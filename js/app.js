/**
 * @file app.js
 * @description Main application entry point. Initializes services, orchestrators, and UI.
 */

// 1. Import all necessary modules
import { StorageService } from './modules/storageService.js';
import { HashingService } from './modules/hashingService.js';
import { CryptoService } from './modules/cryptoService.js';
import { EmojiService } from './modules/emojiService.js';
import { KeyDerivationService } from './modules/keyDerivationService.js';
import { EncryptionOrchestrator } from './modules/encryptionOrchestrator.js';
import { ConversionOrchestrator } from './modules/conversionOrchestrator.js';
import * as LanguageServiceFunctions from './modules/languageService.js';
import { UIManager } from './modules/uiManager.js';
import { EMOJI_ARRAY } from './modules/constants.js'; 
import { 
    encodeUTF8, 
    decodeUTF8, 
    generateRandomString, 
    concatUint8Arrays, 
    extractEmojis, 
    checkInputString, 
    getEmojiRegex,
    countEmojisAndNonEmojis,
    generateSecureRandomString,
    getVersion 
} from './modules/utils.js'; 

// 2. Instantiate Services
const storageService = new StorageService();
const hashingService = HashingService; 
const cryptoService = CryptoService;   
const emojiService = EmojiService;       
const keyDerivationService = new KeyDerivationService();

// Group LanguageService functions
const languageService = {
    getTranslation: LanguageServiceFunctions.getTranslation,
    initializeLanguage: LanguageServiceFunctions.initializeLanguage,
    LANGUAGES_CONFIG: LanguageServiceFunctions.LANGUAGES_CONFIG,
    getLanguageCodeFromURL: LanguageServiceFunctions.getLanguageCodeFromURL,
    getUserLanguageCode: LanguageServiceFunctions.getUserLanguageCode,
    getLanguageIndexFromCode: LanguageServiceFunctions.getLanguageIndexFromCode
};

// 3. Create Consolidated Utility Object
const utils = {
    encodeUTF8,
    decodeUTF8,
    generateRandomString,
    concatUint8Arrays,
    extractEmojis,
    checkInputString,
    getEmojiRegex,
    countEmojisAndNonEmojis,
    generateSecureRandomString,
    getVersion
};

// 4. Instantiate Orchestrators
const encryptionOrchestrator = new EncryptionOrchestrator(
    keyDerivationService,
    cryptoService,
    emojiService,
    hashingService,
    utils,          // Pass consolidated utils object
    EMOJI_ARRAY     // Pass EMOJI_ARRAY directly
);

const conversionOrchestrator = new ConversionOrchestrator(
    emojiService,
    cryptoService,
    hashingService,
    utils,          // Pass consolidated utils object
    EMOJI_ARRAY     // Pass EMOJI_ARRAY directly
);

// 5. Instantiate UIManager
// UIManager constructor: storageService, encryptionOrchestrator, conversionOrchestrator, 
// emojiService, languageService (object), utils (object), emojiArrayConstant (direct)
const uiManager = new UIManager(
    storageService,
    encryptionOrchestrator,
    conversionOrchestrator,
    emojiService,
    languageService, 
    utils,          // Pass consolidated utils object
    EMOJI_ARRAY     // Pass EMOJI_ARRAY directly
);

// 6. Initialize the Application
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await uiManager.initialize();
        console.log("Application initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize application:", error);
        const errorDiv = document.getElementById('errorHeader') || document.createElement('div');
        if (!document.getElementById('errorHeader')) {
            errorDiv.id = 'errorHeader';
            errorDiv.className = 'p-2 m-3 bg-danger border rounded rounded-sm text-light';
            document.body.insertBefore(errorDiv, document.body.firstChild);
        }
        errorDiv.innerHTML = 'Critical Error: Application could not start. Please try refreshing. If the problem persists, contact support.';
        errorDiv.classList.remove('d-none');
    }
});
