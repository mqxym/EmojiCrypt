# EmojiCrypt Version 3.4.5 🌈

Your convenient and secure web app for text encryption and conversion, where emojis are all that matters.
This repo is hosted here:

- (v3.x): [nasaemoji.com](https://nasaemoji.com)
- (latest v2): [v2.nasaemoji.com](https://v2.nasaemoji.com) (**not recommended**)
- (latest v1): [v1.nasaemoji.com](https://v1.nasaemoji.com) (**not recommended**)

## ☑️ Emoji Features

### 🔴 Text To Emoji 

> (`?convert` default app)

- Basic algorithm 
- `input(a) = output(a)`: map all emojis to the binary encoded input, same input = same output

### 🟠 Private Algorithm For Text To Emoji 

> `?convert&id={x}`, x can be generated

- Generates a secure permutation of the base emoji set using the generated 10 character key (x)
- `input(a, map(x)) -> output(b)`: same input = same output

### 🟡 Private Algorithm + Simple Encrypt 

> `?convert&id={x}`, simple encryption box checked (default)

- Uses the secure permutation and a *PBKDF2* generated salted key to encrypt the input with XOR
- `input(a, key) -> (unique mapping) -> XOR ( input(a), PBKDF2(key, salt: random(12-byte)) ) -> output(c) `
- Every output is different because of the random salt
- The derived key is always the same length as text to encrypt

### 🟢 Layered Encryption With Emojis

> `?encrypt`, input and key always required

- Encrypts text with emoji; generate emoji keys which look like encrypted messages
- Keys get hashed using custom key derivation method KDVX with 3 output stages [0|1|2]
- Encryption methods are layered:
```
XOR( KDVX[2](key), 
  AES-CTR( KDVX[1](key),
    AES-GCM( KDVX[0](key), input, rnd. 12-byte IV),
  rnd. 16-byte IV
  )
)
```
- KDVX[2] is 4096-byte long; KDVX[1|2] both 256-byte

#### 💡 Pitch Behind The Encryption Method 

You want to send some confidential text and confuse prying eyes?
Fear no more: Simply generate a secret emoji key and use it to securely encrypt your message.
Guess what? The output is emojis too!
The idea is to implement a protocol where only you and the receiver knows what the key and the message is.
  
### 🌐 General App Features 

- Auto dark mode
- Auto language detection
  - The web app is available in 7 languages (feel free to improve the automated translations)
- Save encryption keys within the browsers localStorage
- Site can be added to homescreen on Android and iOS to act as an app (Webapp)
- The last visited site is saved 

> The following section will be rewritten soon:

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
- Bootstrap 4 for CSS and `css/custom.css` styling
- A javascript library `js/mainLibrary.js` containing all the algorithms

## Download for local execution

- You can download the latest release [here](https://github.com/mqxym/EmojiCrypt/releases)
- The download should contain all dependencies and does not need an internet connection to work
