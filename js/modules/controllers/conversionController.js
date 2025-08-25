/**
 * @file conversionController.js
 * @description Convert to/from emojis (with optional simple XOR) actions.
 */

import { checkInputString } from '../utils.js';

export class ConversionController {
  constructor(main, conversionOrchestrator) {
    this.main = main;
    this.orchestrator = conversionOrchestrator;

    this.$ = {
      convertMessageInput: $('#convertMessageInput'),
      clearConvertInputButton: $('#clearConvertInputButton'),
      convertButton: $('#convertButton'),
      convertOutputTextarea: $('#convertOutputTextarea'),
      copyConvertOutputButton: $('#copyConvertOutputButton'),
      doSimpleEncryptionCheckbox: $('#doSimpleEncryption'),
    };
  }

  async _onConvertClick() {
    if (this.main.state.actionInProgress) return;
    this.main.state.actionInProgress = true;

    const $button = this.$.convertButton;
    const defaultKey = 'convertButton';
    const inputText = this.$.convertMessageInput.val();

    if (!inputText) {
      this.main.setButtonState($button, 'error', 'error', 2000, defaultKey);
      return;
    }

    const inputType = checkInputString(inputText);
    const doSimpleEncrypt = this.$.doSimpleEncryptionCheckbox.prop('checked');
    const customEmojiArray = this.main.state.customEmojiArray;

    try {
      if (!inputType) {
        this.main.setButtonState($button, 'btnEncodeWorkingConvert', 'loading', 3000, defaultKey);
        const encodedText = await this.orchestrator.encodeToEmojis(inputText, customEmojiArray, doSimpleEncrypt);
        if (!encodedText) {
          this.main.setButtonState($button, 'btnEncodeFailedConvert', 'error', 3000, defaultKey);
        } else {
          this.$.convertOutputTextarea.val(encodedText);
          this.main.setButtonState($button, 'btnEncodeSuccessConvert', 'success', 3000, defaultKey);
        }
      } else {
        this.main.setButtonState($button, 'btnDecodeWorkingConvert', 'loading', 3000, defaultKey);
        const decodedText = await this.orchestrator.decodeFromEmojis(inputText, customEmojiArray, doSimpleEncrypt);
        if (!decodedText && inputText) {
          this.$.convertOutputTextarea.val('');
          this.main.setButtonState($button, 'btnDecodeFailedConvert', 'error', 3000, defaultKey);
        } else if (decodedText || !inputText) {
          this.$.convertOutputTextarea.val(decodedText || '');
          if (inputText) {
            this.main.setButtonState($button, 'btnDecodeSuccessConvert', 'success', 3000, defaultKey);
          } else {
            this.main.setButtonState($button, defaultKey, 'default', 0, defaultKey);
          }
        }
      }
    } catch (err) {
      if (window.DEBUG_APP) console.error("Error in conversionController:", err);
      this.main.setButtonState($button, 'errorGeneral', 'error', 3000, defaultKey);
    }
  }

  registerHandlers() {
    this.$.convertButton.click(() => this._onConvertClick());
    this.$.clearConvertInputButton.click(() => this.$.convertMessageInput.val(''));
    this.$.copyConvertOutputButton.click(() => this.main.copy(this.$.convertOutputTextarea[0], this.$.copyConvertOutputButton, 'copyConvertOutputButton', true));
  }
}
