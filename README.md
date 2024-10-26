# EmojiCrypt Version 3.0.0 🌈

Your convenient and secure text encryption, where emojis are all that matters.
This repo is hosted here:

- (v3): [v2.nasaemoji.com](https://nasaemoji.com)
- (v2): [v2.nasaemoji.com](https://v2.nasaemoji.com) (**not recommended**)
- (v1): [v1.nasaemoji.com](https://v1.nasaemoji.com) (**not recommended**)

## Idea 💡

You want to send some confidential text and confuse prying eyes?
Fear no more: Simply generate a secret emoji key and use it to securely encrypt your message.
Guess what? The output is emojis too!
The idea is to implement a protocol where only you and the receiver knows what the key and the message is.

## Features ✅

### Usability ☺️

- Convert text to emojis and back using the convert option and generate a private conversion algorithm with an unique URL
- Generate emoji keys which look like encrypted messages
- Save keys within the browser
- Site can be added to homescreen on Android and iOS to act as an app (Webapp)
- The web app is available in 7 languages (feel free to improve the automated translations)
- Dark mode

### Basic Security Information 🔐

- All Encryption and decryption happens on the local device, no data is sent anywhere (Just be sure that there's no virus on your device)
- Emoji key generation has the same footprint as the encrypted output (it's generated using the encrypt function)

#### Advanced Security Information

- **Three Chained Encryption Methods:** Your text is encrypted using three chained encryption methods: AES-GCM, AES-CTR, and XOR; leveraging the browser Crypto API.
- The encryption step for AES-GCM use a random 96-bit IV that differs from the one used in the next AES encryption step; AES-CTR with a random 128-bit IV.
- **Final XOR Encryption:** The final XOR encryption employs a 4096-byte key derived through hash methods. These methods generate salts with SHA-256 in a deterministic manner from a fixed seed and concatenate them with the used key (using SHA-512 for the final rounds) before combining everything into a single key.
- Key Hashing Process: During encryption, your key is hashed with four SHA algorithms in a long loop, making it difficult to brute-force the key. The length of the loop also depends on the key.
- **SHA Algorithms Used:** The hash loop utilizes SHA-1, SHA-256, SHA-384, and SHA-512 with equal weighting (4/4/4/4).
- **Data Input for Hashing:** In each round, the data fed into each hash algorithm consists of:
    1. The last key
    2. The key before that
    3. The key before that
    4. A custom salt that differs in each of the 16 switch cases
- **Custom Hash Loop Lengths:** As of version 1.1.0, different encryption algorithms have varying hash loop lengths and intermediate salt integers. Therefore, each of the three encryption algorithms uses a custom, deterministically derived key: 256-bit for AES and 4096-byte for XOR (as of version 3.0.0).

## Includes ⤴️

- jQuery for HTML manipulation
- Bootstrap 4 for CSS
- Algorithm to map binary output into emojis

## Download for local execution

- You can download the latest release [here](https://github.com/mqxym/EmojiCrypt/releases)
- The download should contain all dependencies and does not need an internet connection to work

Thanks to all the people on stackoverflow and to the creators of the used libraries and functions!
