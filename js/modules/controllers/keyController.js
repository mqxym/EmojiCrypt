/**
 * @file keyController.js
 * @description Load/Save key actions (localStorage with encryption).
 */

export class KeyController {
  constructor(main, storageService) {
    this.main = main;
    this.storageService = storageService;

    this.$ = {
      loadKeyButton: $('#loadKeyButton'),
      saveKeyButton: $('#saveKeyButton'),
      keySlotSelect: $('#keySlotSelect'),
      keyInput: $('#keyInput')
    };
  }

  async _onLoadKeyClick() {
    const $button = this.$.loadKeyButton;
    if (this.main.state.actionInProgress) return;
    this.main.state.actionInProgress = true;
    const defaultKey = 'loadKeyButton';

    this.main.setButtonState($button, 'loadKey', 'loading', 3000, defaultKey);

    try {
      const slot = this.$.keySlotSelect.val();
      const storedKey = await this.storageService.readKey(slot);
      if (storedKey !== null) {
        this.$.keyInput.val(storedKey);
        this.main.setButtonState($button, 'loadKey', 'success', 2000, defaultKey);
      } else {
        this.main.setButtonState($button, 'error', 'error', 2000, defaultKey);
      }
    } catch (error) {
      if (window.DEBUG_APP) console.error("Error in _onLoadKeyClick:", error);
      this.main.setButtonState($button, 'errorGeneral', 'error', 2000, defaultKey);
    }
  }

  async _onSaveKeyClick() {
    const $button = this.$.saveKeyButton;
    if (this.main.state.actionInProgress) return;
    this.main.state.actionInProgress = true;
    const defaultKey = 'saveKeyButton';

    this.main.setButtonState($button, 'saveKey', 'loading', 3000, defaultKey);

    try {
      const slot = this.$.keySlotSelect.val();
      const key = this.$.keyInput.val();

      if (key) {
        await this.storageService.saveKey(slot, key);
        this.main.setButtonState($button, 'saved', 'success', 2000, defaultKey);
      } else {
        this.main.setButtonState($button, 'error', 'error', 2000, defaultKey);
      }
    } catch (error) {
      if (window.DEBUG_APP) console.error("Error in _onSaveKeyClick:", error);
      this.main.setButtonState($button, 'errorGeneral', 'error', 2000, defaultKey);
    }
  }

  registerHandlers() {
    this.$.loadKeyButton.click(() => this._onLoadKeyClick());
    this.$.saveKeyButton.click(() => this._onSaveKeyClick());
  }
}
