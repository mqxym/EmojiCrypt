/**
 * @file mainController.js
 * @description Orchestrates sub-controllers formerly in UIManager, preserving behavior.
 */

import { ViewController } from './viewController.js';
import { DarkModeController } from './darkModeController.js';
import { LanguageController } from './languageController.js';
import { EncryptionController } from './encryptionController.js';
import { ConversionController } from './conversionController.js';
import { KeyController } from './keyController.js';
import { PrivateAlgorithmController } from './privateAlgorithmController.js';

export class MainController {
  constructor(storageService, encryptionOrchestrator, conversionOrchestrator) {
    this.storageService = storageService;
    this.encryptionOrchestrator = encryptionOrchestrator;
    this.conversionOrchestrator = conversionOrchestrator;

    // Shared state (matches previous UIManager semantics)
    this.state = {
      currentMenu: '',
      menuOrder: ['encryptSection', 'convertSection', 'aboutSection'],
      languageCode: 'en',
      languageIndex: 0,
      privateConversionId: null,
      customEmojiArray: null,
      actionInProgress: false
    };

    // Sub-controllers
    this.view = new ViewController(this);
    this.darkMode = new DarkModeController(this);
    this.language = new LanguageController(this);
    this.encryption = new EncryptionController(this, encryptionOrchestrator);
    this.conversion = new ConversionController(this, conversionOrchestrator);
    this.keys = new KeyController(this, storageService);
    this.privateAlgo = new PrivateAlgorithmController(this, storageService);
  }

  // === Initialization ===
  async initialize() {
    // Migrate & encrypt storage (unchanged behavior)
    this.storageService.migrateLocalStorageKeys(['pa', 'lang', 'darkMode', 'lastSite', 'informationHidden']);
    await this.storageService.encryptOldKeys();

    // Language bootstrapping (sets state.languageCode / languageIndex and fills UI)
    this.language.initialize();

    // Crypto support banner
    this._handleCryptoSupport();

    // View bootstrapping: which section, positions, metadata, url param, version footer
    this.state.currentMenu = this.view.getSectionFromURL();
    this.view.setInitialSectionPositions();
    this.view.updateMetadata();
    await this.privateAlgo.updateFromUrlIfNeeded();
    this.view.updateURLParameter();
    this.view.setVersionFooter();

    // Info banner visibility (unchanged)
    if (this.storageService.getInformationHidden()) {
      this.view.hideInformation();
    }

    // Darkmode (exact same logic path)
    if (this.darkMode.isDarkModeEnabled()) {
      this.darkMode.enable(false);
    } else {
      this.darkMode.setAutoDarkMode();
    }

    // Wire up events
    this.view.registerHandlers();
    this.language.registerHandlers();
    this.darkMode.registerHandlers();
    this.encryption.registerHandlers();
    this.conversion.registerHandlers();
    this.keys.registerHandlers();
    this.privateAlgo.registerHandlers();

    // Initial nav/link updates that depend on multiple controllers
    this.view.updateNavigationLinks();
    this.view.updateLanguageMenuLinks();
    if (window.DEBUG_APP) console.log('MainController initialized');
  }

  _handleCryptoSupport() {
    if (!window.crypto || !window.crypto.subtle) {
      $('#errorHeader').removeClass('d-none');
    }
  }

  copy(element, buttonElement, successTextKey, useStaticSuccessSymbol = true, checkCondition = true) {
    if (!checkCondition) {
      this.main.setButtonState(buttonElement, 'error', 'error', 2000);
      return;
    }
    element.select();
    document.execCommand('copy');
    element.setSelectionRange(0, 0);
    window.getSelection().removeAllRanges();
    if (element.blur) element.blur();

    const originalText = buttonElement.html();
    const successSymbol = "✅";
    buttonElement.html(successSymbol);
    setTimeout(() => buttonElement.html(originalText), 2000);
  }

  // === Shared UI helper (kept verbatim behavior) ===
  setButtonState(buttonElement, textKeyForCurrentDisplay, state = 'default', duration = 3000, baseDefaultTextKey = null) {
    // Store original key if provided
    if (baseDefaultTextKey) {
      buttonElement.data('original-text-key', baseDefaultTextKey);
    }
    const storedDefaultTextKey = buttonElement.data('original-text-key');

    buttonElement.removeClass('custom-red-border custom-green-border');

    let textToDisplay;
    if (state === 'default') {
      const keyToUseForDefault = storedDefaultTextKey || textKeyForCurrentDisplay;
      if (!keyToUseForDefault) {
        if (window.DEBUG_APP) console.error("CRITICAL: No key for default state.", buttonElement);
        textToDisplay = "Error";
      } else {
        textToDisplay = this.language.translate(keyToUseForDefault);
      }
    } else {
      textToDisplay = this.language.translate(textKeyForCurrentDisplay);
    }

    if (state === 'success') buttonElement.addClass('custom-green-border');
    if (state === 'error') buttonElement.addClass('custom-red-border');

    buttonElement.html(textToDisplay);

    if (state === 'success' || state === 'error') {
      setTimeout(() => {
        if (storedDefaultTextKey) {
          buttonElement.html(this.language.translate(storedDefaultTextKey));
        } else {
          if (window.DEBUG_APP) console.warn("No 'original-text-key' set; falling back.", buttonElement);
          buttonElement.html(this.language.translate(textKeyForCurrentDisplay));
        }
        buttonElement.removeClass('custom-red-border custom-green-border');
        this.state.actionInProgress = false;
      }, duration);
    } else if (state === 'default') {
      this.state.actionInProgress = false;
    }
  }
}
