# EmojiCrypt Version 3.4.5 🌈

Your convenient and secure text encryption, where emojis are all that matters.
This repo is hosted here:

- (v3): [nasaemoji.com](https://nasaemoji.com)
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
- Auto Dark mode

### Basic Security Information 🔐

- All Encryption and decryption happens on the local device, no data is sent anywhere (Just be sure that there's no virus on your device)
- Emoji key generation has the same footprint as the encrypted output (it's generated using the encrypt function)

#### Advanced Encryption Security Information

- Three Chained Encryption Methods: Your text is encrypted using three chained encryption methods: AES-GCM, AES-CTR, and XOR; leveraging the browser Crypto API.
- The encryption step for AES-GCM use a random 96-bit IV that differs from the one used in the next AES encryption step; AES-CTR with a random 128-bit IV.
- Final XOR Encryption: The final XOR encryption employs a 4096-byte key derived through hash methods. These methods generate salts with SHA-256 in a deterministic manner from a fixed seed and concatenate them with the used key (using SHA-512 for the final rounds) before combining everything into a single key (PBKDF2 may be used in the future).
- Key Hashing Process: During encryption, your key is hashed with four SHA algorithms in a long loop, making it difficult to brute-force the key. The length of the loop also depends on the key.
- Hash salts: As of version 3.1.0, each encryption process uses a random 48-bit salt that is fed into the complex hashing algorithm, ensuring each encryption operation has a unique key.
- Hash Structure: There is a *main* loop and a *small* loop.
- Loop length of main: As of version 3.2.0, the loop length is calculated from the seed and the encryption key.
- Data Input for Hashing: In each *main* round, the data fed into the *small* hash algorithm consists of:
    1. The hashed bytes from the last small round (in the first round, a seed is used as input)
    2. A variable salt that is derived from bit operations with the main loop counter
    3. The random, 48-bit custom salt
- SHA Algorithms Used: The *small* hash loop utilizes SHA-1, SHA-256, SHA-384, and SHA-512 with equal weighting (4/4/4/4).
- Data Input for Hashing 2: In each *small* round, the data fed into each hash algorithm consists of:
    1. The last hash
    2. The hash before that
    3. The hash before that
    4. A custom, fixed salt that differs in each of the 16 switch cases
- Custom Hash Loop Lengths: As of version 1.1.0, different encryption algorithms have varying hash loop lengths and intermediate salt integers. Therefore, each of the three encryption algorithms uses a custom, deterministically derived key: 256-bit for AES and 4096-byte for XOR (as of version 3.0.0)
- *On modern devices, the hashing time can range from a minimum of ~700 to a maximum of ~1000 miliseconds and it is dependent of the random salt resulting in more or less hash rounds and a different distribution in more computationally intensive hash functions (SHA-384,SHA-512)*
- Additional obfuscation: As of version 3.1.0, the binary-to-emoji algorithm employs a unique emoji sorting order derived from the input key.

*Why not use a standard key derivation process for obtaining the AES Keys?*
I chose to implement a custom hash algorithm to introduce additional complexity for attackers attempting brute force attacks. This approach incorporates multiple fixed and variable salts and avoids a simple iterative hashing process by including hashes from earlier rounds, not just the last one.

## Includes ⤴️

- jQuery for HTML manipulation
- Bootstrap 4 for CSS
- A javascript library `js/lib.js` containing all the algorithms

## Download for local execution

- You can download the latest release [here](https://github.com/mqxym/EmojiCrypt/releases)
- The download should contain all dependencies and does not need an internet connection to work
