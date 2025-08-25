/**
 * @file darkModeController.js
 * @description Handles dark mode toggling and system preference syncing.
 */

export class DarkModeController {
  constructor(main) {
    this.main = main;
    this.$menu = $('#darkModeMenu');
  }

  static toggles = [
    { selector: 'body', classes: 'dark-custom text-light dark-mode' },
    { selector: '.navbar', removeClasses: 'navbar-light bg-light', addClasses: 'navbar-dark dark-custom2' },
    { selector: '.main-content', classes: 'dark-custom text-light' },
    { selector: '.dropdown-menu', classes: 'dark-custom2' },
    { selector: '.dropdown-item', classes: 'text-light' },
    { selector: '.card', classes: 'dark-custom text-light' },
    { selector: '.card-header', classes: 'dark-custom2' },
    { selector: '.card-body', classes: 'dark-custom text-light' },
    { selector: '.faq-button', removeClasses: 'text-dark', classes: 'text-light' },
    { selector: '.collapse', classes: 'dark-custom2 text-light' },
    { selector: '.input-group-text', classes: 'border-dark dark-custom text-light' },
    { selector: '.form-control', classes: 'border-dark dark-custom text-light' },
    { selector: 'footer', removeClasses: 'bg-light', classes: 'dark-custom2 text-light' },
    { selector: '.btn', removeClasses: 'bg-secondary bg-light text-dark', classes: 'bg-secondary border-dark dark-custom2 text-light' },
  ];

  isDarkModeEnabled() {
    return this.main.storageService.getDarkMode();
  }

  enable(fromToggle = true) {
    DarkModeController.toggles.forEach(item => {
      if (item.removeClasses) $(item.selector).removeClass(item.removeClasses);
      if (item.addClasses) $(item.selector).addClass(item.addClasses);
      else if (item.classes) $(item.selector).addClass(item.classes);
    });
    $('hr').css('border-top', '1px solid #666');
    $('meta[name="theme-color"]').attr('content', '#1d1f29');
    if (fromToggle) this.main.storageService.setDarkMode(true);
    this.$menu.html(this.main.language.translate('disableDarkMode'));
  }

  disable(fromToggle = true) {
    DarkModeController.toggles.forEach(item => {
      if (item.classes) $(item.selector).removeClass(item.classes);
      if (item.addClasses) $(item.selector).removeClass(item.addClasses);
      if (item.removeClasses) $(item.selector).addClass(item.removeClasses);
    });
    $('hr').css('border-top', '');
    $('meta[name="theme-color"]').attr('content', '#ffffff');
    if (fromToggle) this.main.storageService.setDarkMode(false);
    this.$menu.html(this.main.language.translate('enableDarkMode'));
  }

  _deviceDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setAutoDarkMode() {
    if (this._deviceDark()) this.enable(false);
    else this.disable(false);
  }

  updateMenuText() {
    const key = this.isDarkModeEnabled() ? 'disableDarkMode' : 'enableDarkMode';
    this.$menu.html(this.main.language.translate(key));
  }

  registerHandlers() {
    this.$menu.click(() => {
      if (this.isDarkModeEnabled()) this.disable();
      else this.enable();
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (e.matches) this.enable(false);
      else this.disable(false);
    });
  }
}
