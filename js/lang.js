/**
 * Retrieves the translated text for a given key and language index.
 * @param {string} key - The translation key (should match the element ID).
 * @param {number} langIndex - The index of the language (0-based).
 * @returns {string} The translated text corresponding to the key and language index.
 */
function getTranslation(key, langIndex) {
    const translations = {
        // Navbar elements
        "navbarBrand": [
            "Text 📄 🔄 🌈 Emoji",
            "Text 📄 🔄 🌈 Emoji", // German
            "文本 📄 🔄 🌈 Emoji", // Modern Chinese
            "Текст 📄 🔄 🌈 Emoji", // Russian
            "Texto 📄 🔄 🌈 Emoji", // Spanish
            "Texte 📄 🔄 🌈 Emoji", // French
            "", // Placeholder for additional languages
            ""
        ],
        "enableDarkMode": [
            "Dark Mode",
            "Dunkler Modus",
            "深色模式",
            "Тёмный режим",
            "Modo Oscuro",
            "Mode Sombre",
            "",
            ""
        ],
        "disableDarkMode": [
            "Light Mode",
            "Heller Modus",
            "浅色模式",
            "Светлый режим",
            "Modo Claro",
            "Mode Clair",
            "",
            ""
        ],
        "chooseAppMenu": [
            "Choose App",
            "App auswählen",
            "选择应用",
            "Выбрать приложение",
            "Elegir aplicación",
            "Choisir l'application",
            "",
            ""
        ],
        "convertMenu": [
            "🔄 Convert",
            "🔄 Konvertieren",
            "🔄 转换",
            "🔄 Конвертировать",
            "🔄 Convertir",
            "🔄 Convertir",
            "",
            ""
        ],
        "encryptMenu": [
            "🔐 Encrypt",
            "🔐 Verschlüsseln",
            "🔐 加密",
            "🔐 Шифровать",
            "🔐 Encriptar",
            "🔐 Chiffrer",
            "",
            ""
        ],
        "aboutMenu": [
            "About",
            "Über",
            "关于",
            "О приложении",
            "Acerca de",
            "À propos",
            "",
            ""
        ],
        // Encryption section elements
        "clearEncryptInputButton": [
            "Delete <br> Message",
            "Nachricht <br> löschen",
            "删除<br>消息",
            "Удалить <br> сообщение",
            "Eliminar <br> Mensaje",
            "Supprimer <br> Message",
            "",
            ""
        ],
        "encryptDecryptButton": [
            "🔀 Encrypt / Decrypt",
            "🔀 Verschlüsseln / Entschlüsseln",
            "🔀 加密 / 解密",
            "🔀 Шифровать / Расшифровывать",
            "🔀 Encriptar / Desencriptar",
            "🔀 Chiffrer / Déchiffrer",
            "",
            ""
        ],
        "copyKeyButton": [
            "Copy",
            "Kopieren",
            "复制",
            "Копировать",
            "Copiar",
            "Copier",
            "",
            ""
        ],
        "keyInstructions": [
            "Load or save keys",
            "Schlüssel laden oder speichern",
            "加载或保存密钥",
            "Загрузить или сохранить ключи",
            "Cargar o guardar claves",
            "Charger ou sauvegarder les clés",
            "",
            ""
        ],
        "loadKeyButton": [
            "📲 Load",
            "📲 Laden",
            "📲 加载",
            "📲 Загрузить",
            "📲 Cargar",
            "📲 Charger",
            "",
            ""
        ],
        "saveKeyButton": [
            "💾 Save",
            "💾 Speichern",
            "💾 保存",
            "💾 Сохранить",
            "💾 Guardar",
            "💾 Sauvegarder",
            "",
            ""
        ],
        "copyEncryptOutputButton": [
            "Copy <br>to clipboard",
            "In Zwischenablage <br> kopieren",
            "复制<br>到剪贴板",
            "Копировать <br>в буфер обмена",
            "Copiar <br>al portapapeles",
            "Copier <br>dans le presse-papiers",
            "",
            ""
        ],
        "encryptOutputTextarea": [
            "Decrypted/Encrypted message",
            "Entschlüsselte/Verschlüsselte Nachricht",
            "解密/加密的消息",
            "Расшифрованное/зашифрованное сообщение",
            "Mensaje desencriptado/encriptado",
            "Message déchiffré/chiffré",
            "",
            ""
        ],
        // Convert section elements
        "convertButton": [
            "🔄 Convert",
            "🔄 Konvertieren",
            "🔄 转换",
            "🔄 Конвертировать",
            "🔄 Convertir",
            "🔄 Convertir",
            "",
            ""
        ],
        "clearConvertInputButton": [
            "Delete <br> Message",
            "Nachricht <br> löschen",
            "删除<br>消息",
            "Удалить <br> сообщение",
            "Eliminar <br> Mensaje",
            "Supprimer <br> Message",
            "",
            ""
        ],
        "copyConvertOutputButton": [
            "Copy <br>to clipboard",
            "In <br> Zwischenablage <br> kopieren",
            "复制<br>到剪贴板",
            "Копировать <br>в буфер обмена",
            "Copiar <br>al <br>portapapeles",
            "Copier <br>dans le <br>presse-papiers",
            "",
            ""
        ],
        "convertOutputTextarea": [
            "Converted message",
            "Konvertierte Nachricht",
            "转换后的消息",
            "Преобразованное сообщение",
            "Mensaje convertido",
            "Message converti",
            "",
            ""
        ],
        "encryptMessageInput": [
            "Message",
            "Nachricht",
            "消息",
            "Сообщение",
            "Mensaje",
            "Message",
            "",
            ""
        ],
        "convertMessageInput": [
            "Message",
            "Nachricht",
            "消息",
            "Сообщение",
            "Mensaje",
            "Message",
            "",
            ""
        ],
        "keyInput": [
            "(optional)",
            "(optional)",
            "(可选)",
            "(необязательно)",
            "(opcional)",
            "(facultatif)",
            "",
            ""
        ],
        // Messages and other elements
        "footerHighlight": [
            "Secure on-device encryption! Version " + getVersion() + "<br> Combined AES-256, Blowfish & XOR <br>No data sent. No cookies = no tracking. No logging.",
            "Sichere Verschlüsselung auf dem Gerät! Version " + getVersion() + "<br> Kombiniert AES-256, Blowfish & XOR <br>Keine Daten werden gesendet. Keine Cookies = kein Tracking. Kein Logging.",
            "设备上的安全加密！版本 " + getVersion() + "<br> 组合 AES-256、Blowfish 和 XOR <br> 不发送数据。没有 Cookie = 无跟踪。无日志。",
            "Безопасное шифрование на устройстве! Версия " + getVersion() + "<br> Комбинация AES-256, Blowfish & XOR <br> Данные не отправляются. Нет куки = нет отслеживания. Нет логирования.",
            "¡Encriptación segura en el dispositivo! Versión " + getVersion() + "<br> Combinación de AES-256, Blowfish y XOR <br> No se envían datos. Sin cookies = sin seguimiento. Sin registros.",
            "Chiffrement sécurisé sur l'appareil ! Version " + getVersion() + "<br> Combinaison AES-256, Blowfish & XOR <br> Aucune donnée envoyée. Pas de cookies = pas de suivi. Pas de journalisation.",
            "",
            ""
        ],
        "footerSource": [
            "Sourcecode (Github)",
            "Quellcode (Github)",
            "源代码（Github）",
            "Исходный код (Github)",
            "Código fuente (Github)",
            "Code source (Github)",
            "",
            ""
        ],
        "explanation": [
            "<h6>Encrypt or decrypt texts or messages with a password. The output is emojis, the key is emojis. With NasaEmoji, you can send secret messages to anyone! Generate and share a common key with your recipient using a method of your choice. Save the key in one of the 5 slots for ease of access.</h6>",
            "<h6>Verschlüssele oder entschlüssele Texte oder Nachrichten mit einem Passwort. Die Ausgabe sind Emojis, der Schlüssel sind Emojis. Mit NasaEmoji kannst du geheime Nachrichten an jeden senden! Erstelle und teile einen gemeinsamen Schlüssel mit deinem Empfänger auf eine beliebige Weise. Speichere den Schlüssel in einem der 5 Slots, um leichter darauf zugreifen zu können.</h6>",
            "<h6>使用密码加密或解密文本或消息。输出是表情符号，密钥是表情符号。使用 NasaEmoji，你可以向任何人发送秘密消息！使用你选择的方法生成并与你的收件人分享一个共同的密钥。将密钥保存在 5 个插槽中的一个，以方便访问。</h6>",
            "<h6>Шифруйте или расшифровывайте тексты или сообщения с помощью пароля. Выводятся эмодзи, ключ — эмодзи. С NasaEmoji вы можете отправлять секретные сообщения кому угодно! Создайте и поделитесь общим ключом с получателем любым удобным способом. Сохраните ключ в одном из 5 слотов для удобного доступа.</h6>",
            "<h6>¡Cifra o descifra textos o mensajes con una contraseña! La salida son emojis, la clave son emojis. Con NasaEmoji, ¡puedes enviar mensajes secretos a cualquiera! Genera y comparte una clave común con tu destinatario usando el método que prefieras. Guarda la clave en uno de los 5 espacios para acceder fácilmente.</h6>",
            "<h6>Tu peux chiffrer ou déchiffrer des textes ou des messages avec un mot de passe. Le résultat ? Des emojis, et la clé, c'est aussi des emojis. Avec NasaEmoji, tu peux envoyer des messages secrets à qui tu veux ! Crée et partage une clé avec ton destinataire comme tu veux. Garde la clé dans un des 5 emplacements pour la retrouver facilement.</h6>",
            "",
            ""
        ],
        // Status messages
        "saved": [
            "💾 Saved",
            "💾 Gespeichert",
            "💾 已保存",
            "💾 Сохранено",
            "💾 Guardado",
            "💾 Enregistré",
            "",
            ""
        ],
        "loadKey": [
            "📲 Loaded",
            "📲 Geladen",
            "📲 已加载",
            "📲 Загружено",
            "📲 Cargado",
            "📲 Chargé",
            "",
            ""
        ],
        "error": [
            "❌ Error",
            "❌ Fehler",
            "❌ 错误",
            "❌ Ошибка",
            "❌ Error",
            "❌ Erreur",
            "",
            ""
        ],
        // Messages during encryption/decryption
        "btnEncodeWorking": [
            "⚙️ Encrypting...",
            "⚙️ Verschlüsseln...",
            "⚙️ 加密中...",
            "⚙️ Шифруем...",
            "⚙️ Encriptando...",
            "⚙️ Chiffrement...",
            "",
            ""
        ],
        "btnEncodeFailed": [
            "💔 Error. Try again?",
            "💔 Fehler. Nochmal versuchen?",
            "💔 出错。再试一次？",
            "💔 Ошибка. Попробуйте снова?",
            "💔 Error. ¿Intentar de nuevo?",
            "💔 Erreur. Réessayer ?",
            "",
            ""
        ],
        "btnEncodeSuccess": [
            "💚 Encrypted!",
            "💚 Verschlüsselt!",
            "💚 已加密！",
            "💚 Зашифровано!",
            "💚 ¡Encriptado!",
            "💚 Chiffré !",
            "",
            ""
        ],
        "btnDecodeWorking": [
            "⚙️ Decrypting...",
            "⚙️ Entschlüsseln...",
            "⚙️ 解密中...",
            "⚙️ Расшифровываем...",
            "⚙️ Desencriptando...",
            "⚙️ Déchiffrement...",
            "",
            ""
        ],
        "btnDecodeFailed": [
            "💔 Failed. Wrong key/password?",
            "💔 Fehlgeschlagen. Falsches Passwort?",
            "💔 失败。密钥/密码错误？",
            "💔 Не удалось. Неправильный ключ/пароль?",
            "💔 Falló. ¿Clave/contraseña incorrecta?",
            "💔 Échec. Mauvaise clé/mot de passe ?",
            "",
            ""
        ],
        "btnDecodeSuccess": [
            "💚 Decrypted!",
            "💚 Entschlüsselt!",
            "💚 已解密！",
            "💚 Расшифровано!",
            "💚 ¡Desencriptado!",
            "💚 Déchiffré !",
            "",
            ""
        ],
        // Messages during conversion
        "btnEncodeWorkingConvert": [
            "⚙️ Encoding...",
            "⚙️ Kodieren...",
            "⚙️ 编码中...",
            "⚙️ Кодируем...",
            "⚙️ Codificando...",
            "⚙️ Encodage...",
            "",
            ""
        ],
        "btnEncodeFailedConvert": [
            "💔 Encoding failed",
            "💔 Kodierung fehlgeschlagen",
            "💔 编码失败",
            "💔 Кодирование не удалось",
            "💔 Falló la codificación",
            "💔 Échec de l'encodage",
            "",
            ""
        ],
        "btnEncodeSuccessConvert": [
            "💚 Encoded!",
            "💚 Kodiert!",
            "💚 已编码！",
            "💚 Закодировано!",
            "💚 ¡Codificado!",
            "💚 Encodé !",
            "",
            ""
        ],
        "btnDecodeWorkingConvert": [
            "⚙️ Decoding...",
            "⚙️ Dekodieren...",
            "⚙️ 解码中...",
            "⚙️ Декодируем...",
            "⚙️ Decodificando...",
            "⚙️ Décodage...",
            "",
            ""
        ],
        "btnDecodeFailedConvert": [
            "💔 Decoding failed",
            "💔 Dekodierung fehlgeschlagen",
            "💔 解码失败",
            "💔 Декодирование не удалось",
            "💔 Falló la decodificación",
            "💔 Échec du décodage",
            "",
            ""
        ],
        "btnDecodeSuccessConvert": [
            "💚 Decoded!",
            "💚 Dekodiert!",
            "💚 已解码！",
            "💚 Декодировано!",
            "💚 ¡Decodificado!",
            "💚 Décodé !",
            "",
            ""
        ],
        // FAQ
        "faqQuestion1": [
            "What is NasaEmoji?",
            "Was ist NasaEmoji?",
            "什么是 NasaEmoji？",
            "Что такое NasaEmoji?",
            "¿Qué es NasaEmoji?",
            "Qu'est-ce que NasaEmoji ?",
            "",
            ""
        ],
        "faqAnswer1": [
            "NasaEmoji is a secure encryption tool that allows you to encrypt and decrypt messages using emojis as keys and output.",
            "NasaEmoji ist ein sicheres Verschlüsselungstool, mit dem du Nachrichten mithilfe von Emojis als Schlüssel und Ausgabe verschlüsseln und entschlüsseln kannst.",
            "NasaEmoji 是一个安全的加密工具，允许您使用表情符号作为密钥和输出来加密和解密消息。",
            "NasaEmoji — это безопасный инструмент шифрования, который позволяет шифровать и расшифровывать сообщения, используя эмодзи в качестве ключей и вывода.",
            "NasaEmoji es una herramienta de cifrado segura que le permite cifrar y descifrar mensajes usando emojis como claves y salida.",
            "NasaEmoji est un outil de chiffrement sécurisé qui te permet de chiffrer et déchiffrer des messages en utilisant des emojis comme clés et sortie.",
            "",
            ""
        ],
        "faqQuestion2": [
            "How do I encrypt a message?",
            "Wie verschlüssele ich eine Nachricht?",
            "如何加密消息？",
            "Как зашифровать сообщение?",
            "¿Cómo cifro un mensaje?",
            "Comment chiffrer un message ?",
            "",
            ""
        ],
        "faqAnswer2": [
            "To encrypt a message, enter your message in the input field, generate or enter a key, and click the \"Encrypt\" button. The encrypted message will be displayed in emojis.",
            "Um eine Nachricht zu verschlüsseln, gib deine Nachricht in das Eingabefeld ein, generiere oder gib einen Schlüssel ein und klicke auf die Schaltfläche \"Verschlüsseln\". Die verschlüsselte Nachricht wird in Emojis angezeigt.",
            "要加密消息，请在输入字段中输入您的消息，生成或输入密钥，然后点击“加密”按钮。加密的消息将以表情符号显示。",
            "Чтобы зашифровать сообщение, введите его в поле ввода, сгенерируйте или введите ключ и нажмите кнопку \"Зашифровать\". Зашифрованное сообщение будет отображаться в виде эмодзи.",
            "Para cifrar un mensaje, ingresa tu mensaje en el campo de entrada, genera o ingresa una clave y haz clic en el botón \"Encriptar\". El mensaje cifrado se mostrará en emojis.",
            "Pour chiffrer un message, entre ton message dans le champ de saisie, génère ou entre une clé, puis clique sur le bouton \"Chiffrer\". Le message chiffré s'affichera en emojis.",
            "",
            ""
        ],
        "faqQuestion3": [
            "How do I decrypt a message?",
            "Wie entschlüssele ich eine Nachricht?",
            "如何解密消息？",
            "Как расшифровать сообщение?",
            "¿Cómo descifro un mensaje?",
            "Comment déchiffrer un message ?",
            "",
            ""
        ],
        "faqAnswer3": [
            "To decrypt a message, paste the emoji-encrypted message into the input field, enter the key used to encrypt it, and click the \"Decrypt\" button.",
            "Um eine Nachricht zu entschlüsseln, füge die emoji-verschlüsselte Nachricht in das Eingabefeld ein, gib den verwendeten Schlüssel ein und klicke auf die Schaltfläche \"Entschlüsseln\".",
            "要解密消息，请将表情符号加密的消息粘贴到输入字段中，输入用于加密的密钥，然后点击“解密”按钮。",
            "Чтобы расшифровать сообщение, вставьте зашифрованное эмодзи сообщение в поле ввода, введите ключ, который использовался для шифрования, и нажмите кнопку \"Расшифровать\".",
            "Para descifrar un mensaje, pega el mensaje cifrado con emojis en el campo de entrada, ingresa la clave utilizada para cifrarlo y haz clic en el botón \"Desencriptar\".",
            "Pour déchiffrer un message, colle le message chiffré en emojis dans le champ de saisie, entre la clé utilisée pour le chiffrer et clique sur le bouton \"Déchiffrer\".",
            "",
            ""
        ],
        "faqQuestion4": [
            "How do I generate an emoji key?",
            "Wie erstelle ich einen Emoji-Schlüssel?",
            "如何生成表情符号密钥？",
            "Как сгенерировать ключ эмодзи?",
            "¿Cómo genero una clave de emoji?",
            "Comment générer une clé emoji ?",
            "",
            ""
        ],
        "faqAnswer4": [
            "You can generate a random emoji key by clicking the \"Generate Key\" button. The key is used to encrypt and decrypt messages.",
            "Du kannst einen zufälligen Emoji-Schlüssel erstellen, indem du auf die Schaltfläche \"Schlüssel generieren\" klickst. Der Schlüssel wird zum Verschlüsseln und Entschlüsseln von Nachrichten verwendet.",
            "您可以通过点击“生成密钥”按钮来生成一个随机的表情符号密钥。该密钥用于加密和解密消息。",
            "Вы можете сгенерировать случайный ключ эмодзи, нажав кнопку \"Сгенерировать ключ\". Ключ используется для шифрования и расшифровки сообщений.",
            "Puedes generar una clave de emoji aleatoria haciendo clic en el botón \"Generar clave\". La clave se utiliza para cifrar y descifrar mensajes.",
            "Tu peux générer une clé emoji aléatoire en cliquant sur le bouton \"Générer une clé\". La clé est utilisée pour chiffrer et déchiffrer les messages.",
            "",
            ""
        ],
        "faqQuestion5": [
            "Is my data secure?",
            "Sind meine Daten sicher?",
            "我的数据安全吗？",
            "Мои данные в безопасности?",
            "¿Mis datos están seguros?",
            "Mes données sont-elles sécurisées ?",
            "",
            ""
        ],
        "faqAnswer5": [
            "Yes, all encryption and decryption happen locally on your device. No data is sent anywhere, ensuring your messages remain private.",
            "Ja, alle Verschlüsselungen und Entschlüsselungen erfolgen lokal auf deinem Gerät. Es werden keine Daten gesendet, wodurch deine Nachrichten privat bleiben.",
            "是的，所有加密和解密都在您的设备上本地完成。不会发送任何数据，确保您的消息保持私密。",
            "Да, все шифрование и расшифровка происходят локально на вашем устройстве. Данные никуда не отправляются, что обеспечивает конфиденциальность ваших сообщений.",
            "Sí, todo el cifrado y descifrado ocurre localmente en tu dispositivo. No se envía ningún dato, lo que garantiza que tus mensajes permanezcan privados.",
            "Oui, tout le chiffrement et le déchiffrement se font localement sur ton appareil. Aucune donnée n'est envoyée, garantissant que tes messages restent privés.",
            "",
            ""
        ],

        // FAQs 6 to 20
        "faqQuestion6": [
            "Can I convert text to emojis without encryption?",
            "Kann ich Text ohne Verschlüsselung in Emojis umwandeln?",
            "我可以在不加密的情况下将文本转换为表情符号吗？",
            "Могу ли я конвертировать текст в эмодзи без шифрования?",
            "¿Puedo convertir texto a emojis sin cifrado?",
            "Puis-je convertir du texte en emojis sans chiffrement ?",
            "",
            ""
        ],
        "faqAnswer6": [
            "Yes, NasaEmoji allows you to convert any text to emojis and back without encryption using the \"Convert\" feature.",
            "Ja, NasaEmoji ermöglicht es dir, mit der Funktion \"Konvertieren\" jeden Text ohne Verschlüsselung in Emojis umzuwandeln und zurück.",
            "是的，NasaEmoji 允许您使用“转换”功能在不加密的情况下将任何文本转换为表情符号并返回。",
            "Да, NasaEmoji позволяет конвертировать любой текст в эмодзи и обратно без шифрования, используя функцию \"Конвертировать\".",
            "Sí, NasaEmoji te permite convertir cualquier texto a emojis y viceversa sin cifrado usando la función \"Convertir\".",
            "Oui, NasaEmoji te permet de convertir n'importe quel texte en emojis et inversement sans chiffrement en utilisant la fonction \"Convertir\".",
            "",
            ""
        ],
        "faqQuestion7": [
            "What encryption algorithms does NasaEmoji use?",
            "Welche Verschlüsselungsalgorithmen verwendet NasaEmoji?",
            "NasaEmoji 使用了哪些加密算法？",
            "Какие алгоритмы шифрования использует NasaEmoji?",
            "¿Qué algoritmos de cifrado utiliza NasaEmoji?",
            "Quels algorithmes de chiffrement NasaEmoji utilise-t-il ?",
            "",
            ""
        ],
        "faqAnswer7": [
            "NasaEmoji uses a combination of AES-256, Blowfish, and XOR encryption algorithms to secure your messages.",
            "NasaEmoji verwendet eine Kombination aus AES-256, Blowfish und XOR Verschlüsselungsalgorithmen, um deine Nachrichten zu sichern.",
            "NasaEmoji 使用 AES-256、Blowfish 和 XOR 加密算法的组合来保护您的消息。",
            "NasaEmoji использует комбинацию алгоритмов шифрования AES-256, Blowfish и XOR для защиты ваших сообщений.",
            "NasaEmoji utiliza una combinación de algoritmos de cifrado AES-256, Blowfish y XOR para asegurar tus mensajes.",
            "NasaEmoji utilise une combinaison des algorithmes de chiffrement AES-256, Blowfish et XOR pour sécuriser tes messages.",
            "",
            ""
        ],
        "faqQuestion8": [
            "Why are multiple encryption algorithms used?",
            "Warum werden mehrere Verschlüsselungsalgorithmen verwendet?",
            "为什么使用多个加密算法？",
            "Почему используются несколько алгоритмов шифрования?",
            "¿Por qué se utilizan múltiples algoritmos de cifrado?",
            "Pourquoi plusieurs algorithmes de chiffrement sont-ils utilisés ?",
            "",
            ""
        ],
        "faqAnswer8": [
            "Using multiple algorithms enhances security by adding layers of encryption, making it more difficult for unauthorized parties to decrypt the message.",
            "Durch die Verwendung mehrerer Algorithmen wird die Sicherheit erhöht, indem Verschlüsselungsebenen hinzugefügt werden, was es Unbefugten erschwert, die Nachricht zu entschlüsseln.",
            "使用多个算法通过添加加密层来增强安全性，使未经授权的方更难解密消息。",
            "Использование нескольких алгоритмов повышает безопасность путем добавления слоев шифрования, что затрудняет расшифровку сообщения несанкционированными лицами.",
            "El uso de múltiples algoritmos mejora la seguridad al agregar capas de cifrado, lo que dificulta que partes no autorizadas descifren el mensaje.",
            "L'utilisation de plusieurs algorithmes améliore la sécurité en ajoutant des couches de chiffrement, ce qui rend plus difficile pour les parties non autorisées de déchiffrer le message.",
            "",
            ""
        ],
        "faqQuestion9": [
            "What is key hashing and why is it used?",
            "Was ist Schlüssel-Hashing und warum wird es verwendet?",
            "什么是密钥哈希，为什么要使用它？",
            "Что такое хеширование ключа и зачем оно используется?",
            "¿Qué es el hash de clave y por qué se utiliza?",
            "Qu'est-ce que le hachage de clé et pourquoi est-il utilisé ?",
            "",
            ""
        ],
        "faqAnswer9": [
            "Key hashing transforms your key into a fixed-size hash using multiple algorithms, enhancing security by preventing direct access to the original key and making brute-force attacks more difficult.",
            "Schlüssel-Hashing wandelt deinen Schlüssel mithilfe mehrerer Algorithmen in einen Hash fester Größe um, wodurch die Sicherheit erhöht wird, indem der direkte Zugriff auf den ursprünglichen Schlüssel verhindert und Brute-Force-Angriffe erschwert werden.",
            "密钥哈希使用多个算法将您的密钥转换为固定大小的哈希，增强安全性，防止直接访问原始密钥，并使暴力攻击更加困难。",
            "Хеширование ключа преобразует ваш ключ в хеш фиксированного размера с помощью нескольких алгоритмов, повышая безопасность путем предотвращения прямого доступа к исходному ключу и усложнения атак перебором.",
            "El hash de clave transforma tu clave en un hash de tamaño fijo utilizando múltiples algoritmos, mejorando la seguridad al prevenir el acceso directo a la clave original y dificultar los ataques de fuerza bruta.",
            "Le hachage de clé transforme ta clé en un hachage de taille fixe en utilisant plusieurs algorithmes, améliorant la sécurité en empêchant l'accès direct à la clé originale et en rendant les attaques par force brute plus difficiles.",
            "",
            ""
        ],
        "faqQuestion10": [
            "How does key hashing prevent brute-force attacks?",
            "Wie verhindert Schlüssel-Hashing Brute-Force-Angriffe?",
            "密钥哈希如何防止暴力攻击？",
            "Как хеширование ключа предотвращает атаки перебором?",
            "¿Cómo previene el hash de clave los ataques de fuerza bruta?",
            "Comment le hachage de clé prévient-il les attaques par force brute ?",
            "",
            ""
        ],
        "faqAnswer10": [
            "By hashing the key multiple times with different algorithms and salts, it increases the computational effort required to guess the key, thus deterring brute-force attempts.",
            "Durch mehrmaliges Hashing des Schlüssels mit verschiedenen Algorithmen und Salzen wird der rechnerische Aufwand erhöht, um den Schlüssel zu erraten, wodurch Brute-Force-Versuche abgeschreckt werden.",
            "通过使用不同的算法和盐对密钥进行多次哈希，增加了猜测密钥所需的计算努力，从而阻止暴力攻击。",
            "Хешируя ключ несколько раз с различными алгоритмами и солями, увеличивается вычислительное усилие, необходимое для угадывания ключа, что сдерживает попытки перебора.",
            "Al hashear la clave múltiples veces con diferentes algoritmos y sales, aumenta el esfuerzo computacional requerido para adivinar la clave, disuadiendo así los intentos de fuerza bruta.",
            "En hachant la clé plusieurs fois avec différents algorithmes et sels, cela augmente l'effort computationnel nécessaire pour deviner la clé, dissuadant ainsi les tentatives par force brute.",
            "",
            ""
        ],
        "faqQuestion11": [
            "What is the CryptoJS library?",
            "Was ist die CryptoJS-Bibliothek?",
            "什么是 CryptoJS 库？",
            "Что такое библиотека CryptoJS?",
            "¿Qué es la biblioteca CryptoJS?",
            "Qu'est-ce que la bibliothèque CryptoJS ?",
            "",
            ""
        ],
        "faqAnswer11": [
            "CryptoJS is a widely used JavaScript library that provides standard and secure cryptographic algorithms for encryption and hashing.",
            "CryptoJS ist eine weit verbreitete JavaScript-Bibliothek, die standardisierte und sichere kryptografische Algorithmen für Verschlüsselung und Hashing bereitstellt.",
            "CryptoJS 是一个广泛使用的 JavaScript 库，提供用于加密和哈希的标准和安全的加密算法。",
            "CryptoJS — широко используемая библиотека JavaScript, которая предоставляет стандартные и безопасные криптографические алгоритмы для шифрования и хеширования.",
            "CryptoJS es una biblioteca de JavaScript ampliamente utilizada que proporciona algoritmos criptográficos estándar y seguros para cifrado y hash.",
            "CryptoJS est une bibliothèque JavaScript largement utilisée qui fournit des algorithmes cryptographiques standard et sécurisés pour le chiffrement et le hachage.",
            "",
            ""
        ],
        "faqQuestion12": [
            "How secure is the CryptoJS library?",
            "Wie sicher ist die CryptoJS-Bibliothek?",
            "CryptoJS 库有多安全？",
            "Насколько безопасна библиотека CryptoJS?",
            "¿Qué tan segura es la biblioteca CryptoJS?",
            "Quelle est la sécurité de la bibliothèque CryptoJS ?",
            "",
            ""
        ],
        "faqAnswer12": [
            "CryptoJS is considered secure as it implements well-known cryptographic algorithms correctly. It is used in many applications for secure data handling.",
            "CryptoJS gilt als sicher, da es bekannte kryptografische Algorithmen korrekt implementiert. Es wird in vielen Anwendungen für die sichere Datenverarbeitung verwendet.",
            "CryptoJS 被认为是安全的，因为它正确地实现了众所周知的加密算法。它在许多应用程序中用于安全的数据处理。",
            "CryptoJS считается безопасной, поскольку правильно реализует известные криптографические алгоритмы. Он используется во многих приложениях для безопасной обработки данных.",
            "CryptoJS se considera segura ya que implementa correctamente algoritmos criptográficos bien conocidos. Se utiliza en muchas aplicaciones para el manejo seguro de datos.",
            "CryptoJS est considérée comme sécurisée car elle implémente correctement des algorithmes cryptographiques bien connus. Elle est utilisée dans de nombreuses applications pour la gestion sécurisée des données.",
            "",
            ""
        ],
        "faqQuestion13": [
            "How does NasaEmoji handle key storage?",
            "Wie verwaltet NasaEmoji die Schlüssel-Speicherung?",
            "NasaEmoji 如何处理密钥存储？",
            "Как NasaEmoji обрабатывает хранение ключей?",
            "¿Cómo maneja NasaEmoji el almacenamiento de claves?",
            "Comment NasaEmoji gère-t-il le stockage des clés ?",
            "",
            ""
        ],
        "faqAnswer13": [
            "You can save keys locally in one of the 5 available slots using your browser's local storage for quick access.",
            "Du kannst Schlüssel lokal in einem der 5 verfügbaren Slots speichern, indem du den lokalen Speicher deines Browsers für schnellen Zugriff nutzt.",
            "您可以使用浏览器的本地存储将密钥本地保存在 5 个可用插槽中的一个，以便快速访问。",
            "Вы можете сохранить ключи локально в одном из 5 доступных слотов, используя локальное хранилище вашего браузера для быстрого доступа.",
            "Puedes guardar claves localmente en una de las 5 ranuras disponibles utilizando el almacenamiento local de tu navegador para un acceso rápido.",
            "Tu peux enregistrer des clés localement dans l'un des 5 emplacements disponibles en utilisant le stockage local de ton navigateur pour un accès rapide.",
            "",
            ""
        ],
        "faqQuestion14": [
            "Does NasaEmoji send any data over the internet?",
            "Sendet NasaEmoji irgendwelche Daten über das Internet?",
            "NasaEmoji 会通过互联网发送任何数据吗？",
            "Отправляет ли NasaEmoji какие-либо данные через интернет?",
            "¿NasaEmoji envía datos a través de Internet?",
            "NasaEmoji envoie-t-il des données sur Internet ?",
            "",
            ""
        ],
        "faqAnswer14": [
            "No, all operations are performed locally on your device. NasaEmoji does not send any data over the internet.",
            "Nein, alle Operationen werden lokal auf deinem Gerät ausgeführt. NasaEmoji sendet keine Daten über das Internet.",
            "不，所有操作都在您的设备上本地执行。NasaEmoji 不会通过互联网发送任何数据。",
            "Нет, все операции выполняются локально на вашем устройстве. NasaEmoji не отправляет никаких данных через интернет.",
            "No, todas las operaciones se realizan localmente en tu dispositivo. NasaEmoji no envía ningún dato a través de Internet.",
            "Non, toutes les opérations sont effectuées localement sur ton appareil. NasaEmoji n'envoie aucune donnée sur Internet.",
            "",
            ""
        ],
        "faqQuestion15": [
            "Can I use NasaEmoji offline?",
            "Kann ich NasaEmoji offline nutzen?",
            "我可以离线使用 NasaEmoji 吗？",
            "Могу ли я использовать NasaEmoji офлайн?",
            "¿Puedo usar NasaEmoji sin conexión?",
            "Puis-je utiliser NasaEmoji hors ligne ?",
            "",
            ""
        ],
        "faqAnswer15": [
            "Yes, you can download NasaEmoji for local execution and use it offline without an internet connection.",
            "Ja, du kannst NasaEmoji für die lokale Ausführung herunterladen und es offline ohne Internetverbindung nutzen.",
            "是的，您可以下载 NasaEmoji 进行本地执行，并在没有互联网连接的情况下离线使用。",
            "Да, вы можете скачать NasaEmoji для локального использования и использовать его офлайн без подключения к интернету.",
            "Sí, puedes descargar NasaEmoji para ejecución local y usarlo sin conexión a Internet.",
            "Oui, tu peux télécharger NasaEmoji pour une exécution locale et l'utiliser hors ligne sans connexion Internet.",
            "",
            ""
        ],
        "faqQuestion17": [
            "Is the encryption standardized?",
            "Ist die Verschlüsselung standardisiert?",
            "加密是标准化的吗？",
            "Является ли шифрование стандартизированным?",
            "¿El cifrado está estandarizado?",
            "Le chiffrement est-il standardisé ?",
            "",
            ""
        ],
        "faqAnswer17": [
            "NasaEmoji uses standard encryption algorithms but combines them uniquely. While secure, it is recommended for casual use rather than critical security applications.",
            "NasaEmoji verwendet standardisierte Verschlüsselungsalgorithmen, kombiniert sie jedoch auf einzigartige Weise. Obwohl sicher, wird es eher für den persönlichen Gebrauch als für kritische Sicherheitsanwendungen empfohlen.",
            "NasaEmoji 使用标准的加密算法，但以独特的方式组合它们。虽然安全，但建议用于个人用途而非关键的安全应用程序。",
            "NasaEmoji использует стандартные алгоритмы шифрования, но комбинирует их уникальным образом. Хотя это безопасно, рекомендуется для личного использования, а не для критически важных приложений безопасности.",
            "NasaEmoji utiliza algoritmos de cifrado estándar pero los combina de manera única. Aunque es seguro, se recomienda para uso casual en lugar de aplicaciones de seguridad críticas.",
            "NasaEmoji utilise des algorithmes de chiffrement standard mais les combine de manière unique. Bien que sécurisé, il est recommandé pour un usage personnel plutôt que pour des applications de sécurité critiques.",
            "",
            ""
        ],
        "faqQuestion18": [
            "Can I trust NasaEmoji for highly sensitive information?",
            "Kann ich NasaEmoji für hochsensible Informationen vertrauen?",
            "我可以信任 NasaEmoji 处理高度敏感的信息吗？",
            "Могу ли я доверять NasaEmoji для очень конфиденциальной информации?",
            "¿Puedo confiar en NasaEmoji para información altamente sensible?",
            "Puis-je faire confiance à NasaEmoji pour des informations hautement sensibles ?",
            "",
            ""
        ],
        "faqAnswer18": [
            "While NasaEmoji employs strong encryption, it is primarily designed for personal and casual use. For highly sensitive information, consult security professionals.",
            "Obwohl NasaEmoji starke Verschlüsselung verwendet, ist es hauptsächlich für den persönlichen Gebrauch konzipiert. Für hochsensible Informationen konsultiere bitte Sicherheitsexperten.",
            "虽然 NasaEmoji 采用强加密，但它主要用于个人和非正式用途。对于高度敏感的信息，请咨询安全专业人员。",
            "Хотя NasaEmoji использует сильное шифрование, он в основном предназначен для личного использования. Для очень конфиденциальной информации обратитесь к специалистам по безопасности.",
            "Aunque NasaEmoji emplea un cifrado fuerte, está diseñado principalmente para uso personal y casual. Para información altamente sensible, consulta a profesionales de seguridad.",
            "Bien que NasaEmoji utilise un chiffrement fort, il est principalement conçu pour un usage personnel. Pour des informations hautement sensibles, consulte des professionnels de la sécurité.",
            "",
            ""
        ],
        "faqQuestion19": [
            "Is NasaEmoji open-source?",
            "Ist NasaEmoji Open Source?",
            "NasaEmoji 是开源的吗？",
            "Является ли NasaEmoji открытым исходным кодом?",
            "¿NasaEmoji es de código abierto?",
            "NasaEmoji est-il open-source ?",
            "",
            ""
        ],
        "faqAnswer19": [
            "Yes, NasaEmoji's source code is available on GitHub, allowing you to review and contribute to its development.",
            "Ja, der Quellcode von NasaEmoji ist auf GitHub verfügbar, sodass du ihn überprüfen und zur Entwicklung beitragen kannst.",
            "是的，NasaEmoji 的源代码在 GitHub 上可用，允许您查看并为其开发做出贡献。",
            "Да, исходный код NasaEmoji доступен на GitHub, что позволяет вам просматривать и вносить вклад в его разработку.",
            "Sí, el código fuente de NasaEmoji está disponible en GitHub, lo que te permite revisar y contribuir a su desarrollo.",
            "Oui, le code source de NasaEmoji est disponible sur GitHub, ce qui te permet de le consulter et de contribuer à son développement.",
            "",
            ""
        ],
        "faqQuestion20": [
            "How can I contribute to NasaEmoji?",
            "Wie kann ich zu NasaEmoji beitragen?",
            "我如何为 NasaEmoji 做出贡献？",
            "Как я могу внести вклад в NasaEmoji?",
            "¿Cómo puedo contribuir a NasaEmoji?",
            "Comment puis-je contribuer à NasaEmoji ?",
            "",
            ""
        ],
        "faqAnswer20": [
            "You can contribute by visiting the GitHub repository, reporting issues, suggesting improvements, or submitting pull requests.",
            "Du kannst beitragen, indem du das GitHub-Repository besuchst, Probleme meldest, Verbesserungen vorschlägst oder Pull Requests einreichst.",
            "您可以通过访问 GitHub 仓库、报告问题、提出改进建议或提交拉取请求来做出贡献。",
            "Вы можете внести вклад, посетив репозиторий на GitHub, сообщив об ошибках, предложив улучшения или отправив pull-запросы.",
            "Puedes contribuir visitando el repositorio de GitHub, informando problemas, sugiriendo mejoras o enviando pull requests.",
            "Tu peux contribuer en visitant le dépôt GitHub, en signalant des problèmes, en suggérant des améliorations ou en soumettant des pull requests.",
            "",
            ""
        ]
    };

    if (translations[key]) {
        return translations[key][langIndex];
    } else {
        // Return the key itself if translation is not found
        return key;
    }
}
