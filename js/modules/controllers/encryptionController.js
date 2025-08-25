/**
 * @file encryptionController.js
 * @description Handles Encrypt/Decrypt screen actions.
 */

import { checkInputString } from '../utils.js';

export class EncryptionController {
  constructor(main, encryptionOrchestrator) {
    this.main = main;
    this.orchestrator = encryptionOrchestrator;

    this.$ = {
      encryptMessageInput: $('#encryptMessageInput'),
      clearEncryptInputButton: $('#clearEncryptInputButton'),
      keyInput: $('#keyInput'),
      generateKeyButton: $('#generateKeyButton'),
      copyKeyButton: $('#copyKeyButton'),
      keySlotSelect: $('#keySlotSelect'),
      encryptDecryptButton: $('#encryptDecryptButton'),
      encryptOutputTextarea: $('#encryptOutputTextarea'),
      copyEncryptOutputButton: $('#copyEncryptOutputButton'),
    };
  }

  async _onEncryptDecryptClick() {
    if (this.main.state.actionInProgress) return;
    this.main.state.actionInProgress = true;

    const $button = this.$.encryptDecryptButton;
    const defaultKey = 'encryptDecryptButton';
    const inputText = this.$.encryptMessageInput.val();

    if (!inputText) {
      this.main.setButtonState($button, 'errorInputRequired', 'error', 2000, defaultKey);
      return;
    }

    const inputType = checkInputString(inputText);
    const keyInput = this.$.keyInput.val();

    try {
      if (!inputType) {
        this.main.setButtonState($button, 'btnEncodeWorking', 'loading', 3000, defaultKey);
        const emojiString = await this.orchestrator.encryptMessage(inputText, keyInput);
        if (!emojiString) {
          this.main.setButtonState($button, 'btnEncodeFailed', 'error', 3000, defaultKey);
        } else {
          this.$.encryptOutputTextarea.val(emojiString);
          this.main.setButtonState($button, 'btnEncodeSuccess', 'success', 3000, defaultKey);
        }
      } else {
        this.main.setButtonState($button, 'btnDecodeWorking', 'loading', 3000, defaultKey);
        const decryptedText = await this.orchestrator.decryptMessage(inputText, keyInput);
        if (decryptedText === "") {
          this.main.setButtonState($button, 'btnDecodeFailed', 'error', 3000, defaultKey);
        } else {
          this.$.encryptOutputTextarea.val(decryptedText);
          this.main.setButtonState($button, 'btnDecodeSuccess', 'success', 3000, defaultKey);
        }
      }
    } catch (err) {
      if (window.DEBUG_APP) console.error("Error in encryptionController:", err);
      this.main.setButtonState($button, 'errorGeneral', 'error', 3000, defaultKey);
    }
  }

  async _onGenerateKeyClick() {
    this.$.keyInput.val(await this.orchestrator.generateRandomAppKey());
  }

  registerHandlers() {
    this.$.encryptDecryptButton.click(() => this._onEncryptDecryptClick());
    this.$.clearEncryptInputButton.click(() => this.$.encryptMessageInput.val(''));
    this.$.generateKeyButton.click(() => this._onGenerateKeyClick());
    this.$.copyKeyButton.click(() => this.main.copy(this.$.keyInput[0], this.$.copyKeyButton, 'copyKeyButton', true));
    this.$.copyEncryptOutputButton.click(() => this.main.copy(this.$.encryptOutputTextarea[0], this.$.copyEncryptOutputButton, 'copyEncryptOutputButton', true));
  }
}
