/**
 * @file UIManager.js
 * @description Manages all UI interactions, view transitions, and event handling for the application.
 */

import { StorageService } from './storageService.js';
import { EncryptionOrchestrator } from './encryptionOrchestrator.js';
import { ConversionOrchestrator } from './conversionOrchestrator.js';
import { EmojiService } from './emojiService.js';
import * as LanguageService from './languageService.js'; // Import all as namespace
// EMOJI_ARRAY will be passed directly or via utils, not imported here if not needed by other top-level code in this file.
// For now, assuming EMOJI_ARRAY is passed to constructor directly if needed, or via utils.
// Utility functions like generateSecureRandomString, extractEmojis, getVersion, checkInputString
// will be passed via the 'utils' object in the constructor.

export class UIManager {
    constructor(storageService, encryptionOrchestrator, conversionOrchestrator, emojiService, languageService, utils, emojiArrayConstant) {
        this.storageService = storageService;
        this.encryptionOrchestrator = encryptionOrchestrator;
        this.conversionOrchestrator = conversionOrchestrator;
        this.emojiService = emojiService;
        this.languageService = languageService; // This is the namespace import
        this.utils = utils; // Consolidated utils object, includes getVersion, checkInputString etc.
        this.EMOJI_ARRAY = emojiArrayConstant; // Passed directly

        // UI State
        this.currentMenu = '';
        this.isTransitioning = false;
        this.menuOrder = ['encryptSection', 'convertSection', 'aboutSection'];
        this.languageCode = 'en';
        this.languageIndex = 0;
        this.customEmojiArray = null;
        this.privateConversionId = null;
        this.actionInProgress = false;

        // jQuery Selectors (cached)
        this.selectors = {
            navbarBrand: $('#navbarBrand'),
            chooseAppMenu: $('#chooseAppMenu'),
            encryptMenu: $('#encryptMenu'),
            convertMenu: $('#convertMenu'),
            aboutMenu: $('#aboutMenu'),
            darkModeMenu: $('#darkModeMenu'),
            languageMenuItems: $('#languageMenuItems'),
            errorHeader: $('#errorHeader'),
            encryptSection: $('#encryptSection'),
            convertSection: $('#convertSection'),
            aboutSection: $('#aboutSection'),
            encryptMessageInput: $('#encryptMessageInput'),
            clearEncryptInputButton: $('#clearEncryptInputButton'),
            keyInput: $('#keyInput'),
            generateKeyButton: $('#generateKeyButton'),
            copyKeyButton: $('#copyKeyButton'),
            keyInstructions: $('#keyInstructions'),
            keySlotSelect: $('#keySlotSelect'),
            loadKeyButton: $('#loadKeyButton'),
            saveKeyButton: $('#saveKeyButton'),
            encryptDecryptButton: $('#encryptDecryptButton'),
            encryptOutputTextarea: $('#encryptOutputTextarea'),
            copyEncryptOutputButton: $('#copyEncryptOutputButton'),
            convertMessageInput: $('#convertMessageInput'),
            clearConvertInputButton: $('#clearConvertInputButton'),
            convertButton: $('#convertButton'),
            convertOutputTextarea: $('#convertOutputTextarea'),
            copyConvertOutputButton: $('#copyConvertOutputButton'),
            convertTopMessage: $('#convertTopMessage'),
            convertSimpleEncryptionSection: $('#convertSimpleEncryptionSection'),
            doSimpleEncryptionCheckbox: $('#doSimpleEncryption'),
            privateAlgorithmSection: $('#privateAlgorithmSection'),
            generatePrivateConversionButton: $('#generatePrivateConversionButton'),
            privateLinkText: $('#privateLinkText'),
            privateConversionLink: $('#privateConversionLink'),
            copyPrivateConversionLink: $('#copyPrivateConversionLink'),
            disablePrivateConversionButton: $('#disablePrivateConversionButton'),
            privateAlgorithmDisclaimer: $('#privateAlgorithmDisclaimer'),
            privateAlgorithmFooter: $('#privateAlgorithmFooter'),
            showPrivateAlgorithmButton: $('#showPrivateAlgorithmButton'),
            versionFooter: $('.versionFooter'),
            informationEncryption: $('#informationEncryption'),
            informationConversion: $('#informationConversion'),
            bannerEncryption: $('#bannerEncryption'),
            bannerConversion: $('#bannerConversion'),
            simpleEncryptionText: $('#simpleEncryptionText'),
            // Add more selectors as needed
        };

        this._uiTextElements = [
            { selector: this.selectors.navbarBrand, key: 'navbarBrand' },
            { selector: this.selectors.chooseAppMenu, key: 'chooseAppMenu' },
            { selector: this.selectors.encryptMenu, key: 'encryptMenu' },
            { selector: this.selectors.convertMenu, key: 'convertMenu' },
            { selector: this.selectors.aboutMenu, key: 'aboutMenu' },
            { selector: this.selectors.clearEncryptInputButton, key: 'clearEncryptInputButton' },
            // { selector: this.selectors.encryptDecryptButton, key: 'encryptDecryptButton' }, // Button text managed by state
            { selector: this.selectors.copyKeyButton, key: 'copyKeyButton' },
            { selector: this.selectors.keyInstructions, key: 'keyInstructions' },
            { selector: this.selectors.loadKeyButton, key: 'loadKeyButton' },
            { selector: this.selectors.saveKeyButton, key: 'saveKeyButton' },
            // { selector: this.selectors.encryptOutputTextarea, key: 'encryptOutputTextarea' }, // Placeholder
            { selector: this.selectors.copyEncryptOutputButton, key: 'copyEncryptOutputButton' },
            { selector: this.selectors.clearConvertInputButton, key: 'clearConvertInputButton' },
            // { selector: this.selectors.convertButton, key: 'convertButton' }, // Button text managed by state
            // { selector: this.selectors.convertOutputTextarea, key: 'convertOutputTextarea' }, // Placeholder
            { selector: this.selectors.copyConvertOutputButton, key: 'copyConvertOutputButton' },
            { selector: this.selectors.privateLinkText, key: 'privateLinkText' },
            { selector: this.selectors.copyPrivateConversionLink, key: 'copyPrivateConversionLink' },
            { selector: this.selectors.disablePrivateConversionButton, key: 'disablePrivateConversionButton' },
            { selector: this.selectors.privateAlgorithmDisclaimer, key: 'privateAlgorithmDisclaimer' },
            { selector: this.selectors.generatePrivateConversionButton, key: 'generatePrivateConversionButton' },
            { selector: this.selectors.privateAlgorithmFooter, key: 'privateAlgorithmFooter' },
            { selector: this.selectors.showPrivateAlgorithmButton, key: 'showPrivateAlgorithmButton' },
            { selector: this.selectors.convertTopMessage, key: 'privateAlgorithmHeader' }, 
            { selector: $('#btnGoToConvert'), key: 'btnGoToConvert' }, // Direct selector for static buttons
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
        ];
        this._uiPlaceholderElements = [
            { selector: this.selectors.encryptMessageInput, key: 'encryptMessageInput' },
            { selector: this.selectors.keyInput, key: 'keyInput' },
            { selector: this.selectors.encryptOutputTextarea, key: 'encryptOutputTextarea' },
            { selector: this.selectors.convertMessageInput, key: 'convertMessageInput' },
            { selector: this.selectors.convertOutputTextarea, key: 'convertOutputTextarea' },
        ];
    }

