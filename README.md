# EmojiCrypt Version 1.0.0 🌈

Your convenient and secure text encryption, where emojis are all that matters.
This repo is hosted here: https://nasaemoji.com

## Idea 💡

You want to send some confidential text and confuse prying eyes?
Fear no more: Simply generate a secret emoji key and use it to securely encrypt your message.
Guess what? The output is emojis too! 
The idea is to implement a protocol where only you and the receiver knows what the key and the message is. 

## Features ✅

### Usability ☺️

- Site can be added to homescreen on Android and iOS to act as an app
- Keys can be stored in localStorage within the browser
- Works in Whatsapp, Snapchat, Instagram for emojitastic communication

### Security 🔐

- All Encryption and decryption happens on the local device, no data is sent anywhere (Just be sure that there's no virus on your device)
- Your text is encrypted with 3 chained encryption methods (AES256, Blowfish, XOR)
- When encrypting, your key is hashed with 6 hashing methods in a long loop, which means it's hard to brute force the key.

## Includes ⤴️

- CryptoJS library for encrypting methods Blowfish and AES, and for hashing methods
- jQuery for html manipulation

Thanks to all the people on stackoverflow and to the creators of the used libraries and functions!
