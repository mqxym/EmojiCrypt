# EmojiCrypt Version 2.2.3 🌈

Your convenient and secure text encryption, where emojis are all that matters.
This repo is hosted here:

- (v2): [nasaemoji.com](https://nasaemoji.com)
- (v1): [v1.nasaemoji.com](https://v1.nasaemoji.com) (not recommended)

## Idea 💡

You want to send some confidential text and confuse prying eyes?
Fear no more: Simply generate a secret emoji key and use it to securely encrypt your message.
Guess what? The output is emojis too!
The idea is to implement a protocol where only you and the receiver knows what the key and the message is.

## Features ✅

### Usability ☺️

- Convert text to emojis and back using the convert option
- Generate emoji keys which look like encrypted messages
- Save keys within the browser
- Site can be added to homescreen on Android and iOS to act as an app (Webapp)
- The web app is available in 6 languages (feel free to improve the automated translations)
- Dark mode

### Security 🔐

- All Encryption and decryption happens on the local device, no data is sent anywhere (Just be sure that there's no virus on your device)
- Emoji key generation has the same footprint as the encrypted output (it's generated using the encrypt function)
- Your text is encrypted with 3 chained encryption methods (AES-256, Blowfish, XOR) using the robust [CryptoJS library]( https://cryptojs.gitbook.io/docs)
- When encrypting, your key is hashed with 7 algorithms in a long loop, which means it's hard to brute force the key (The length of the loop is key dependend).
- Different hash loop length with different salt integers for each encryption algorithm (new in version 1.1.0)

## Includes ⤴️

- CryptoJS library for encrypting methods Blowfish and AES, and for hashing methods
- jQuery for HTML manipulation
- Bootstrap 4 for CSS
- Algorithm to map binary output into emojis

## Download for local execution

- You can download the latest release [here](https://github.com/mqxym/EmojiCrypt/releases)
- The download should contain all dependencies and does not need an internet connection to work

Thanks to all the people on stackoverflow and to the creators of the used libraries and functions!