    async initialize() {
        this.storageService.migrateLocalStorageKeys(['pa', 'lang', 'darkMode', 'lastSite', 'informationHidden']);
        await this.storageService.encryptOldKeys(); // From original encryptKeys logic

        const { languageCode, languageIndex } = this.languageService.initializeLanguage(this.storageService);
        this.languageCode = languageCode;
        this.languageIndex = languageIndex;

        this._updateUILanguage();
        this._handleCryptoSupport();

        this.currentMenu = this._getSectionFromURL();
        this._setInitialSectionPositions();
        this._updateMetadata();
        await this._updatePrivateAlgorithmFromUrl();
        this._updateURLParameter();

        this.selectors.versionFooter.html(this.utils.getVersion()); // Ensure this uses this.utils

        if (this.storageService.getInformationHidden()) {
            this._hideInformation();
        }
        
        if (this._isDarkModeEnabled()) {
            this._enableDarkMode(false);
        } else {
            this._setAutoDarkMode();
        }
        
        this._registerEventHandlers();
        console.log("UIManager initialized");
    }

    _getSectionFromURL() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('about')) return 'aboutSection';
        if (params.has('encrypt')) return 'encryptSection';
        if (params.has('convert')) return 'convertSection';
        return this.storageService.getLastSite() || 'convertSection';
    }

    _setInitialSectionPositions() {
        const currentIndex = this.menuOrder.indexOf(this.currentMenu);
        this.menuOrder.forEach((sectionId, index) => {
            const $section = $(`#${sectionId}`);
            const offset = (index - currentIndex) * 100;
            $section.css('left', `${offset}%`);
            $section.css('position', index === currentIndex ? 'relative' : 'absolute');
            if (index !== currentIndex) {
                $section.addClass('d-none'); // Initially hide non-active sections
            } else {
                $section.removeClass('d-none');
            }
        });
    }
    
    _updateURLParameter() {
        const paramName = this.currentMenu.replace('Section', '');
        let newURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${paramName}`;
        if (this.languageCode !== 'en') {
            newURL += `&lang=${this.languageCode}`;
        }
        if (this.privateConversionId && this.currentMenu === 'convertSection') {
            newURL += `&id=${this.privateConversionId}`;
        }
        window.history.pushState({ path: newURL }, '', newURL);
    }

    _updateMetadata() {
        let titleKey, descriptionKey;
        switch (this.currentMenu) {
            case 'encryptSection':
                titleKey = 'metaTitleEncrypt';
                descriptionKey = 'metaDescriptionEncrypt';
                break;
            case 'convertSection':
                titleKey = 'metaTitleConvert';
                descriptionKey = 'metaDescriptionConvert';
                break;
            case 'aboutSection':
                titleKey = 'metaTitleAbout';
                descriptionKey = 'metaDescriptionAbout';
                break;
            default:
                titleKey = 'navbarBrand'; // Default title
                descriptionKey = 'metaDescriptionConvert';
        }
        document.title = this.languageService.getTranslation(titleKey, this.languageIndex);
        $('meta[name="description"]').attr('content', this.languageService.getTranslation(descriptionKey, this.languageIndex));
    }

    async _updatePrivateAlgorithmFromUrl() {
        if (this.currentMenu !== 'convertSection') {
            // State (privateConversionId, customEmojiArray) is intentionally preserved 
            // if user navigates away from convertSection and then returns.
            return;
        }

        let idFromUrl = new URLSearchParams(window.location.search).get('id');
        const idFromStorage = this.storageService.getPrivateAlgorithmId();

        // Validate idFromUrl: must be a string and have a length > 5 (simple heuristic)
        if (idFromUrl && (typeof idFromUrl !== 'string' || idFromUrl.length <= 5)) {
            console.warn(`Ignoring short/invalid 'id' parameter from URL: ${idFromUrl}`);
            idFromUrl = null; // Treat as invalid
        }
        
        let potentialId = idFromUrl; // URL takes precedence if valid

        if (!potentialId && idFromStorage) {
            // Validate idFromStorage as well if URL did not provide a valid one
            if (typeof idFromStorage === 'string' && idFromStorage.length > 5) {
                potentialId = idFromStorage;
            } else if (idFromStorage) { // If storage ID exists but is invalid
                 this.storageService.removePrivateAlgorithmId(); // Clean up invalid stored ID
            }
        }
        
        this.privateConversionId = potentialId; // This will be null if neither source provided a valid ID

        if (this.privateConversionId) {
            // If idFromUrl was valid and used, ensure it's also set in storage.
            // (This also covers the case where idFromUrl is new and idFromStorage was null/different)
            if (idFromUrl && this.privateConversionId === idFromUrl && idFromUrl !== idFromStorage) {
                this.storageService.setPrivateAlgorithmId(idFromUrl);
            }
            
            this.customEmojiArray = await this.emojiService.generateSecurePermutationFromString(this.privateConversionId, this.EMOJI_ARRAY);
            
            // Construct the correct link URL to display, ensuring it includes the active ID
            const paramName = 'convert'; // Specific to convertSection
            let linkURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${paramName}`;
            if (this.languageCode !== 'en') {
                linkURL += `&lang=${this.languageCode}`;
            }
            linkURL += `&id=${this.privateConversionId}`; // Add the active private ID
            this.selectors.privateConversionLink.val(linkURL);

            this.selectors.convertTopMessage.removeClass('d-none').html(this.languageService.getTranslation('privateAlgorithmHeader', this.languageIndex));
            this.selectors.disablePrivateConversionButton.removeClass('d-none');
            this.selectors.convertSimpleEncryptionSection.removeClass('d-none');
            this.selectors.privateAlgorithmSection.collapse('show'); // Show the main private algorithm section
            
            // Update links as privateConversionId state changed
            this._updateNavigationLinks();
            this._updateLanguageMenuLinks();
        } else {
            const privateIdChanged = this.privateConversionId !== null; // Check if it was previously set
            this.customEmojiArray = null;
            this.privateConversionId = null; // Explicitly set to null
            this.selectors.privateConversionLink.val('');
            this.selectors.convertTopMessage.addClass('d-none');
            this.selectors.disablePrivateConversionButton.addClass('d-none');
            this.selectors.convertSimpleEncryptionSection.addClass('d-none');
            this.selectors.privateAlgorithmSection.collapse('hide'); // Hide the main private algorithm section

            if (privateIdChanged) { // Only update links if ID actually changed to null
                this._updateNavigationLinks();
                this._updateLanguageMenuLinks();
            }
        }
    }
    
    _handleCryptoSupport() {
        if (!window.crypto || !window.crypto.subtle) {
            this.selectors.errorHeader.removeClass("d-none");
        }
    }

    _checkInputString(inputString) {
        // This method now directly uses the checkInputString from the utils object.
        if (!this.utils.checkInputString) {
            console.warn("checkInputString utility is not available on this.utils.");
            return false; 
        }
        return this.utils.checkInputString(inputString);
    }

    _animateTransition(fromDivId, toDivId, callback) {
        const fromIndex = this.menuOrder.indexOf(fromDivId);
        const toIndex = this.menuOrder.indexOf(toDivId);
        const offset = (toIndex - fromIndex) * 100; 
    
        const $fromDiv = $(`#${fromDivId}`);
        const $toDiv = $(`#${toDivId}`);
    
        if (fromIndex < toIndex) { // Sliding left (new content comes from right)
            $fromDiv.css('position', 'absolute');
            $toDiv.css('position', 'relative').removeClass('d-none');
            $toDiv.css('left', `${offset}%`);
        } else { // Sliding right (new content comes from left)
            $toDiv.css('left', `${offset}%`).removeClass('d-none');
        }
    
        $fromDiv.animate({ left: `${-offset}%` }, 300);
        $toDiv.animate({ left: '0%' }, 300, () => {
            if (fromIndex > toIndex) { // New content came from left
                $fromDiv.css('position', 'absolute').addClass('d-none');
                $toDiv.css('position', 'relative');
            } else if (fromIndex < toIndex) { // New content came from right
                 $fromDiv.addClass('d-none');
            }
            // Ensure only current section is relative
            this.menuOrder.forEach(id => $(`#${id}`).css('position', id === toDivId ? 'relative': 'absolute'));

            if (typeof callback === 'function') callback();
        });
    }
    
    _transitionToSection(targetDivId, pushState = true) {
        if (this.isTransitioning || targetDivId === this.currentMenu) return;
        this.isTransitioning = true;
    
        const fromDivId = this.currentMenu;
        const toDivId = targetDivId;
    
        // Direct transition or intermediate (convertSection is the hub)
        const needsIntermediate = fromDivId !== 'convertSection' && toDivId !== 'convertSection' && fromDivId !== toDivId;
    
        const finalTransition = async () => {
            this.currentMenu = toDivId;
            this.isTransitioning = false;
            await this._updatePrivateAlgorithmFromUrl();
            if (pushState) this._updateURLParameter();
            this._updateLanguageMenuLinks();
            this._updateNavigationLinks();
            this._updateMetadata();
            this.storageService.setLastSite(this.currentMenu);
        };
    
        if (needsIntermediate) {
            this._animateTransition(fromDivId, 'convertSection', () => {
                // Temporarily set currentMenu for link updates if needed during intermediate step
                // this.currentMenu = 'convertSection'; 
                this._animateTransition('convertSection', toDivId, finalTransition);
            });
        } else {
            this._animateTransition(fromDivId, toDivId, finalTransition);
        }
    
        if (this.selectors.navbarBrand.find('.navbar-toggler').is(':visible')) { // Simplified check
            $('.navbar-collapse').collapse('hide');
        }
    }

    _getSectionFromURLString(url) {
        if (typeof url !== 'string' || !url) {
            console.error("_getSectionFromURLString called with invalid URL:", url);
            return null; // Return null to indicate failure/invalid input
        }
        // Ensure that url.indexOf('?') is valid even if '?' is not present
        const queryString = url.includes('?') ? url.substring(url.indexOf('?')) : '';
        const params = new URLSearchParams(queryString);

        if (params.has('about')) return 'aboutSection';
        if (params.has('encrypt')) return 'encryptSection';
        if (params.has('convert')) return 'convertSection';
        return 'convertSection'; 
    }

    _updateUILanguage() {
        this._uiTextElements.forEach(element => {
            element.selector.html(this.languageService.getTranslation(element.key, this.languageIndex));
        });
        this._uiPlaceholderElements.forEach(element => {
            element.selector.attr('placeholder', this.languageService.getTranslation(element.key, this.languageIndex));
        });

        // Update Dark Mode Menu Text
        const darkModeKey = this._isDarkModeEnabled() ? 'disableDarkMode' : 'enableDarkMode';
        this.selectors.darkModeMenu.html(this.languageService.getTranslation(darkModeKey, this.languageIndex));

        // Update FAQ items (simplified loop, assuming FAQ IDs follow a pattern)
        for (let i = 1; i <= 26; i++) {
            $(`#faqQuestion${i}`).html(this.languageService.getTranslation(`faqQuestion${i}`, this.languageIndex));
            $(`#faqAnswer${i}`).html(this.languageService.getTranslation(`faqAnswer${i}`, this.languageIndex));
            // For section-specific FAQs
            $(`#faqEncryptionQuestion${i}`).html(this.languageService.getTranslation(`faqQuestion${i}`, this.languageIndex));
            $(`#faqEncryptionAnswer${i}`).html(this.languageService.getTranslation(`faqAnswer${i}`, this.languageIndex));
            $(`#faqConversionQuestion${i}`).html(this.languageService.getTranslation(`faqQuestion${i}`, this.languageIndex));
            $(`#faqConversionAnswer${i}`).html(this.languageService.getTranslation(`faqAnswer${i}`, this.languageIndex));
        }
        // Handle specific button texts not covered by the loop or if they change state
        // Also store their original text key for reference in _setButtonState
        this.selectors.encryptDecryptButton.html(this.languageService.getTranslation('encryptDecryptButton', this.languageIndex))
            .data('original-text-key', 'encryptDecryptButton');
        this.selectors.convertButton.html(this.languageService.getTranslation('convertButton', this.languageIndex))
            .data('original-text-key', 'convertButton');
        this.selectors.loadKeyButton.html(this.languageService.getTranslation('loadKeyButton', this.languageIndex))
            .data('original-text-key', 'loadKeyButton');
        this.selectors.saveKeyButton.html(this.languageService.getTranslation('saveKeyButton', this.languageIndex))
            .data('original-text-key', 'saveKeyButton');
        this.selectors.generatePrivateConversionButton.html(this.languageService.getTranslation('generatePrivateConversionButton', this.languageIndex))
            .data('original-text-key', 'generatePrivateConversionButton');
        this.selectors.disablePrivateConversionButton.html(this.languageService.getTranslation('disablePrivateConversionButton', this.languageIndex))
            .data('original-text-key', 'disablePrivateConversionButton');
        // Other buttons like copy buttons, clear buttons, generateKeyButton (for encryption key) have their text set once
        // and don't typically use the complex _setButtonState for loading/success/error/reset cycle.
        // If they did, they would need their original-text-key set too.

        this._updateNavigationLinks();
        this._updateLanguageMenuLinks();
    }

    _updateNavigationLinks() {
        let baseLangParam = '';
        if (this.languageCode !== 'en') {
            baseLangParam = `&lang=${this.languageCode}`;
        }

        ['encrypt', 'convert', 'about'].forEach(sectionKey => {
            let sectionHref = `?${sectionKey}`; // Base section query: e.g. ?encrypt

            // Append language parameter if it's not English
            if (this.languageCode !== 'en') {
                 sectionHref += `&lang=${this.languageCode}`;
            }
    
            // Append ID parameter only to the 'convert' link if privateConversionId is active
            if (sectionKey === 'convert' && this.privateConversionId) {
                sectionHref += `&id=${this.privateConversionId}`;
            }
            this.selectors[`${sectionKey}Menu`].attr('href', sectionHref);
        });
    }

    _updateLanguageMenuLinks() {
        const currentSectionName = this.currentMenu.replace('Section', '');
        this.selectors.languageMenuItems.find('a.dropdown-item').each((_, el) => {
            const langCode = $(el).attr('data-lang-code');
            let href = `?${currentSectionName}`;
            if (langCode !== 'en') {
                href += `&lang=${langCode}`;
            }
            // If privateConversionId exists and we are in convertSection, add it
            if (this.privateConversionId && this.currentMenu === 'convertSection') {
                href += `&id=${this.privateConversionId}`;
            }
            $(el).attr('href', href);
        });
    }
    
    _isDarkModeEnabled() {
        return this.storageService.getDarkMode();
    }

    _enableDarkMode(fromToggle = true) {
        const toggles = UIManager._darkModeClassToggles; // Access static property
        toggles.forEach(item => {
            if (item.removeClasses) $(item.selector).removeClass(item.removeClasses);
            if (item.addClasses) $(item.selector).addClass(item.addClasses);
            else if (item.classes) $(item.selector).addClass(item.classes);
        });
        $('hr').css('border-top', '1px solid #666');
        $('meta[name="theme-color"]').attr('content', '#1d1f29');
        if(fromToggle) this.storageService.setDarkMode(true);
        this.selectors.darkModeMenu.html(this.languageService.getTranslation('disableDarkMode', this.languageIndex));
    }

    _disableDarkMode(fromToggle = true) {
        const toggles = UIManager._darkModeClassToggles;
        toggles.forEach(item => {
            if (item.classes) $(item.selector).removeClass(item.classes);
            if (item.addClasses) $(item.selector).removeClass(item.addClasses); // Order matters if add/remove overlap
            if (item.removeClasses) $(item.selector).addClass(item.removeClasses);
        });
        $('hr').css('border-top', '');
        $('meta[name="theme-color"]').attr('content', '#ffffff');
        if(fromToggle) this.storageService.setDarkMode(false);
        this.selectors.darkModeMenu.html(this.languageService.getTranslation('enableDarkMode', this.languageIndex));
    }
    
    _setAutoDarkMode() {
        if (this._darkModeDeviceIsActive()) {
            this._enableDarkMode(false); // Don't set localStorage, just reflect system
        } else {
            this._disableDarkMode(false); // Don't set localStorage
        }
    }

    _darkModeDeviceIsActive() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    _hideInformation() {
        this.selectors.bannerEncryption.removeClass('d-none').addClass('d-flex');
        this.selectors.bannerConversion.removeClass('d-none').addClass('d-flex');
        this.selectors.informationEncryption.addClass('d-none');
        this.selectors.informationConversion.addClass('d-none');
        this.storageService.setInformationHidden(true);
    }

    // --- Event Handler Registration ---
    _registerEventHandlers() {
        const $documentBody = $(document.body);

        // Delegated event handler for direct navigation links (excluding dropdown toggles)
        $documentBody.on('click', 'a.nav-link[href^="?"]:not([data-bs-toggle="dropdown"]):not([data-toggle="dropdown"])', (e) => {
            e.preventDefault();
            const $clickedElement = $(e.currentTarget);
            const href = $clickedElement.attr('href');

            // If href is invalid, _getSectionFromURLString will handle it and return null
            const targetSection = this._getSectionFromURLString(href);

            if (targetSection) {
                this._transitionToSection(targetSection);
            } else {
                 console.error( // Log if targetSection is not determined
                    "Could not determine target section from direct nav-link href. HREF: ", href,
                    "ELEMENT_ID: ", $clickedElement.attr('id'),
                    "ELEMENT_CLASSES: ", $clickedElement.attr('class'),
                    "ELEMENT_TEXT: ", $clickedElement.text().trim()
                );
            }
        });

        // Delegated event handler for navigation items within dropdown menus
        // Excludes items with data-lang-code (language items) and #darkModeMenu (already excluded by selector)
        // Assumes app navigation dropdown items are within a parent that has .dropdown-menu
        $documentBody.on('click', '.dropdown-menu a.dropdown-item[href^="?"]:not([data-lang-code])', (e) => {
            e.preventDefault();
            const $clickedElement = $(e.currentTarget);
            const href = $clickedElement.attr('href');
            
            // If href is invalid, _getSectionFromURLString will handle it and return null
            const targetSection = this._getSectionFromURLString(href);

            if (targetSection) {
                this._transitionToSection(targetSection);
            } else {
                 console.error( // Log if targetSection is not determined
                    "Could not determine target section from dropdown-item href. HREF: ", href,
                    "ELEMENT_ID: ", $clickedElement.attr('id'),
                    "ELEMENT_CLASSES: ", $clickedElement.attr('class'),
                    "ELEMENT_TEXT: ", $clickedElement.text().trim()
                );
            }
        });
        
        // Delegated event handler for language menu items
        this.selectors.languageMenuItems.on('click', 'a.dropdown-item[data-lang-code]', (e) => this._handleLanguageChangeClick(e));
        
        // Dark Mode
        this.selectors.darkModeMenu.click(() => this._handleDarkModeToggle());
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => this._handleDarkModeSystemChange(e));

        // Window PopState
        window.onpopstate = () => this._handleWindowPopState();

        // Button Clicks
        this.selectors.encryptDecryptButton.click(() => this._handleEncryptDecryptClick());
        this.selectors.convertButton.click(() => this._handleConvertClick());
        this.selectors.clearEncryptInputButton.click(() => this.selectors.encryptMessageInput.val(''));
        this.selectors.clearConvertInputButton.click(() => this.selectors.convertMessageInput.val(''));
        this.selectors.generateKeyButton.click(() => this._handleGenerateKeyClick());
        
        this.selectors.copyKeyButton.click(() => this._handleCopyClick(this.selectors.keyInput[0], this.selectors.copyKeyButton, 'copyKeyButton', true));
        this.selectors.copyEncryptOutputButton.click(() => this._handleCopyClick(this.selectors.encryptOutputTextarea[0], this.selectors.copyEncryptOutputButton, 'copyEncryptOutputButton', true));
        this.selectors.copyConvertOutputButton.click(() => this._handleCopyClick(this.selectors.convertOutputTextarea[0], this.selectors.copyConvertOutputButton, 'copyConvertOutputButton', true));
        this.selectors.copyPrivateConversionLink.click(() => this._handleCopyClick(this.selectors.privateConversionLink[0], this.selectors.copyPrivateConversionLink, 'copyPrivateConversionLink', true, this.privateConversionId));

        this.selectors.loadKeyButton.click(() => this._handleLoadKeyClick());
        this.selectors.saveKeyButton.click(() => this._handleSaveKeyClick());

        this.selectors.generatePrivateConversionButton.click(() => this._handleGeneratePrivateConversionClick());
        this.selectors.disablePrivateConversionButton.click(() => this._handleDisablePrivateConversionClick());
        
        $('#btnGoToConvert').click(() => this._transitionToSection('convertSection'));
        $('#btnGoToEncrypt').click(() => this._transitionToSection('encryptSection'));

        $('.hide-information').click(() => {
            if (confirm(this.languageService.getTranslation('modalConfirmationHideInfo', this.languageIndex) || "Do you really want to hide this information tab forever?")) { // Fallback for missing translation
                this._hideInformation();
            }
        });

        // Button press animation
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
    }

    // --- Private Event Handler Methods ---
    _setButtonState(buttonElement, textKeyForCurrentDisplay, state = 'default', duration = 3000, baseDefaultTextKey = null) {
        // If a baseDefaultTextKey is provided (typically when initiating 'loading' state), store it.
        if (baseDefaultTextKey) {
            buttonElement.data('original-text-key', baseDefaultTextKey);
        }
        
        const storedDefaultTextKey = buttonElement.data('original-text-key');
    
        buttonElement.removeClass('custom-red-border custom-green-border');
        let textToDisplay;

        if (state === 'default') {
            // For default state, always try to use the stored original/default key.
            // textKeyForCurrentDisplay in this case should be the key for the default state if 'original-text-key' is missing.
            const keyToUseForDefault = storedDefaultTextKey || textKeyForCurrentDisplay;
            if (!keyToUseForDefault) { // Should not happen if logic is correct
                console.error("CRITICAL: No key available for resetting button to default text.", buttonElement);
                textToDisplay = "Error"; // Should not happen
            } else {
                 textToDisplay = this.languageService.getTranslation(keyToUseForDefault, this.languageIndex);
            }
        } else {
            // For 'loading', 'success', 'error' states, display the message corresponding to textKeyForCurrentDisplay
            textToDisplay = this.languageService.getTranslation(textKeyForCurrentDisplay, this.languageIndex);
        }
    
        if (state === 'success') {
            buttonElement.addClass('custom-green-border');
        } else if (state === 'error') {
            buttonElement.addClass('custom-red-border');
        }
    
        buttonElement.html(textToDisplay);
    
        if (state === 'success' || state === 'error') {
            // Caller should have set this.actionInProgress = true. It's reset in the timeout.
            setTimeout(() => {
                if (storedDefaultTextKey) {
                     buttonElement.html(this.languageService.getTranslation(storedDefaultTextKey, this.languageIndex));
                } else {
                    // Fallback if original-text-key was somehow not set during 'loading'
                    console.warn("Button success/error timeout: 'original-text-key' not found. Button text may not reset to its initial default.", buttonElement);
                    // Attempt to reset to a generic or passed textKeyForCurrentDisplay if it was meant to be default
                    // This situation indicates a logic flaw in how originalTextKeyToStore was passed or set.
                    // For safety, we might revert to textKeyForCurrentDisplay if it was an error message key,
                    // or a known default if that state was 'default' initially.
                    // However, the ideal is that storedDefaultTextKey is always available.
                     buttonElement.html(this.languageService.getTranslation(textKeyForCurrentDisplay, this.languageIndex)); // Fallback
                }
                buttonElement.removeClass('custom-red-border custom-green-border');
                this.actionInProgress = false; 
            }, duration);
        } else if (state === 'default') {
             this.actionInProgress = false; // Reset actionInProgress when explicitly set to default
        }
        // If state is 'loading', actionInProgress is true (set by caller) and remains true until a success/error/default state.
    }


    async _handleEncryptDecryptClick() {
        if (this.actionInProgress) return;
        this.actionInProgress = true; 
    
        const $button = this.selectors.encryptDecryptButton;
        const defaultButtonTextKey = 'encryptDecryptButton'; 
        const inputText = this.selectors.encryptMessageInput.val();
    
        if (!inputText) {
            this._setButtonState($button, 'errorInputRequired', 'error', 2000, defaultButtonTextKey); 
            // this.actionInProgress is reset by _setButtonState's timeout for error state.
            return;
        }
    
        const inputType = this._checkInputString(inputText); 
        const keyInput = this.selectors.keyInput.val();
    
        try {
            if (!inputType) { // Not emoji input -> Encrypt
                this._setButtonState($button, 'btnEncodeWorking', 'loading', 3000, defaultButtonTextKey);
                const emojiString = await this.encryptionOrchestrator.encryptMessage(inputText, keyInput);
                if (!emojiString) { // Orchestrator returns "" on failure
                    this._setButtonState($button, 'btnEncodeFailed', 'error', 3000, defaultButtonTextKey);
                } else {
                    this.selectors.encryptOutputTextarea.val(emojiString);
                    this._setButtonState($button, 'btnEncodeSuccess', 'success', 3000, defaultButtonTextKey);
                }
            } else { // Emoji input -> Decrypt
                this._setButtonState($button, 'btnDecodeWorking', 'loading', 3000, defaultButtonTextKey);
            const decryptedText = await this.encryptionOrchestrator.decryptMessage(inputText, keyInput);
            
            if (decryptedText === "") { // Orchestrator returns "" on failure
                this._setButtonState($button, 'btnDecodeFailed', 'error', 3000, defaultButtonTextKey); 
            } else {
                this.selectors.encryptOutputTextarea.val(decryptedText);
                this._setButtonState($button, 'btnDecodeSuccess', 'success', 3000, defaultButtonTextKey);
            }
        }
        } catch (error) {
            console.error("Error in _handleEncryptDecryptClick:", error);
            this._setButtonState($button, 'errorGeneral', 'error', 3000, defaultButtonTextKey);
        }
    }
    
    async _handleConvertClick() {
        if (this.actionInProgress) return;
        this.actionInProgress = true; 
    
        const $button = this.selectors.convertButton;
        const defaultButtonTextKey = 'convertButton'; 
        const inputText = this.selectors.convertMessageInput.val();
    
        if (!inputText) {
            this._setButtonState($button, 'error', 'error', 2000, defaultButtonTextKey);
            return;
        }
    
        const inputType = this._checkInputString(inputText);
        const doSimpleEncrypt = this.selectors.doSimpleEncryptionCheckbox.prop('checked');
    
        try {
            if (!inputType) { // Not emoji input -> Encode
                this._setButtonState($button, 'btnEncodeWorkingConvert', 'loading', 3000, defaultButtonTextKey);
                console.log(doSimpleEncrypt);
                const encodedText = await this.conversionOrchestrator.encodeToEmojis(inputText, this.customEmojiArray, doSimpleEncrypt);
                if (!encodedText) { // Orchestrator returns "" on failure
                    this._setButtonState($button, 'btnEncodeFailedConvert', 'error', 3000, defaultButtonTextKey);
                } else {
                    this.selectors.convertOutputTextarea.val(encodedText);
                    this._setButtonState($button, 'btnEncodeSuccessConvert', 'success', 3000, defaultButtonTextKey);
                }
            } else { // Emoji input -> Decode
                this._setButtonState($button, 'btnDecodeWorkingConvert', 'loading', 3000, defaultButtonTextKey);
            const decodedText = await this.conversionOrchestrator.decodeFromEmojis(inputText, this.customEmojiArray, doSimpleEncrypt);
            if (!decodedText && inputText) { // Orchestrator might return "" for empty or invalid emoji input
                this.selectors.convertOutputTextarea.val('');
                this._setButtonState($button, 'btnDecodeFailedConvert', 'error', 3000, defaultButtonTextKey);
            } else if (decodedText || !inputText) { // Also handle case where input was empty, so decoded is also empty
                this.selectors.convertOutputTextarea.val(decodedText); // Will be empty if input was empty
                // If input was empty, we don't want a "success" message, just reset to default.
                // If input was not empty and decodedText is not empty, it's a success.
                if (inputText) {
                    this._setButtonState($button, 'btnDecodeSuccessConvert', 'success', 3000, defaultButtonTextKey);
                } else {
                    this._setButtonState($button, defaultButtonTextKey, 'default', 0, defaultButtonTextKey);
                }
            }
        }
        } catch (error) {
            console.error("Error in _handleConvertClick:", error);
            this._setButtonState($button, 'errorGeneral', 'error', 3000, defaultButtonTextKey);
        }
    }

    async _handleGenerateKeyClick() {
        this.selectors.keyInput.val(await this.encryptionOrchestrator.generateRandomAppKey());
    }

    _handleCopyClick(element, buttonElement, successTextKey, useStaticSuccessSymbol = true, checkCondition = true) {
        if (!checkCondition) { // If a condition is passed and it's false (e.g. privateConversionId is null)
             this._setButtonState(buttonElement, 'error', 'error', 2000); // Show error for 2s
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
        
        setTimeout(() => {
            buttonElement.html(originalText); // Revert to original text (which should be from language file)
        }, 2000);
    }

    async _handleLoadKeyClick() {
        const $button = this.selectors.loadKeyButton;
        if (this.actionInProgress) return;
        this.actionInProgress = true;
        const defaultButtonTextKey = 'loadKeyButton';
        this._setButtonState($button, 'loadKey', 'loading', 3000, defaultButtonTextKey);

        try {
            const slot = this.selectors.keySlotSelect.val();
            const storedKey = await this.storageService.readKey(slot);

            if (storedKey !== null) {
                this.selectors.keyInput.val(storedKey);
                this._setButtonState($button, 'loadKey', 'success', 2000, defaultButtonTextKey);
            } else {
                this._setButtonState($button, 'error', 'error', 2000, defaultButtonTextKey);
            }
        } catch (error) {
            console.error("Error in _handleLoadKeyClick:", error);
            this._setButtonState($button, 'errorGeneral', 'error', 2000, defaultButtonTextKey);
        }
    }

    async _handleSaveKeyClick() {
        const $button = this.selectors.saveKeyButton;
        if (this.actionInProgress) return;
        this.actionInProgress = true;
        const defaultButtonTextKey = 'saveKeyButton';
        this._setButtonState($button, 'saveKey', 'loading', 3000, defaultButtonTextKey);

        try {
            const slot = this.selectors.keySlotSelect.val();
            const key = this.selectors.keyInput.val();

            if (key) {
                await this.storageService.saveKey(slot, key);
                this._setButtonState($button, 'saved', 'success', 2000, defaultButtonTextKey);
            } else {
                this._setButtonState($button, 'error', 'error', 2000, defaultButtonTextKey);
            }
        } catch (error) {
            console.error("Error in _handleSaveKeyClick:", error);
            this._setButtonState($button, 'errorGeneral', 'error', 2000, defaultButtonTextKey);
        }
    }

    async _handleGeneratePrivateConversionClick() {
        const $button = this.selectors.generatePrivateConversionButton;
        if (this.actionInProgress) return;
        this.actionInProgress = true;
        const defaultButtonTextKey = 'generatePrivateConversionButton';
        this._setButtonState($button, 'btnGeneratingAlgorithm', 'loading', 3000, defaultButtonTextKey);

        try {
            this.privateConversionId = this.utils.generateSecureRandomString();
            this.selectors.doSimpleEncryptionCheckbox.prop('checked', true);
            this.customEmojiArray = await this.emojiService.generateSecurePermutationFromString(this.privateConversionId, this.EMOJI_ARRAY);
            
            this.storageService.setPrivateAlgorithmId(this.privateConversionId);
            this._updateURLParameter();
            this._updateNavigationLinks();
            this._updateLanguageMenuLinks();

            this.selectors.privateConversionLink.val(window.location.href);
            this.selectors.disablePrivateConversionButton.removeClass('d-none');
            this.selectors.convertSimpleEncryptionSection.removeClass('d-none');
            this.selectors.convertTopMessage.removeClass('d-none').html(this.languageService.getTranslation('privateAlgorithmHeader', this.languageIndex));
            
            this._setButtonState($button, 'btnPrivateAlgorithmGenerated', 'success', 2000, defaultButtonTextKey);
        } catch (error) {
            console.error("Error in _handleGeneratePrivateConversionClick:", error);
            this._setButtonState($button, 'errorGeneral', 'error', 2000, defaultButtonTextKey);
        }
    }

    async _handleDisablePrivateConversionClick() {
        if (this.customEmojiArray) { 
            if (confirm(this.languageService.getTranslation('modalDisablePrivateAlgorithm', this.languageIndex))) {
                const $button = this.selectors.disablePrivateConversionButton;
                const defaultButtonTextKey = 'disablePrivateConversionButton';

                if (this.actionInProgress) return;
                this.actionInProgress = true;
                // No specific 'loading' message, but actionInProgress is managed.

                try {
                    this.selectors.doSimpleEncryptionCheckbox.prop("checked", false);
                    this.storageService.removePrivateAlgorithmId();
                    this.privateConversionId = null;
                    this.customEmojiArray = null;
                    this._updateURLParameter();
                    this._updateNavigationLinks();
                    this._updateLanguageMenuLinks();

                    this.selectors.privateConversionLink.val('');
                    this.selectors.convertTopMessage.addClass('d-none');
                    this.selectors.convertSimpleEncryptionSection.addClass('d-none');
                    
                    this._setButtonState($button, 'btnPrivateAlgorithmRemoved', 'success', 2000, defaultButtonTextKey); 
                    
                    setTimeout(() => {
                        $button.addClass('d-none');
                    }, 2000); 
                } catch (error) {
                    console.error("Error in _handleDisablePrivateConversionClick:", error);
                    // If an error occurs, ensure actionInProgress is reset by _setButtonState
                    this._setButtonState($button, 'errorGeneral', 'error', 2000, defaultButtonTextKey);
                }
            }
        }
    }
    
    _handleLanguageChangeClick(e) {
        e.preventDefault();
        const $clickedElement = $(e.currentTarget);
        const href = $clickedElement.attr('href');
        const newLangCode = $clickedElement.attr('data-lang-code');

        // The check below is kept as per instruction to ensure href is valid before pushState
        // Even with delegation, direct DOM manipulation or other scripts could potentially affect hrefs.
        if (typeof href !== 'string' || !href) { 
            return; 
        }
        
        this.storageService.setLanguage(newLangCode);
        this.languageCode = newLangCode;
        this.languageIndex = this.languageService.getLanguageIndexFromCode(newLangCode);

        this._updateUILanguage();
        this._updateMetadata();
        window.history.pushState(null, '', href); // Update URL
    }

    _handleDarkModeToggle() {
        if (this._isDarkModeEnabled()) {
            this._disableDarkMode();
        } else {
            this._enableDarkMode();
        }
    }
    
    _handleWindowPopState() {
        const targetSection = this._getSectionFromURL();
        this._transitionToSection(targetSection, false); // false because history is already handled

        const langCodeFromURL = this.languageService.getLanguageCodeFromURL();
        if (langCodeFromURL && langCodeFromURL !== this.languageCode) {
            this.languageCode = langCodeFromURL;
            this.languageIndex = this.languageService.getLanguageIndexFromCode(this.languageCode);
            this.storageService.setLanguage(this.languageCode); // Update storage
            this._updateUILanguage();
            this._updateMetadata(); // Update titles/descriptions for new language
        }
        // Update private algo state from URL on popstate
        this._updatePrivateAlgorithmFromUrl();
    }

    _handleDarkModeSystemChange(event) {
        // This is just for system changes, not user toggle.
        // We respect localStorage setting unless it's not set, then we follow system.
        if (this.storageService.getItem('nDarkMode') === null) { // Only adapt if user hasn't made a choice
             if (event.matches) {
                this._enableDarkMode(false); // false: not from toggle, don't save to LS
            } else {
                this._disableDarkMode(false);
            }
        }
    }
}

// Static property for dark mode class toggles
UIManager._darkModeClassToggles = [
            { selector: 'body', classes: 'dark-custom text-light dark-mode' },
            { selector: '.navbar', removeClasses: 'navbar-light bg-light', addClasses: 'navbar-dark dark-custom2' },
            { selector: '.main-content', classes: 'dark-custom text-light' },
            { selector: '.dropdown-menu', classes: 'dark-custom2' },
            { selector: '.dropdown-item', classes: 'text-light' },
            { selector: '.card', classes: 'dark-custom text-light' },
            { selector: '.card-header', classes: 'dark-custom2' },
            { selector: '.card-body', classes: 'dark-custom text-light' },
            { selector: '.faq-button',removeClasses: 'text-dark', classes: 'text-light' },
            { selector: '.collapse', classes: 'dark-custom2 text-light' },
            { selector: '.input-group-text', classes: 'border-dark dark-custom text-light' },
            { selector: '.form-control', classes: 'border-dark dark-custom text-light' },
            { selector: 'footer', removeClasses: 'bg-light', classes: 'dark-custom2 text-light' },
            { selector: '.btn', removeClasses: 'bg-secondary bg-light text-dark', classes: 'bg-secondary border-dark dark-custom2 text-light' },
];
