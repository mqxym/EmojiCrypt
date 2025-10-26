/**
 * @file app.js
 * @description Main application entry point. Initializes orchestrators and the UI controllers.
 */

window.DEBUG_APP = false;

import { StorageService } from './modules/services/storageService.js';
import { KeyDerivationService } from './modules/deprecated/keyDerivationService.js';
import { EncryptionOrchestrator } from './modules/orchestrators/encryptionOrchestrator.js';
import { ConversionOrchestrator } from './modules/orchestrators/conversionOrchestrator.js';
import { EmojiService } from './modules/services/emojiService.js';
import { CryptoService } from './modules/services/cryptoService.js';
import { HashingService } from './modules/services/hashingService.js';
import { EMOJI_ARRAY } from './modules/constants.js';
import { createCryptit } from './lib/cryptit/cryptit.browser.min.js';

import { MainController } from './modules/controllers/mainController.js';

// Only instantiate what actually has state:
const storageService = new StorageService();
const keyDerivationService = new KeyDerivationService();
const cryptitInstanceEncryption = createCryptit({scheme: 1});

// Orchestrators
const encryptionOrchestrator = new EncryptionOrchestrator(
  keyDerivationService,
  CryptoService,
  EmojiService,
  HashingService,
  EMOJI_ARRAY,
  cryptitInstanceEncryption
);

const conversionOrchestrator = new ConversionOrchestrator(
  EmojiService,
  CryptoService,
  HashingService,
  EMOJI_ARRAY
);

// Main UI orchestrator
const mainController = new MainController(
  storageService,
  encryptionOrchestrator,
  conversionOrchestrator
);

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await mainController.initialize();
    if (window.DEBUG_APP) console.log("Application initialized successfully.");
  } catch (error) {
    if (window.DEBUG_APP) console.error("Failed to initialize application:", error);
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
