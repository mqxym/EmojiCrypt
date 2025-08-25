/**
 * @file languageController.js
 * @description Handles language initialization, translations, and language menu interactions.
 */

import * as LanguageService from '../services/languageService.js';

export class LanguageController {
  constructor(main) {
    this.main = main;

    // Text-bearing selectors (kept same ids/classes)
    this.textEls = [
      { selector: $('#navbarBrand'), key: 'navbarBrand' },
      { selector: $('#chooseAppMenu'), key: 'chooseAppMenu' },
      { selector: $('#encryptMenu'), key: 'encryptMenu' },
      { selector: $('#convertMenu'), key: 'convertMenu' },
      { selector: $('#aboutMenu'), key: 'aboutMenu' },
      { selector: $('#clearEncryptInputButton'), key: 'clearEncryptInputButton' },
      { selector: $('#copyKeyButton'), key: 'copyKeyButton' },
      { selector: $('#keyInstructions'), key: 'keyInstructions' },
      { selector: $('#loadKeyButton'), key: 'loadKeyButton' },
      { selector: $('#saveKeyButton'), key: 'saveKeyButton' },
      { selector: $('#copyEncryptOutputButton'), key: 'copyEncryptOutputButton' },
      { selector: $('#clearConvertInputButton'), key: 'clearConvertInputButton' },
      { selector: $('#copyConvertOutputButton'), key: 'copyConvertOutputButton' },
      { selector: $('#privateLinkText'), key: 'privateLinkText' },
      { selector: $('#copyPrivateConversionLink'), key: 'copyPrivateConversionLink' },
      { selector: $('#disablePrivateConversionButton'), key: 'disablePrivateConversionButton' },
      { selector: $('#privateAlgorithmDisclaimer'), key: 'privateAlgorithmDisclaimer' },
      { selector: $('#generatePrivateConversionButton'), key: 'generatePrivateConversionButton' },
      { selector: $('#privateAlgorithmFooter'), key: 'privateAlgorithmFooter' },
      { selector: $('#showPrivateAlgorithmButton'), key: 'showPrivateAlgorithmButton' },
      { selector: $('#convertTopMessage'), key: 'privateAlgorithmHeader' },
      { selector: $('#btnGoToConvert'), key: 'btnGoToConvert' },
      { selector: $('#btnGoToEncrypt'), key: 'btnGoToEncrypt' },
      { selector: $('#informationTabHeader'), key: 'informationTabHeader' },
      { selector: $('#convertTabHeader'), key: 'convertTabHeader' },
      { selector: $('#encryptTabHeader'), key: 'encryptTabHeader' },
      { selector: $('#moreTabHeader'), key: 'moreTabHeader' },
      { selector: $('#informationTabDescription'), key: 'informationTabDescription' },
      { selector: $('#convertTabDescription'), key: 'convertTabDescription' },
      { selector: $('#encryptTabDescription'), key: 'encryptTabDescription' },
      { selector: $('#moreTabDescription'), key: 'moreTabDescription' },
      { selector: $('#informationTabSubDescription'), key: 'informationTabSubDescription' },
      { selector: $('#btnAdvancedEncryption'), key: 'btnAdvancedEncryption' },
      { selector: $('#simpleEncryptionText'), key: 'simpleEncryptionText' },
    ];

    this.placeholderEls = [
      { selector: $('#encryptMessageInput'), key: 'encryptMessageInput' },
      { selector: $('#keyInput'), key: 'keyInput' },
      { selector: $('#encryptOutputTextarea'), key: 'encryptOutputTextarea' },
      { selector: $('#convertMessageInput'), key: 'convertMessageInput' },
      { selector: $('#convertOutputTextarea'), key: 'convertOutputTextarea' },
    ];

    this.$languageMenuItems = $('#languageMenuItems');
    this.$darkModeMenu = $('#darkModeMenu');
    this.$encryptDecryptButton = $('#encryptDecryptButton');
    this.$convertButton = $('#convertButton');
    this.$loadKeyButton = $('#loadKeyButton');
    this.$saveKeyButton = $('#saveKeyButton');
    this.$genPrivateBtn = $('#generatePrivateConversionButton');
    this.$disablePrivateBtn = $('#disablePrivateConversionButton');
  }

  // Expose translate so other controllers can fetch strings
  translate(key) {
    return LanguageService.getTranslation(key, this.main.state.languageIndex);
  }

  getLanguageCodeFromURL() {
    return LanguageService.getLanguageCodeFromURL();
  }

  applyLanguageCode(newLangCode) {
    this.main.storageService.setLanguage(newLangCode);
    this.main.state.languageCode = newLangCode;
    this.main.state.languageIndex = LanguageService.getLanguageIndexFromCode(newLangCode);
    this.updateUILanguage();
  }

  initialize() {
    const { languageCode, languageIndex } = LanguageService.initializeLanguage(this.main.storageService);
    this.main.state.languageCode = languageCode;
    this.main.state.languageIndex = languageIndex;
    this.updateUILanguage();
  }

  updateUILanguage() {
    // Update text elements
    this.textEls.forEach(el => el.selector.html(this.translate(el.key)));
    this.placeholderEls.forEach(el => el.selector.attr('placeholder', this.translate(el.key)));

    // Dark mode menu label reflects current preference
    const darkKey = this.main.darkMode.isDarkModeEnabled() ? 'disableDarkMode' : 'enableDarkMode';
    this.$darkModeMenu.html(this.translate(darkKey));

    // Buttons whose labels participate in button-state machine
    this.$encryptDecryptButton
      .html(this.translate('encryptDecryptButton'))
      .data('original-text-key', 'encryptDecryptButton');

    this.$convertButton
      .html(this.translate('convertButton'))
      .data('original-text-key', 'convertButton');

    this.$loadKeyButton
      .html(this.translate('loadKeyButton'))
      .data('original-text-key', 'loadKeyButton');

    this.$saveKeyButton
      .html(this.translate('saveKeyButton'))
      .data('original-text-key', 'saveKeyButton');

    this.$genPrivateBtn
      .html(this.translate('generatePrivateConversionButton'))
      .data('original-text-key', 'generatePrivateConversionButton');

    this.$disablePrivateBtn
      .html(this.translate('disablePrivateConversionButton'))
      .data('original-text-key', 'disablePrivateConversionButton');

    // FAQ loop (preserve original behavior)
    for (let i = 1; i <= 26; i++) {
      $(`#faqQuestion${i}`).html(this.translate(`faqQuestion${i}`));
      $(`#faqAnswer${i}`).html(this.translate(`faqAnswer${i}`));
      $(`#faqEncryptionQuestion${i}`).html(this.translate(`faqQuestion${i}`));
      $(`#faqEncryptionAnswer${i}`).html(this.translate(`faqAnswer${i}`));
      $(`#faqConversionQuestion${i}`).html(this.translate(`faqQuestion${i}`));
      $(`#faqConversionAnswer${i}`).html(this.translate(`faqAnswer${i}`));
    }

    // Keep nav & language links in sync post-translation
    this.main.view.updateNavigationLinks();
    this.main.view.updateLanguageMenuLinks();
  }

  registerHandlers() {
    // Language menu click
    this.$languageMenuItems.on('click', 'a.dropdown-item[data-lang-code]', (e) => {
      e.preventDefault();
      const $el = $(e.currentTarget);
      const href = $el.attr('href');
      const newLangCode = $el.attr('data-lang-code');
      if (typeof href !== 'string' || !href) return;

      this.applyLanguageCode(newLangCode);
      this.main.view.updateMetadata();
      window.history.pushState(null, '', href);
    });
  }
}
