/**
 * @file privateAlgorithmController.js
 * @description Handles private algorithm ID, link, and emoji permutation state.
 */

import { generateSecureRandomString } from '../utils.js';
import { EmojiService } from '../services/emojiService.js';
import { EMOJI_ARRAY } from '../constants.js';

export class PrivateAlgorithmController {
  constructor(main, storageService) {
    this.main = main;
    this.storageService = storageService;

    this.$ = {
      privateAlgorithmSection: $('#privateAlgorithmSection'),
      generatePrivateConversionButton: $('#generatePrivateConversionButton'),
      privateLinkText: $('#privateLinkText'),
      privateConversionLink: $('#privateConversionLink'),
      copyPrivateConversionLink: $('#copyPrivateConversionLink'),
      disablePrivateConversionButton: $('#disablePrivateConversionButton'),
      convertTopMessage: $('#convertTopMessage'),
      convertSimpleEncryptionSection: $('#convertSimpleEncryptionSection'),
      doSimpleEncryptionCheckbox: $('#doSimpleEncryption'),
    };
  }

  _copy(element, buttonElement, successTextKey, useStaticSuccessSymbol = true, checkCondition = true) {
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

  async updateFromUrlIfNeeded() {
    // Preserve original: only act if current menu is convertSection
    if (this.main.state.currentMenu !== 'convertSection') {
      return;
    }

    let idFromUrl = new URLSearchParams(window.location.search).get('id');
    const idFromStorage = this.storageService.getPrivateAlgorithmId();

    if (idFromUrl && (typeof idFromUrl !== 'string' || idFromUrl.length <= 5)) {
      if (window.DEBUG_APP) console.warn(`Ignoring short/invalid 'id' parameter from URL: ${idFromUrl}`);
      idFromUrl = null;
    }

    let potentialId = idFromUrl;
    if (!potentialId && idFromStorage) {
      if (typeof idFromStorage === 'string' && idFromStorage.length > 5) {
        potentialId = idFromStorage;
      } else if (idFromStorage) {
        this.storageService.removePrivateAlgorithmId();
      }
    }

    const prevId = this.main.state.privateConversionId;
    this.main.state.privateConversionId = potentialId || null;

    if (this.main.state.privateConversionId) {
      if (idFromUrl && idFromUrl !== idFromStorage) {
        this.storageService.setPrivateAlgorithmId(idFromUrl);
      }
      this.main.state.customEmojiArray = await EmojiService.generateSecurePermutationFromString(
        this.main.state.privateConversionId,
        EMOJI_ARRAY
      );

      // Compose visible link
      const paramName = 'convert';
      let linkURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${paramName}`;
      if (this.main.state.languageCode !== 'en') linkURL += `&lang=${this.main.state.languageCode}`;
      linkURL += `&id=${this.main.state.privateConversionId}`;
      this.$.privateConversionLink.val(linkURL);

      // Show related UI
      this.$.convertTopMessage.removeClass('d-none').html(this.main.language.translate('privateAlgorithmHeader'));
      this.$.disablePrivateConversionButton.removeClass('d-none');
      this.$.convertSimpleEncryptionSection.removeClass('d-none');
      this.$.privateAlgorithmSection.collapse('show');

      this.main.view.updateNavigationLinks();
      this.main.view.updateLanguageMenuLinks();
    } else {
      const idChanged = prevId !== null;
      this.main.state.customEmojiArray = null;
      this.main.state.privateConversionId = null;
      this.$.privateConversionLink.val('');
      this.$.convertTopMessage.addClass('d-none');
      this.$.disablePrivateConversionButton.addClass('d-none');
      this.$.convertSimpleEncryptionSection.addClass('d-none');
      this.$.privateAlgorithmSection.collapse('hide');

      if (idChanged) {
        this.main.view.updateNavigationLinks();
        this.main.view.updateLanguageMenuLinks();
      }
    }
  }

  async _onGenerateClick() {
    const $button = this.$.generatePrivateConversionButton;
    if (this.main.state.actionInProgress) return;
    this.main.state.actionInProgress = true;
    const defaultKey = 'generatePrivateConversionButton';
    this.main.setButtonState($button, 'btnGeneratingAlgorithm', 'loading', 3000, defaultKey);

    try {
      this.main.state.privateConversionId = generateSecureRandomString();
      this.$.doSimpleEncryptionCheckbox.prop('checked', true);
      this.main.state.customEmojiArray = await EmojiService.generateSecurePermutationFromString(
        this.main.state.privateConversionId, EMOJI_ARRAY
      );

      this.storageService.setPrivateAlgorithmId(this.main.state.privateConversionId);
      this.main.view.updateURLParameter();
      this.main.view.updateNavigationLinks();
      this.main.view.updateLanguageMenuLinks();

      this.$.privateConversionLink.val(window.location.href);
      this.$.disablePrivateConversionButton.removeClass('d-none');
      this.$.convertSimpleEncryptionSection.removeClass('d-none');
      this.$.convertTopMessage.removeClass('d-none').html(this.main.language.translate('privateAlgorithmHeader'));

      this.main.setButtonState($button, 'btnPrivateAlgorithmGenerated', 'success', 2000, defaultKey);
    } catch (err) {
      if (window.DEBUG_APP) console.error("Error in _onGenerateClick:", err);
      this.main.setButtonState($button, 'errorGeneral', 'error', 2000, defaultKey);
    }
  }

  async _onDisableClick() {
    if (!this.main.state.customEmojiArray) return;

    if (confirm(this.main.language.translate('modalDisablePrivateAlgorithm'))) {
      const $button = this.$.disablePrivateConversionButton;
      const defaultKey = 'disablePrivateConversionButton';

      if (this.main.state.actionInProgress) return;
      this.main.state.actionInProgress = true;

      try {
        this.$.doSimpleEncryptionCheckbox.prop("checked", false);
        this.storageService.removePrivateAlgorithmId();
        this.main.state.privateConversionId = null;
        this.main.state.customEmojiArray = null;
        this.main.view.updateURLParameter();
        this.main.view.updateNavigationLinks();
        this.main.view.updateLanguageMenuLinks();

        this.$.privateConversionLink.val('');
        this.$.convertTopMessage.addClass('d-none');
        this.$.convertSimpleEncryptionSection.addClass('d-none');

        this.main.setButtonState($button, 'btnPrivateAlgorithmRemoved', 'success', 2000, defaultKey);

        setTimeout(() => $button.addClass('d-none'), 2000);
      } catch (err) {
        if (window.DEBUG_APP) console.error("Error in _onDisableClick:", err);
        this.main.setButtonState($button, 'errorGeneral', 'error', 2000, defaultKey);
      }
    }
  }

  registerHandlers() {
    this.$.generatePrivateConversionButton.click(() => this._onGenerateClick());
    this.$.disablePrivateConversionButton.click(() => this._onDisableClick());
    this.$.copyPrivateConversionLink.click(() =>
      this._copy(
        this.$.privateConversionLink[0],
        this.$.copyPrivateConversionLink,
        'copyPrivateConversionLink',
        true,
        !!this.main.state.privateConversionId
      )
    );
  }
}
