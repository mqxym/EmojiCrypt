# EmojiCrypt Version 1.1.0 🌈

Your convenient and secure text encryption, where emojis are all that matters.
This repo is hosted here: [nasaemoji.com](https://nasaemoji.com)

## Idea 💡

You want to send some confidential text and confuse prying eyes?
Fear no more: Simply generate a secret emoji key and use it to securely encrypt your message.
Guess what? The output is emojis too!
The idea is to implement a protocol where only you and the receiver knows what the key and the message is.

## Features ✅

### Usability ☺️

- Generate emoji keys which look like encrypted messages
- Save keys within the browser
- Site can be added to homescreen on Android and iOS to act as an app
- Works in Whatsapp, iMessage, Snapchat, Instagram for emojitastic communication
- The web app is available in 6 languages (feel free to improve the automated translations)

### Security 🔐

- All Encryption and decryption happens on the local device, no data is sent anywhere (Just be sure that there's no virus on your device)
- Your text is encrypted with 3 chained encryption methods (AES256, Blowfish, XOR)
- When encrypting, your key is hashed with 7 algorithms in a long loop, which means it's hard to brute force the key (The length of the loop is key dependend).
- Different hash loop length with different salt integers for each encryption algorithm (new in version 1.1.0)

## Includes ⤴️

- CryptoJS library for encrypting methods Blowfish and AES, and for hashing methods
- jQuery for HTML manipulation
- Bootstrap 4 for CSS
- Algorithm to convert hexadecimal data into emojis and generate a set of used emojis based on the key (key acts as an emoji seed)
- Option to output the encrypted data in hexadecimal or base64 instead

Thanks to all the people on stackoverflow and to the creators of the used libraries and functions!
