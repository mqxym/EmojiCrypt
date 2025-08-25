/**
 * @file viewController.js
 * @description Controls which site is active, URL parameters, metadata, animations, common nav.
 */

import { getVersion } from '../utils.js';

export class ViewController {
  constructor(main) {
    this.main = main;
    this.menuOrder = this.main.state.menuOrder;
    this.isTransitioning = false;

    // Selectors used by view/navigation/animation
    this.$ = {
      navbarBrand: $('#navbarBrand'),
      chooseAppMenu: $('#chooseAppMenu'),
      encryptMenu: $('#encryptMenu'),
      convertMenu: $('#convertMenu'),
      aboutMenu: $('#aboutMenu'),
      languageMenuItems: $('#languageMenuItems'),
      encryptSection: $('#encryptSection'),
      convertSection: $('#convertSection'),
      aboutSection: $('#aboutSection'),
      versionFooter: $('.versionFooter'),
      informationEncryption: $('#informationEncryption'),
      informationConversion: $('#informationConversion'),
      bannerEncryption: $('#bannerEncryption'),
      bannerConversion: $('#bannerConversion')
    };
  }

  // === Initialization helpers ===
  getSectionFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('about')) return 'aboutSection';
    if (params.has('encrypt')) return 'encryptSection';
    if (params.has('convert')) return 'convertSection';
    return this.main.storageService.getLastSite() || 'convertSection';
  }

  _getSectionFromURLString(url) {
    if (typeof url !== 'string' || !url) {
      if (window.DEBUG_APP) console.error("_getSectionFromURLString invalid URL:", url);
      return null;
    }
    const queryString = url.includes('?') ? url.substring(url.indexOf('?')) : '';
    const params = new URLSearchParams(queryString);
    if (params.has('about')) return 'aboutSection';
    if (params.has('encrypt')) return 'encryptSection';
    if (params.has('convert')) return 'convertSection';
    return 'convertSection';
  }

  setInitialSectionPositions() {
    const current = this.main.state.currentMenu;
    const currentIndex = this.menuOrder.indexOf(current);
    this.menuOrder.forEach((sectionId, index) => {
      const $section = $(`#${sectionId}`);
      const offset = (index - currentIndex) * 100;
      $section.css('left', `${offset}%`);
      $section.css('position', index === currentIndex ? 'relative' : 'absolute');
      if (index !== currentIndex) $section.addClass('d-none');
      else $section.removeClass('d-none');
    });
  }

  updateURLParameter() {
    const { currentMenu, languageCode } = this.main.state;
    const paramName = currentMenu.replace('Section', '');
    let newURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${paramName}`;
    if (languageCode !== 'en') newURL += `&lang=${languageCode}`;
    if (this.main.state.privateConversionId && currentMenu === 'convertSection') {
      newURL += `&id=${this.main.state.privateConversionId}`;
    }
    window.history.pushState({ path: newURL }, '', newURL);
  }

  updateMetadata() {
    const { currentMenu } = this.main.state;
    let titleKey, descriptionKey;
    switch (currentMenu) {
      case 'encryptSection':
        titleKey = 'metaTitleEncrypt'; descriptionKey = 'metaDescriptionEncrypt'; break;
      case 'convertSection':
        titleKey = 'metaTitleConvert'; descriptionKey = 'metaDescriptionConvert'; break;
      case 'aboutSection':
        titleKey = 'metaTitleAbout'; descriptionKey = 'metaDescriptionAbout'; break;
      default:
        titleKey = 'navbarBrand'; descriptionKey = 'metaDescriptionConvert';
    }
    document.title = this.main.language.translate(titleKey);
    $('meta[name="description"]').attr('content', this.main.language.translate(descriptionKey));
  }

  updateNavigationLinks() {
    ['encrypt', 'convert', 'about'].forEach(sectionKey => {
      let sectionHref = `?${sectionKey}`;
      if (this.main.state.languageCode !== 'en') sectionHref += `&lang=${this.main.state.languageCode}`;
      if (sectionKey === 'convert' && this.main.state.privateConversionId) {
        sectionHref += `&id=${this.main.state.privateConversionId}`;
      }
      this.$[`${sectionKey}Menu`].attr('href', sectionHref);
    });
  }

  updateLanguageMenuLinks() {
    const currentSectionName = this.main.state.currentMenu.replace('Section', '');
    this.$.languageMenuItems.find('a.dropdown-item').each((_, el) => {
      const langCode = $(el).attr('data-lang-code');
      let href = `?${currentSectionName}`;
      if (langCode !== 'en') href += `&lang=${langCode}`;
      if (this.main.state.privateConversionId && this.main.state.currentMenu === 'convertSection') {
        href += `&id=${this.main.state.privateConversionId}`;
      }
      $(el).attr('href', href);
    });
  }

  setVersionFooter() {
    this.$.versionFooter.html(getVersion());
  }

  // === Information cards toggle ===
  hideInformation() {
    this.$.bannerEncryption.removeClass('d-none').addClass('d-flex');
    this.$.bannerConversion.removeClass('d-none').addClass('d-flex');
    this.$.informationEncryption.addClass('d-none');
    this.$.informationConversion.addClass('d-none');
    this.main.storageService.setInformationHidden(true);
  }

  // === Animations & transitions ===
  _animateTransition(fromDivId, toDivId, callback) {
    const fromIndex = this.menuOrder.indexOf(fromDivId);
    const toIndex = this.menuOrder.indexOf(toDivId);
    const offset = (toIndex - fromIndex) * 100;

    const $fromDiv = $(`#${fromDivId}`);
    const $toDiv = $(`#${toDivId}`);

    if (fromIndex < toIndex) {
      $fromDiv.css('position', 'absolute');
      $toDiv.css('position', 'relative').removeClass('d-none');
      $toDiv.css('left', `${offset}%`);
    } else {
      $toDiv.css('left', `${offset}%`).removeClass('d-none');
    }

    $fromDiv.animate({ left: `${-offset}%` }, 300);
    $toDiv.animate({ left: '0%' }, 300, () => {
      if (fromIndex > toIndex) {
        $fromDiv.css('position', 'absolute').addClass('d-none');
        $toDiv.css('position', 'relative');
      } else if (fromIndex < toIndex) {
        $fromDiv.addClass('d-none');
      }
      this.menuOrder.forEach(id => $(`#${id}`).css('position', id === toDivId ? 'relative' : 'absolute'));
      if (typeof callback === 'function') callback();
    });
  }

  transitionToSection(targetDivId, pushState = true) {
    if (this.isTransitioning || targetDivId === this.main.state.currentMenu) return;
    this.isTransitioning = true;

    const fromDivId = this.main.state.currentMenu;
    const toDivId = targetDivId;
    const needsIntermediate = fromDivId !== 'convertSection' && toDivId !== 'convertSection' && fromDivId !== toDivId;

    const finalTransition = async () => {
      this.main.state.currentMenu = toDivId;
      this.isTransitioning = false;
      await this.main.privateAlgo.updateFromUrlIfNeeded();
      if (pushState) this.updateURLParameter();
      this.updateLanguageMenuLinks();
      this.updateNavigationLinks();
      this.updateMetadata();
      this.main.storageService.setLastSite(this.main.state.currentMenu);
    };

    if (needsIntermediate) {
      this._animateTransition(fromDivId, 'convertSection', () => {
        this._animateTransition('convertSection', toDivId, finalTransition);
      });
    } else {
      this._animateTransition(fromDivId, toDivId, finalTransition);
    }

    // Preserve original behavior (checking toggler under navbarBrand)
    if (this.$.navbarBrand.find('.navbar-toggler').is(':visible')) {
      $('.navbar-collapse').collapse('hide');
    }
  }

  // === Event wiring ===
  registerHandlers() {
    const $documentBody = $(document.body);

    // Direct nav links
    $documentBody.on(
      'click',
      'a.nav-link[href^="?"]:not([data-bs-toggle="dropdown"]):not([data-toggle="dropdown"])',
      (e) => {
        e.preventDefault();
        const href = $(e.currentTarget).attr('href');
        const target = this._getSectionFromURLString(href);
        if (target) this.transitionToSection(target);
        else console.error("Cannot resolve target from nav link.", href);
      }
    );

    // Dropdown nav items (not language)
    $documentBody.on(
      'click',
      '.dropdown-menu a.dropdown-item[href^="?"]:not([data-lang-code])',
      (e) => {
        e.preventDefault();
        const href = $(e.currentTarget).attr('href');
        const target = this._getSectionFromURLString(href);
        if (target) this.transitionToSection(target);
        else console.error("Cannot resolve target from dropdown item.", href);
      }
    );

    // In‑page CTAs
    $('#btnGoToConvert').click(() => this.transitionToSection('convertSection'));
    $('#btnGoToEncrypt').click(() => this.transitionToSection('encryptSection'));

    // Info banner hide
    $('.hide-information').click(() => {
      if (confirm(this.main.language.translate('modalConfirmationHideInfo') || "Do you really want to hide this information tab forever?")) {
        this.hideInformation();
      }
    });

    // Button press animation (unchanged)
    $('.btn').on('pointerdown', function (e) {
      e.preventDefault();
      const button = $(this);
      if (button.data('clickHandled')) return;
      button.data('clickHandled', true);
      button.addClass('btn-font-animate');
      void button[0].offsetWidth;
      setTimeout(() => {
        button.removeClass('btn-font-animate').removeClass('active').blur();
        button.data('clickHandled', false);
        setTimeout(() => button.blur().trigger('mouseout'), 50);
      }, 400);
    });

    // Popstate (back/forward)
    window.onpopstate = () => {
      const targetSection = this.getSectionFromURL();
      this.transitionToSection(targetSection, false);

      const langFromURL = this.main.language.getLanguageCodeFromURL();
      if (langFromURL && langFromURL !== this.main.state.languageCode) {
        this.main.language.applyLanguageCode(langFromURL);
        this.updateMetadata();
      }

      this.main.privateAlgo.updateFromUrlIfNeeded();
    };
  }
}
