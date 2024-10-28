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
            "النص 📄 🔄 🌈 إيموجي", // Arabic
            "" // Placeholder for additional languages
        ],
        "enableDarkMode": [
            "Dark Mode",
            "Dunkler Modus",
            "深色模式",
            "Тёмный режим",
            "Modo Oscuro",
            "Mode Sombre",
            "الوضع الداكن",
            ""
        ],
        "disableDarkMode": [
            "Light Mode",
            "Heller Modus",
            "浅色模式",
            "Светлый режим",
            "Modo Claro",
            "Mode Clair",
            "الوضع الفاتح",
            ""
        ],
        "chooseAppMenu": [
            "Choose App",
            "App auswählen",
            "选择应用",
            "Выбрать приложение",
            "Elegir aplicación",
            "Choisir l'application",
            "اختر التطبيق",
            ""
        ],
        "convertMenu": [
            "🔄 Convert",
            "🔄 Konvertieren",
            "🔄 转换",
            "🔄 Конвертировать",
            "🔄 Convertir",
            "🔄 Convertir",
            "🔄 تحويل",
            ""
        ],
        "encryptMenu": [
            "🔐 Encrypt",
            "🔐 Verschlüsseln",
            "🔐 加密",
            "🔐 Шифровать",
            "🔐 Encriptar",
            "🔐 Chiffrer",
            "🔐 تشفير",
            ""
        ],
        "aboutMenu": [
            "About",
            "Über",
            "关于",
            "О приложении",
            "Acerca de",
            "À propos",
            "حول",
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
            "حذف <br> الرسالة",
            ""
        ],
        "encryptDecryptButton": [
            "🔀 Encrypt / Decrypt",
            "🔀 Verschlüsseln / Entschlüsseln",
            "🔀 加密 / 解密",
            "🔀 Шифровать / Расшифровывать",
            "🔀 Encriptar / Desencriptar",
            "🔀 Chiffrer / Déchiffrer",
            "🔀 تشفير / فك تشفير",
            ""
        ],
        "copyKeyButton": [
            "Copy",
            "Kopieren",
            "复制",
            "Копировать",
            "Copiar",
            "Copier",
            "نسخ",
            ""
        ],
        "keyInstructions": [
            "Load or save keys",
            "Schlüssel laden oder speichern",
            "加载或保存密钥",
            "Загрузить или сохранить ключи",
            "Cargar o guardar claves",
            "Charger ou sauvegarder les clés",
            "تحميل أو حفظ المفاتيح",
            ""
        ],
        "loadKeyButton": [
            "📲 Load",
            "📲 Laden",
            "📲 加载",
            "📲 Загрузить",
            "📲 Cargar",
            "📲 Charger",
            "📲 تحميل",
            ""
        ],
        "saveKeyButton": [
            "💾 Save",
            "💾 Speichern",
            "💾 保存",
            "💾 Сохранить",
            "💾 Guardar",
            "💾 Sauvegarder",
            "💾 حفظ",
            ""
        ],
        "copyEncryptOutputButton": [
            "Copy <br>to <br>clipboard",
            "In <br> Zwischenablage <br> kopieren",
            "复制<br>到剪贴板",
            "Копировать <br>в буфер <br> обмена",
            "Copiar <br>al <br>portapapeles",
            "Copier <br>dans le <br> presse-papiers",
            "نسخ <br>إلى <br>الحافظة",
            ""
        ],
        "encryptOutputTextarea": [
            "Decrypted/Encrypted message",
            "Entschlüsselte/Verschlüsselte Nachricht",
            "解密/加密的消息",
            "Расшифрованное/зашифрованное сообщение",
            "Mensaje desencriptado/encriptado",
            "Message déchiffré/chiffré",
            "الرسالة المفكوكة / المشفرة",
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
            "🔄 تحويل",
            ""
        ],
        "clearConvertInputButton": [
            "Delete <br> Message",
            "Nachricht <br> löschen",
            "删除<br>消息",
            "Удалить <br> сообщение",
            "Eliminar <br> Mensaje",
            "Supprimer <br> Message",
            "حذف <br> الرسالة",
            ""
        ],
        "copyConvertOutputButton": [
            "Copy <br>to clipboard",
            "In <br> Zwischenablage <br> kopieren",
            "复制<br>到剪贴板",
            "Копировать <br>в буфер обмена",
            "Copiar <br>al <br>portapapeles",
            "Copier <br>dans le <br>presse-papiers",
            "نسخ <br>إلى الحافظة",
            ""
        ],
        "convertOutputTextarea": [
            "Converted message",
            "Konvertierte Nachricht",
            "转换后的消息",
            "Преобразованное сообщение",
            "Mensaje convertido",
            "Message converti",
            "الرسالة المحولة",
            ""
        ],
        "encryptMessageInput": [
            "Message",
            "Nachricht",
            "消息",
            "Сообщение",
            "Mensaje",
            "Message",
            "الرسالة",
            ""
        ],
        "convertMessageInput": [
            "Message",
            "Nachricht",
            "消息",
            "Сообщение",
            "Mensaje",
            "Message",
            "الرسالة",
            ""
        ],
       "keyInput": [
            "Secure password",
            "Sicheres Passwort",
            "安全的密码",
            "Надежный пароль",
            "Contraseña segura",
            "Mot de passe sécurisé",
            "كلمة مرور آمنة",
            ""
        ],
        // Messages and other elements
        "footerHighlight": [
            "Secure on-device encryption! Version " + getVersion() + "<br> Combined AES-256 & XOR <br>No data sent. No cookies = no tracking. No logging.",
            "Sichere Verschlüsselung auf dem Gerät! Version " + getVersion() + "<br> Kombiniert AES-256 & XOR <br>Keine Daten werden gesendet. Keine Cookies = kein Tracking. Kein Logging.",
            "设备上的安全加密！版本 " + getVersion() + "<br> 组合 AES-256 和 XOR <br> 不发送数据。没有 Cookie = 无跟踪。无日志。",
            "Безопасное шифрование на устройстве! Версия " + getVersion() + "<br> Комбинация AES-256 & XOR <br> Данные не отправляются. Нет куки = нет отслеживания. Нет логирования.",
            "¡Encriptación segura en el dispositivo! Versión " + getVersion() + "<br> Combinación de AES-256 y XOR <br> No se envían datos. Sin cookies = sin seguimiento. Sin registros.",
            "Chiffrement sécurisé sur l'appareil ! Version " + getVersion() + "<br> Combinaison AES-256 & XOR <br> Aucune donnée envoyée. Pas de cookies = pas de suivi. Pas de journalisation.",
            "تشفير آمن على الجهاز! الإصدار " + getVersion() + "<br> يجمع بين AES-256 و XOR <br>لا يتم إرسال بيانات. لا كوكيز = لا تتبع. لا سجلات.",
            ""
        ],
        "footerSource": [
            "Sourcecode (Github)",
            "Quellcode (Github)",
            "源代码（Github）",
            "Исходный код (Github)",
            "Código fuente (Github)",
            "Code source (Github)",
            "شفرة المصدر (GitHub)",
            ""
        ],
        "explanation": [
            "<h6>Encrypt or decrypt texts or messages with a password. The output is emojis, the key is emojis. With NasaEmoji, you can send secret messages to anyone! Generate and share a common key with your recipient using a method of your choice. Save the key in one of the 5 slots for ease of access.</h6>",
            "<h6>Verschlüssele oder entschlüssele Texte oder Nachrichten mit einem Passwort. Die Ausgabe sind Emojis, der Schlüssel sind Emojis. Mit NasaEmoji kannst du geheime Nachrichten an jeden senden! Erstelle und teile einen gemeinsamen Schlüssel mit deinem Empfänger auf eine beliebige Weise. Speichere den Schlüssel in einem der 5 Slots, um leichter darauf zugreifen zu können.</h6>",
            "<h6>使用密码加密或解密文本或消息。输出是表情符号，密钥是表情符号。使用 NasaEmoji，你可以向任何人发送秘密消息！使用你选择的方法生成并与你的收件人分享一个共同的密钥。将密钥保存在 5 个插槽中的一个，以方便访问。</h6>",
            "<h6>Шифруйте или расшифровывайте тексты или сообщения с помощью пароля. Выводятся эмодзи, ключ — эмодзи. С NasaEmoji вы можете отправлять секретные сообщения кому угодно! Создайте и поделитесь общим ключом с получателем любым удобным способом. Сохраните ключ в одном из 5 слотов для удобного доступа.</h6>",
            "<h6>¡Cifra o descifra textos o mensajes con una contraseña! La salida son emojis, la clave son emojis. Con NasaEmoji, ¡puedes enviar mensajes secretos a cualquiera! Genera y comparte una clave común con tu destinatario usando el método que prefieras. Guarda la clave en uno de los 5 espacios para acceder fácilmente.</h6>",
            "<h6>Tu peux chiffrer ou déchiffrer des textes ou des messages avec un mot de passe. Le résultat ? Des emojis, et la clé, c'est aussi des emojis. Avec NasaEmoji, tu peux envoyer des messages secrets à qui tu veux ! Crée et partage une clé avec ton destinataire comme tu veux. Garde la clé dans un des 5 emplacements pour la retrouver facilement.</h6>",
            "<h6>قم بتشفير أو فك تشفير النصوص أو الرسائل باستخدام كلمة مرور. المخرجات هي إيموجي، والمفتاح هو إيموجي. مع NasaEmoji، يمكنك إرسال رسائل سرية إلى أي شخص! قم بإنشاء ومشاركة مفتاح مشترك مع مستلمك باستخدام الطريقة التي تختارها. احفظ المفتاح في أحد الخمسة فتحات لسهولة الوصول.</h6>",
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
            "💾 محفوظ",
            ""
        ],
        "loadKey": [
            "📲 Loaded",
            "📲 Geladen",
            "📲 已加载",
            "📲 Загружено",
            "📲 Cargado",
            "📲 Chargé",
            "📲 محمل",
            ""
        ],
        "error": [
            "❌ Error",
            "❌ Fehler",
            "❌ 错误",
            "❌ Ошибка",
            "❌ Error",
            "❌ Erreur",
            "❌ خطأ",
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
            "⚙️ جاري التشفير...",
            ""
        ],
        "btnEncodeFailed": [
            "💔 Error. Try again?",
            "💔 Fehler. Nochmal versuchen?",
            "💔 出错。再试一次？",
            "💔 Ошибка. Попробуйте снова?",
            "💔 Error. ¿Intentar de nuevo?",
            "💔 Erreur. Réessayer ?",
            "💔 خطأ. حاول مرة أخرى؟",
            ""
        ],
        "btnEncodeSuccess": [
            "💚 Encrypted!",
            "💚 Verschlüsselt!",
            "💚 已加密！",
            "💚 Зашифровано!",
            "💚 ¡Encriptado!",
            "💚 Chiffré !",
            "💚 تم التشفير!",
            ""
        ],
        "btnDecodeWorking": [
            "⚙️ Decrypting...",
            "⚙️ Entschlüsseln...",
            "⚙️ 解密中...",
            "⚙️ Расшифровываем...",
            "⚙️ Desencriptando...",
            "⚙️ Déchiffrement...",
            "⚙️ جاري فك التشفير...",
            ""
        ],
        "btnDecodeFailed": [
            "💔 Failed. Wrong key/password?",
            "💔 Fehlgeschlagen. Falsches Passwort?",
            "💔 失败。密钥/密码错误？",
            "💔 Не удалось. Неправильный ключ/пароль?",
            "💔 Falló. ¿Clave/contraseña incorrecta?",
            "💔 Échec. Mauvaise clé/mot de passe ?",
            "💔 فشل. مفتاح / كلمة مرور خاطئة؟",
            ""
        ],
        "btnDecodeSuccess": [
            "💚 Decrypted!",
            "💚 Entschlüsselt!",
            "💚 已解密！",
            "💚 Расшифровано!",
            "💚 ¡Desencriptado!",
            "💚 Déchiffré !",
            "💚 تم فك التشفير!",
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
            "⚙️ جاري الترميز...",
            ""
        ],
        "btnEncodeFailedConvert": [
            "💔 Encoding failed",
            "💔 Kodierung fehlgeschlagen",
            "💔 编码失败",
            "💔 Кодирование не удалось",
            "💔 Falló la codificación",
            "💔 Échec de l'encodage",
            "💔 فشل الترميز",
            ""
        ],
        "btnEncodeSuccessConvert": [
            "💚 Encoded!",
            "💚 Kodiert!",
            "💚 已编码！",
            "💚 Закодировано!",
            "💚 ¡Codificado!",
            "💚 Encodé !",
            "💚 تم الترميز!",
            ""
        ],
        "btnDecodeWorkingConvert": [
            "⚙️ Decoding...",
            "⚙️ Dekodieren...",
            "⚙️ 解码中...",
            "⚙️ Декодируем...",
            "⚙️ Decodificando...",
            "⚙️ Décodage...",
            "⚙️ جاري فك الترميز...",
            ""
        ],
        "btnDecodeFailedConvert": [
            "💔 Decoding failed",
            "💔 Dekodierung fehlgeschlagen",
            "💔 解码失败",
            "💔 Декодирование не удалось",
            "💔 Falló la decodificación",
            "💔 Échec du décodage",
            "💔 فشل فك الترميز",
            ""
        ],
        "btnDecodeSuccessConvert": [
            "💚 Decoded!",
            "💚 Dekodiert!",
            "💚 已解码！",
            "💚 Декодировано!",
            "💚 ¡Decodificado!",
            "💚 Décodé !",
            "💚 تم فك الترميز!",
            ""
        ],
        // FAQ
        "faqQuestion1": [
            "What is NasaEmoji?",
            "Was ist NasaEmoji?",
            "NasaEmoji 是什么？",
            "Что такое NasaEmoji?",
            "¿Qué es NasaEmoji?",
            "Qu'est-ce que NasaEmoji ?",
            "ما هو NasaEmoji؟",
            ""
        ],
        "faqAnswer1": [
            "NasaEmoji is a versatile tool that allows you to convert text to emojis and encrypt messages using emojis. The site offers two main apps: <strong>Conversion</strong> and <strong>Encryption</strong>. The Conversion app lets you transform any text into emojis and back without encryption, while the Encryption app enables you to securely encrypt and decrypt messages using emojis as keys and output.",
            "NasaEmoji ist ein vielseitiges Tool, mit dem du Text in Emojis umwandeln und Nachrichten mit Emojis verschlüsseln kannst. Die Website bietet zwei Hauptanwendungen: <strong>Konvertierung</strong> und <strong>Verschlüsselung</strong>. Die Konvertierungs-App ermöglicht es dir, jeden Text in Emojis und zurück ohne Verschlüsselung zu verwandeln, während die Verschlüsselungs-App es dir erlaubt, Nachrichten sicher zu verschlüsseln und zu entschlüsseln, wobei Emojis als Schlüssel und Ausgabe verwendet werden.",
            "NasaEmoji 是一个多功能工具，允许你将文本转换为表情符号并使用表情符号加密消息。该网站提供两个主要应用程序：<strong>转换</strong>和<strong>加密</strong>。转换应用程序让你能够将任何文本转换为表情符号并在不加密的情况下返回，而加密应用程序则允许你使用表情符号作为密钥和输出，安全地加密和解密消息。",
            "NasaEmoji — это универсальный инструмент, который позволяет конвертировать текст в эмодзи и шифровать сообщения с использованием эмодзи. Сайт предлагает два основных приложения: <strong>Конвертация</strong> и <strong>Шифрование</strong>. Приложение Конвертация позволяет преобразовывать любой текст в эмодзи и обратно без шифрования, в то время как приложение Шифрование позволяет безопасно шифровать и дешифровать сообщения, используя эмодзи в качестве ключей и вывода.",
            "NasaEmoji es una herramienta versátil que te permite convertir texto a emojis y encriptar mensajes usando emojis. El sitio ofrece dos aplicaciones principales: <strong>Conversión</strong> y <strong>Encriptación</strong>. La aplicación de Conversión te permite transformar cualquier texto en emojis y viceversa sin encriptación, mientras que la aplicación de Encriptación te permite encriptar y desencriptar mensajes de manera segura usando emojis como claves y salida.",
            "NasaEmoji est un outil polyvalent qui vous permet de convertir du texte en émojis et de chiffrer des messages en utilisant des émojis. Le site propose deux applications principales : <strong>Conversion</strong> et <strong>Cryptage</strong>. L'application de Conversion vous permet de transformer n'importe quel texte en émojis et vice versa sans cryptage, tandis que l'application de Cryptage vous permet de chiffrer et déchiffrer des messages de manière sécurisée en utilisant des émojis comme clés et sorties.",
            "NasaEmoji هو أداة متعددة الاستخدامات تتيح لك تحويل النص إلى إيموجي وتشفير الرسائل باستخدام إيموجي. يقدم الموقع تطبيقين رئيسيين: <strong>التحويل</strong> و<strong>التشفير</strong>. يتيح لك تطبيق التحويل تحويل أي نص إلى إيموجي والعودة دون تشفير، بينما يمكِّنك تطبيق التشفير من تشفير وفك تشفير الرسائل بأمان باستخدام إيموجي كمفاتيح ومخرجات.",
            ""
        ],
            "faqQuestion2": [
              "How do I use NasaEmoji?",
              "Wie benutze ich NasaEmoji?",
              "我如何使用 NasaEmoji？",
              "Как использовать NasaEmoji?",
              "¿Cómo uso NasaEmoji?",
              "Comment utiliser NasaEmoji ?",
              "كيف أستخدم NasaEmoji؟",
              ""
            ],
            "faqAnswer2": [
              "NasaEmoji features two apps: <strong>Conversion</strong> and <strong>Encryption</strong>. By default, the site opens with the <strong>Conversion</strong> app. You can switch between apps using the <strong>Choose App</strong> dropdown in the navigation bar.<strong>To Convert Text to Emojis:</strong><ul>    <li>Ensure you're on the <strong>Conversion</strong> app.</li>    <li>Enter your message in the input field.</li>    <li>Click the <strong>🔄 Convert</strong> button.</li>    <li>Your converted message will appear in the output field.</li></ul><strong>To Encrypt a Message:</strong><ul>    <li>Switch to the <strong>Encryption</strong> app using the <strong>Choose App</strong> dropdown.</li>    <li>Enter your message in the input field.</li>    <li>Generate a key by clicking the <strong>🔄</strong> button next to the key input field, or enter your own key.</li>    <li>Click the <strong>🔀 Encrypt / Decrypt</strong> button.</li>    <li>Your encrypted message will appear in the output field.</li></ul>",
              "NasaEmoji verfügt über zwei Apps: <strong>Konvertierung</strong> und <strong>Verschlüsselung</strong>. Standardmäßig öffnet sich die Website mit der <strong>Konvertierung</strong>-App. Du kannst zwischen den Apps wechseln, indem du das <strong>App auswählen</strong>-Dropdown in der Navigationsleiste verwendest.<strong>Um Text in Emojis zu konvertieren:</strong><ul>    <li>Stelle sicher, dass du in der <strong>Konvertierung</strong>-App bist.</li>    <li>Gib deine Nachricht im Eingabefeld ein.</li>    <li>Klicke auf die <strong>🔄 Konvertieren</strong>-Schaltfläche.</li>    <li>Die konvertierte Nachricht erscheint im Ausgabefeld.</li></ul><strong>Um eine Nachricht zu verschlüsseln:</strong><ul>    <li>Wechsle zur <strong>Verschlüsselung</strong>-App mithilfe des <strong>App auswählen</strong>-Dropdowns.</li>    <li>Gib deine Nachricht im Eingabefeld ein.</li>    <li>Generiere einen Schlüssel, indem du auf die <strong>🔄</strong>-Schaltfläche neben dem Schlüssel-Eingabefeld klickst, oder gib deinen eigenen Schlüssel ein.</li>    <li>Klicke auf die <strong>🔀 Verschlüsseln / Entschlüsseln</strong>-Schaltfläche.</li>    <li>Deine verschlüsselte Nachricht erscheint im Ausgabefeld.</li></ul>",
              "NasaEmoji 具有两个应用程序：<strong>转换</strong>和<strong>加密</strong>。默认情况下，网站以<strong>转换</strong>应用程序打开。你可以使用导航栏中的<strong>选择应用</strong>下拉菜单在应用程序之间切换。<strong>将文本转换为表情符号：</strong><ul>    <li>确保你在<strong>转换</strong>应用程序中。</li>    <li>在输入字段中输入你的消息。</li>    <li>点击 <strong>🔄 转换</strong> 按钮。</li>    <li>你的转换后消息将显示在输出字段中。</li></ul><strong>加密消息：</strong><ul>    <li>使用 <strong>选择应用</strong> 下拉菜单切换到 <strong>加密</strong> 应用程序。</li>    <li>在输入字段中输入你的消息。</li>    <li>通过点击密钥输入字段旁边的 <strong>🔄</strong> 按钮生成一个密钥，或输入你自己的密钥。</li>    <li>点击 <strong>🔀 加密 / 解密</strong> 按钮。</li>    <li>你的加密消息将显示在输出字段中。</li></ul>",
              "NasaEmoji имеет два приложения: <strong>Конвертация</strong> и <strong>Шифрование</strong>. По умолчанию сайт открывается с приложением <strong>Конвертация</strong>. Вы можете переключаться между приложениями, используя выпадающее меню <strong>Выбрать приложение</strong> в навигационной панели.<strong>Чтобы конвертировать текст в эмодзи:</strong><ul>    <li>Убедитесь, что вы находитесь в приложении <strong>Конвертация</strong>.</li>    <li>Введите ваше сообщение в поле ввода.</li>    <li>Нажмите кнопку <strong>🔄 Конвертировать</strong>.</li>    <li>Ваше конвертированное сообщение появится в поле вывода.</li></ul><strong>Чтобы зашифровать сообщение:</strong><ul>    <li>Переключитесь на приложение <strong>Шифрование</strong>, используя выпадающее меню <strong>Выбрать приложение</strong>.</li>    <li>Введите ваше сообщение в поле ввода.</li>    <li>Сгенерируйте ключ, нажав кнопку <strong>🔄</strong> рядом с полем ввода ключа, или введите свой собственный ключ.</li>    <li>Нажмите кнопку <strong>🔀 Шифровать / Расшифровывать</strong>.</li>    <li>Ваше зашифрованное сообщение появится в поле вывода.</li></ul>",
              "NasaEmoji cuenta con dos aplicaciones: <strong>Conversión</strong> y <strong>Encriptación</strong>. Por defecto, el sitio se abre con la aplicación <strong>Conversión</strong>. Puedes cambiar entre aplicaciones usando el menú desplegable <strong>Elegir aplicación</strong> en la barra de navegación.<strong>Para Convertir Texto a Emojis:</strong><ul>    <li>Asegúrate de estar en la aplicación <strong>Conversión</strong>.</li>    <li>Ingresa tu mensaje en el campo de entrada.</li>    <li>Haz clic en el botón <strong>🔄 Convertir</strong>.</li>    <li>Tu mensaje convertido aparecerá en el campo de salida.</li></ul><strong>Para Encriptar un Mensaje:</strong><ul>    <li>Cambia a la aplicación <strong>Encriptación</strong> usando el menú desplegable <strong>Elegir aplicación</strong>.</li>    <li>Ingresa tu mensaje en el campo de entrada.</li>    <li>Genera una clave haciendo clic en el botón <strong>🔄</strong> junto al campo de entrada de clave, o ingresa tu propia clave.</li>    <li>Haz clic en el botón <strong>🔀 Encriptar / Desencriptar</strong>.</li>    <li>Tu mensaje encriptado aparecerá en el campo de salida.</li></ul>",
              "NasaEmoji dispose de deux applications : <strong>Conversion</strong> et <strong>Cryptage</strong>. Par défaut, le site s'ouvre avec l'application <strong>Conversion</strong>. Vous pouvez basculer entre les applications en utilisant le menu déroulant <strong>Choisir l'application</strong> dans la barre de navigation.<strong>Pour convertir du texte en émojis :</strong><ul>    <li>Assurez-vous que vous êtes dans l'application <strong>Conversion</strong>.</li>    <li>Entrez votre message dans le champ de saisie.</li>    <li>Cliquez sur le bouton <strong>🔄 Convertir</strong>.</li>    <li>Votre message converti apparaîtra dans le champ de sortie.</li></ul><strong>Pour chiffrer un message :</strong><ul>    <li>Changez pour l'application <strong>Cryptage</strong> en utilisant le menu déroulant <strong>Choisir l'application</strong>.</li>    <li>Entrez votre message dans le champ de saisie.</li>    <li>Générez une clé en cliquant sur le bouton <strong>🔄</strong> à côté du champ de saisie de clé, ou entrez votre propre clé.</li>    <li>Cliquez sur le bouton <strong>🔀 Chiffrer / Déchiffrer</strong>.</li>    <li>Votre message chiffré apparaîtra dans le champ de sortie.</li></ul>",
              "يحتوي NasaEmoji على تطبيقين: <strong>التحويل</strong> و<strong>التشفير</strong>. بشكل افتراضي، يفتح الموقع مع تطبيق <strong>التحويل</strong>. يمكنك التبديل بين التطبيقات باستخدام القائمة المنسدلة <strong>اختر التطبيق</strong> في شريط التنقل.<strong>لتحويل النص إلى إيموجي:</strong><ul>    <li>تأكد من أنك في تطبيق <strong>التحويل</strong>.</li>    <li>أدخل رسالتك في حقل الإدخال.</li>    <li>انقر على زر <strong>🔄 تحويل</strong>.</li>    <li>ستظهر رسالتك المحولة في حقل الإخراج.</li></ul><strong>لتشفير رسالة:</strong><ul>    <li>انتقل إلى تطبيق <strong>التشفير</strong> باستخدام القائمة المنسدلة <strong>اختر التطبيق</strong>.</li>    <li>أدخل رسالتك في حقل الإدخال.</li>    <li>قم بإنشاء مفتاح بالنقر على زر <strong>🔄</strong> بجانب حقل إدخال المفتاح، أو أدخل مفتاحك الخاص.</li>    <li>انقر على زر <strong>🔀 تشفير / فك تشفير</strong>.</li>    <li>ستظهر رسالتك المشفرة في حقل الإخراج.</li></ul>",
              ""
            ],
            "faqQuestion3": [
              "How do I convert text to emojis?",
              "Wie konvertiere ich Text in Emojis?",
              "我如何将文本转换为表情符号？",
              "Как я могу конвертировать текст в эмодзи?",
              "¿Cómo convierto texto a emojis?",
              "Comment convertir du texte en émojis ?",
              "كيف أحول النص إلى إيموجي؟",
              ""
            ],
            "faqAnswer3": [
              "To convert text to emojis:<ul>    <li>Ensure you're on the <strong>Conversion</strong> app (the default app).</li>    <li>Enter your message in the input field.</li>    <li>Click the <strong>🔄 Convert</strong> button.</li>    <li>The converted message will appear in the output field.</li>    <li>You can copy the output using the <strong>Copy to clipboard</strong> button.</li></ul>",
              "Um Text in Emojis zu konvertieren:<ul>    <li>Stelle sicher, dass du in der <strong>Konvertierung</strong>-App bist (die Standard-App).</li>    <li>Gib deine Nachricht im Eingabefeld ein.</li>    <li>Klicke auf die <strong>🔄 Konvertieren</strong>-Schaltfläche.</li>    <li>Die konvertierte Nachricht erscheint im Ausgabefeld.</li>    <li>Du kannst die Ausgabe mit der <strong>In die Zwischenablage kopieren</strong>-Schaltfläche kopieren.</li></ul>",
              "将文本转换为表情符号的方法：<ul>    <li>确保你在 <strong>转换</strong> 应用程序中（默认应用程序）。</li>    <li>在输入字段中输入你的消息。</li>    <li>点击 <strong>🔄 转换</strong> 按钮。</li>    <li>转换后的消息将显示在输出字段中。</li>    <li>你可以使用 <strong>复制到剪贴板</strong> 按钮复制输出。</li></ul>",
              "Чтобы конвертировать текст в эмодзи:<ul>    <li>Убедитесь, что вы находитесь в приложении <strong>Конвертация</strong> (приложение по умолчанию).</li>    <li>Введите свое сообщение в поле ввода.</li>    <li>Нажмите кнопку <strong>🔄 Конвертировать</strong>.</li>    <li>Конвертированное сообщение появится в поле вывода.</li>    <li>Вы можете скопировать вывод, используя кнопку <strong>Скопировать в буфер обмена</strong>.</li></ul>",
              "Para convertir texto a emojis:<ul>    <li>Asegúrate de estar en la aplicación <strong>Conversión</strong> (la aplicación predeterminada).</li>    <li>Ingresa tu mensaje en el campo de entrada.</li>    <li>Haz clic en el botón <strong>🔄 Convertir</strong>.</li>    <li>Tu mensaje convertido aparecerá en el campo de salida.</li>    <li>Puedes copiar la salida usando el botón <strong>Copiar al portapapeles</strong>.</li></ul>",
              "Pour convertir du texte en émojis :<ul>    <li>Assurez-vous que vous êtes dans l'application <strong>Conversion</strong> (l'application par défaut).</li>    <li>Entrez votre message dans le champ de saisie.</li>    <li>Cliquez sur le bouton <strong>🔄 Convertir</strong>.</li>    <li>Le message converti apparaîtra dans le champ de sortie.</li>    <li>Vous pouvez copier la sortie en utilisant le bouton <strong>Copier dans le presse-papiers</strong>.</li></ul>",
              "لتحويل النص إلى إيموجي:<ul>    <li>تأكد من أنك في تطبيق <strong>التحويل</strong> (التطبيق الافتراضي).</li>    <li>أدخل رسالتك في حقل الإدخال.</li>    <li>انقر على زر <strong>🔄 تحويل</strong>.</li>    <li>ستظهر رسالتك المحولة في حقل الإخراج.</li>    <li>يمكنك نسخ المخرجات باستخدام زر <strong>نسخ إلى الحافظة</strong>.</li></ul>",
              ""
            ],
            "faqQuestion4": [
              "How do I encrypt a message?",
              "Wie verschlüssele ich eine Nachricht?",
              "我如何加密消息？",
              "Как зашифровать сообщение?",
              "¿Cómo encripto un mensaje?",
              "Comment chiffrer un message ?",
              "كيف أشفر رسالة؟",
              ""
            ],
            "faqAnswer4": [
              "To encrypt a message:<ul>    <li>Switch to the <strong>Encryption</strong> app using the <strong>Choose App</strong> dropdown.</li>    <li>Enter your message in the input field.</li>    <li>Generate a key by clicking the <strong>🔄</strong> button next to the key input field, or enter your own key.</li>    <li>Click the <strong>🔀 Encrypt / Decrypt</strong> button.</li>    <li>Your encrypted message will appear in the output field.</li></ul>",
              "Um eine Nachricht zu verschlüsseln:<ul>    <li>Wechsle zur <strong>Verschlüsselung</strong>-App mithilfe des <strong>App auswählen</strong>-Dropdowns.</li>    <li>Gib deine Nachricht im Eingabefeld ein.</li>    <li>Generiere einen Schlüssel, indem du auf die <strong>🔄</strong>-Schaltfläche neben dem Schlüssel-Eingabefeld klickst, oder gib deinen eigenen Schlüssel ein.</li>    <li>Klicke auf die <strong>🔀 Verschlüsseln / Entschlüsseln</strong>-Schaltfläche.</li>    <li>Deine verschlüsselte Nachricht erscheint im Ausgabefeld.</li></ul>",
              "要加密消息：<ul>    <li>使用 <strong>选择应用</strong> 下拉菜单切换到 <strong>加密</strong> 应用程序。</li>    <li>在输入字段中输入你的消息。</li>    <li>通过点击密钥输入字段旁边的 <strong>🔄</strong> 按钮生成一个密钥，或输入你自己的密钥。</li>    <li>点击 <strong>🔀 加密 / 解密</strong> 按钮。</li>    <li>你的加密消息将显示在输出字段中。</li></ul>",
              "Чтобы зашифровать сообщение:<ul>    <li>Переключитесь на приложение <strong>Шифрование</strong>, используя выпадающее меню <strong>Выбрать приложение</strong>.</li>    <li>Введите свое сообщение в поле ввода.</li>    <li>Сгенерируйте ключ, нажав кнопку <strong>🔄</strong> рядом с полем ввода ключа, или введите свой собственный ключ.</li>    <li>Нажмите кнопку <strong>🔀 Шифровать / Расшифровывать</strong>.</li>    <li>Ваше зашифрованное сообщение появится в поле вывода.</li></ul>",
              "Para encriptar un mensaje:<ul>    <li>Cambia a la aplicación <strong>Encriptación</strong> usando el menú desplegable <strong>Elegir aplicación</strong>.</li>    <li>Ingresa tu mensaje en el campo de entrada.</li>    <li>Genera una clave haciendo clic en el botón <strong>🔄</strong> junto al campo de entrada de clave, o ingresa tu propia clave.</li>    <li>Haz clic en el botón <strong>🔀 Encriptar / Desencriptar</strong>.</li>    <li>Tu mensaje encriptado aparecerá en el campo de salida.</li></ul>",
              "Pour chiffrer un message :<ul>    <li>Changez pour l'application <strong>Cryptage</strong> en utilisant le menu déroulant <strong>Choisir l'application</strong>.</li>    <li>Entrez votre message dans le champ de saisie.</li>    <li>Générez une clé en cliquant sur le bouton <strong>🔄</strong> à côté du champ de saisie de clé, ou entrez votre propre clé.</li>    <li>Cliquez sur le bouton <strong>🔀 Chiffrer / Déchiffrer</strong>.</li>    <li>Votre message chiffré apparaîtra dans le champ de sortie.</li></ul>",
              "لتشفير رسالة:<ul>    <li>انتقل إلى تطبيق <strong>التشفير</strong> باستخدام القائمة المنسدلة <strong>اختر التطبيق</strong>.</li>    <li>أدخل رسالتك في حقل الإدخال.</li>    <li>قم بإنشاء مفتاح بالنقر على زر <strong>🔄</strong> بجانب حقل إدخال المفتاح، أو أدخل مفتاحك الخاص.</li>    <li>انقر على زر <strong>🔀 تشفير / فك تشفير</strong>.</li>    <li>ستظهر رسالتك المشفرة في حقل الإخراج.</li></ul>",
              ""
            ],
            "faqQuestion5": [
              "How do I decrypt a message?",
              "Wie entschlüssele ich eine Nachricht?",
              "我如何解密消息？",
              "Как расшифровать сообщение?",
              "¿Cómo desencripto un mensaje?",
              "Comment déchiffrer un message ?",
              "كيف أفك تشفير رسالة؟",
              ""
            ],
            "faqAnswer5": [
              "To decrypt a message:<ul>    <li>Switch to the <strong>Encryption</strong> app.</li>    <li>Paste the encrypted emoji message into the input field.</li>    <li>Enter the key used for encryption in the key input field.</li>    <li>Click the <strong>🔀 Encrypt / Decrypt</strong> button.</li>    <li>Your decrypted message will appear in the output field.</li></ul>",
              "Um eine Nachricht zu entschlüsseln:<ul>    <li>Wechsle zur <strong>Verschlüsselung</strong>-App.</li>    <li>Füge die verschlüsselte Emoji-Nachricht in das Eingabefeld ein.</li>    <li>Gib den zur Verschlüsselung verwendeten Schlüssel im Schlüssel-Eingabefeld ein.</li>    <li>Klicke auf die <strong>🔀 Verschlüsseln / Entschlüsseln</strong>-Schaltfläche.</li>    <li>Deine entschlüsselte Nachricht erscheint im Ausgabefeld.</li></ul>",
              "要解密消息：<ul>    <li>切换到 <strong>加密</strong> 应用程序。</li>    <li>将加密的表情符号消息粘贴到输入字段中。</li>    <li>在密钥输入字段中输入用于加密的密钥。</li>    <li>点击 <strong>🔀 加密 / 解密</strong> 按钮。</li>    <li>你的解密消息将显示在输出字段中。</li></ul>",
              "Чтобы расшифровать сообщение:<ul>    <li>Переключитесь на приложение <strong>Шифрование</strong>.</li>    <li>Вставьте зашифрованное сообщение-эмодзи в поле ввода.</li>    <li>Введите ключ, использованный для шифрования, в поле ввода ключа.</li>    <li>Нажмите кнопку <strong>🔀 Шифровать / Расшифровывать</strong>.</li>    <li>Ваше расшифрованное сообщение появится в поле вывода.</li></ul>",
              "Para desencriptar un mensaje:<ul>    <li>Cambia a la aplicación <strong>Encriptación</strong>.</li>    <li>Pega el mensaje de emoji encriptado en el campo de entrada.</li>    <li>Ingresa la clave utilizada para la encriptación en el campo de entrada de clave.</li>    <li>Haz clic en el botón <strong>🔀 Encriptar / Desencriptar</strong>.</li>    <li>Tu mensaje desencriptado aparecerá en el campo de salida.</li></ul>",
              "Pour déchiffrer un message :<ul>    <li>Changez pour l'application <strong>Cryptage</strong>.</li>    <li>Collez le message emoji chiffré dans le champ de saisie.</li>    <li>Entrez la clé utilisée pour le cryptage dans le champ de saisie de clé.</li>    <li>Cliquez sur le bouton <strong>🔀 Chiffrer / Déchiffrer</strong>.</li>    <li>Votre message déchiffré apparaîtra dans le champ de sortie.</li></ul>",
              "لفك تشفير رسالة:<ul>    <li>انتقل إلى تطبيق <strong>التشفير</strong>.</li>    <li>الصق الرسالة المشفرة بإيموجي في حقل الإدخال.</li>    <li>أدخل المفتاح المستخدم في التشفير في حقل إدخال المفتاح.</li>    <li>انقر على زر <strong>🔀 تشفير / فك تشفير</strong>.</li>    <li>ستظهر رسالتك المفكوكة في حقل الإخراج.</li></ul>",
              ""
            ],
            "faqQuestion6": [
              "How do I generate an emoji key?",
              "Wie generiere ich einen Emoji-Schlüssel?",
              "我如何生成表情符号密钥？",
              "Как сгенерировать эмодзи-ключ?",
              "¿Cómo genero una clave de emoji?",
              "Comment générer une clé emoji ?",
              "كيف أُولّد مفتاح إيموجي؟",
              ""
            ],
            "faqAnswer6": [
              "To generate an emoji key in the <strong>Encryption</strong> app:<ul>    <li>Click the <strong>🔄</strong> button next to the key input field.</li>    <li>The generated key will appear in the key input field.</li>    <li>You can copy the key using the <strong>Copy</strong> button.</li>    <li>Save the key in one of the 5 available slots using the <strong>💾 Save</strong> button for future use.</li></ul>",
              "Um einen Emoji-Schlüssel in der <strong>Verschlüsselung</strong>-App zu generieren:<ul>    <li>Klicke auf die <strong>🔄</strong>-Schaltfläche neben dem Schlüssel-Eingabefeld.</li>    <li>Der generierte Schlüssel erscheint im Schlüssel-Eingabefeld.</li>    <li>Du kannst den Schlüssel mit der <strong>Copy</strong>-Schaltfläche kopieren.</li>    <li>Speichere den Schlüssel in einem der 5 verfügbaren Slots mit der <strong>💾 Speichern</strong>-Schaltfläche für die zukünftige Verwendung.</li></ul>",
              "在 <strong>加密</strong> 应用程序中生成表情符号密钥的方法：<ul>    <li>点击密钥输入字段旁边的 <strong>🔄</strong> 按钮。</li>    <li>生成的密钥将出现在密钥输入字段中。</li>    <li>你可以使用 <strong>复制</strong> 按钮复制密钥。</li>    <li>使用 <strong>💾 保存</strong> 按钮将密钥保存在5个可用槽之一中以备将来使用。</li></ul>",
              "Чтобы сгенерировать эмодзи-ключ в приложении <strong>Шифрование</strong>:<ul>    <li>Нажмите кнопку <strong>🔄</strong> рядом с полем ввода ключа.</li>    <li>Сгенерированный ключ появится в поле ввода ключа.</li>    <li>Вы можете скопировать ключ, используя кнопку <strong>Copy</strong>.</li>    <li>Сохраните ключ в одном из 5 доступных слотов, используя кнопку <strong>💾 Сохранить</strong> для дальнейшего использования.</li></ul>",
              "Para generar una clave de emoji en la aplicación <strong>Encriptación</strong>:<ul>    <li>Haz clic en el botón <strong>🔄</strong> junto al campo de entrada de clave.</li>    <li>La clave generada aparecerá en el campo de entrada de clave.</li>    <li>Puedes copiar la clave usando el botón <strong>Copiar</strong>.</li>    <li>Guarda la clave en una de las 5 ranuras disponibles usando el botón <strong>💾 Guardar</strong> para uso futuro.</li></ul>",
              "Pour générer une clé emoji dans l'application <strong>Cryptage</strong> :<ul>    <li>Cliquez sur le bouton <strong>🔄</strong> à côté du champ de saisie de clé.</li>    <li>La clé générée apparaîtra dans le champ de saisie de clé.</li>    <li>Vous pouvez copier la clé en utilisant le bouton <strong>Copier</strong>.</li>    <li>Sauvegardez la clé dans l'un des 5 emplacements disponibles en utilisant le bouton <strong>💾 Sauvegarder</strong> pour une utilisation future.</li></ul>",
              "لإنشاء مفتاح إيموجي في تطبيق <strong>التشفير</strong>:<ul>    <li>انقر على زر <strong>🔄</strong> بجانب حقل إدخال المفتاح.</li>    <li>سيظهر المفتاح المُولد في حقل إدخال المفتاح.</li>    <li>يمكنك نسخ المفتاح باستخدام زر <strong>نسخ</strong>.</li>    <li>احفظ المفتاح في أحد الخمسة فتحات المتاحة باستخدام زر <strong>💾 حفظ</strong> للاستخدام المستقبلي.</li></ul>",
              ""
            ], 
        "faqQuestion9": [
                "How do I add NasaEmoji to my home screen or desktop?",
                "Wie füge ich NasaEmoji zu meinem Startbildschirm oder Desktop hinzu?",
                "我如何将 NasaEmoji 添加到我的主屏幕或桌面？",
                "Как добавить NasaEmoji на главный экран или рабочий стол?",
                "¿Cómo agrego NasaEmoji a mi pantalla de inicio o escritorio?",
                "Comment ajouter NasaEmoji à votre écran d'accueil ou bureau ?",
                "كيف أضيف NasaEmoji إلى شاشة البداية أو سطح المكتب؟",
                ""
            ],
            "faqAnswer9": [
                "You can add NasaEmoji as a Progressive Web App (PWA) to your home screen or desktop for quick access.<br><strong>On iOS (Safari):</strong><ol><li>Open https://NasaEmoji.com in Safari.</li><li>Tap the <strong>Share</strong> icon (a square with an upward arrow).</li><li>Scroll down and tap <strong>Add to Home Screen</strong>.</li><li>Tap <strong>Add</strong> in the upper-right corner.</li></ol><strong>On Android (Chrome and other browsers):</strong><ol><li>Open https://NasaEmoji.com in your browser.</li><li>Tap the <strong>Menu</strong> icon (three dots) in the upper-right corner.</li><li>Select <strong>Add to Home screen</strong> or <strong>Install App</strong>.</li><li>Follow the on-screen instructions.</li></ol><strong>On macOS (Safari):</strong><ol><li>Open https://NasaEmoji.com in Safari.</li><li>Go to <strong>File</strong> > <strong>Add to Dock</strong>.</li></ol><strong>On Desktop (Chrome):</strong><ol><li>Open https://NasaEmoji.com in Chrome.</li><li>Click the <strong>Install</strong> icon in the address bar (a computer with a down arrow).</li><li>Click <strong>Install</strong>.</li></ol><strong>On Desktop (Firefox and other browsers):</strong><p>Firefox does not support installing PWAs directly. You can bookmark the site or create a shortcut manually.</p>",
                "Du kannst NasaEmoji als Progressive Web App (PWA) zu deinem Startbildschirm oder Desktop für einen schnellen Zugriff hinzufügen.<br><strong>Auf iOS (Safari):</strong><ol><li>Öffne https://NasaEmoji.com in Safari.</li><li>Tippe auf das <strong>Teilen</strong>-Symbol (ein Quadrat mit einem nach oben zeigenden Pfeil).</li><li>Scroll nach unten und tippe auf <strong>Zum Home-Bildschirm hinzufügen</strong>.</li><li>Tippe oben rechts auf <strong>Hinzufügen</strong>.</li></ol><strong>Auf Android (Chrome und anderen Browsern):</strong><ol><li>Öffne https://NasaEmoji.com in deinem Browser.</li><li>Tippe auf das <strong>Menü</strong>-Symbol (drei Punkte) oben rechts.</li><li>Wähle <strong>Zum Startbildschirm hinzufügen</strong> oder <strong>App installieren</strong>.</li><li>Folge den Anweisungen auf dem Bildschirm.</li></ol><strong>Auf macOS (Safari):</strong><ol><li>Öffne https://NasaEmoji.com in Safari.</li><li>Gehe zu <strong>Datei</strong> > <strong>Zum Dock hinzufügen</strong>.</li></ol><strong>Auf Desktop (Chrome):</strong><ol><li>Öffne https://NasaEmoji.com in Chrome.</li><li>Klicke auf das <strong>Installieren</strong>-Symbol in der Adressleiste (ein Computer mit einem nach unten zeigenden Pfeil).</li><li>Klicke auf <strong>Installieren</strong>.</li></ol><strong>Auf Desktop (Firefox und andere Browser):</strong><p>Firefox unterstützt die Installation von PWAs nicht direkt. Du kannst die Website zu deinen Lesezeichen hinzufügen oder eine Verknüpfung manuell erstellen.</p>",
                "你可以将 NasaEmoji 作为渐进式网页应用程序（PWA）添加到你的主屏幕或桌面，以便快速访问。<br><strong>在 iOS（Safari）上：</strong><ol><li>在 Safari 中打开 https://NasaEmoji.com。</li><li>点击 <strong>分享</strong> 图标（一个带有向上箭头的方形）。</li><li>向下滚动并点击 <strong>添加到主屏幕</strong>。</li><li>点击右上角的 <strong>添加</strong>。</li></ol><strong>在 Android（Chrome 和其他浏览器）上：</strong><ol><li>在你的浏览器中打开 https://NasaEmoji.com。</li><li>点击右上角的 <strong>菜单</strong> 图标（三个点）。</li><li>选择 <strong>添加到主屏幕</strong> 或 <strong>安装应用</strong>。</li><li>按照屏幕上的指示操作。</li></ol><strong>在 macOS（Safari）上：</strong><ol><li>在 Safari 中打开 https://NasaEmoji.com。</li><li>转到 <strong>文件</strong> > <strong>添加到 Dock</strong>。</li></ol><strong>在桌面（Chrome）上：</strong><ol><li>在 Chrome 中打开 https://NasaEmoji.com。</li><li>点击地址栏中的 <strong>安装</strong> 图标（一个带有向下箭头的电脑）。</li><li>点击 <strong>安装</strong>。</li></ol><strong>在桌面（Firefox 和其他浏览器）上：</strong><p>Firefox 不支持直接安装 PWA。你可以将该网站添加到书签或手动创建快捷方式。</p>",
                "Ты можешь добавить NasaEmoji как Progressive Web App (PWA) на свой главный экран или рабочий стол для быстрого доступа.<br><strong>На iOS (Safari):</strong><ol><li>Открой https://NasaEmoji.com в Safari.</li><li>Нажми на значок <strong>Поделиться</strong> (квадрат со стрелкой вверх).</li><li>Прокрути вниз и нажми <strong>Добавить на главный экран</strong>.</li><li>Нажми <strong>Добавить</strong> в правом верхнем углу.</li></ol><strong>На Android (Chrome и других браузерах):</strong><ol><li>Открой https://NasaEmoji.com в своем браузере.</li><li>Нажми на значок <strong>Меню</strong> (три точки) в правом верхнем углу.</li><li>Выбери <strong>Добавить на главный экран</strong> или <strong>Установить приложение</strong>.</li><li>Следуй инструкциям на экране.</li></ol><strong>На macOS (Safari):</strong><ol><li>Открой https://NasaEmoji.com в Safari.</li><li>Перейди в <strong>Файл</strong> > <strong>Добавить в Dock</strong>.</li></ol><strong>На рабочем столе (Chrome):</strong><ol><li>Открой https://NasaEmoji.com в Chrome.</li><li>Нажми на значок <strong>Установить</strong> в адресной строке (компьютер со стрелкой вниз).</li><li>Нажми на <strong>Установить</strong>.</li></ol><strong>На рабочем столе (Firefox и других браузерах):</strong><p>Firefox не поддерживает прямую установку PWA. Ты можешь добавить сайт в закладки или создать ярлык вручную.</p>",
                "Puedes agregar NasaEmoji como una Aplicación Web Progresiva (PWA) a tu pantalla de inicio o escritorio para un acceso rápido.<br><strong>En iOS (Safari):</strong><ol><li>Abre https://NasaEmoji.com en Safari.</li><li>Toca el ícono de <strong>Compartir</strong> (un cuadrado con una flecha hacia arriba).</li><li>Desplázate hacia abajo y toca <strong>Agregar a la pantalla de inicio</strong>.</li><li>Toca <strong>Agregar</strong> en la esquina superior derecha.</li></ol><strong>En Android (Chrome y otros navegadores):</strong><ol><li>Abre https://NasaEmoji.com en tu navegador.</li><li>Toca el ícono de <strong>Menú</strong> (tres puntos) en la esquina superior derecha.</li><li>Selecciona <strong>Agregar a la pantalla de inicio</strong> o <strong>Instalar aplicación</strong>.</li><li>Sigue las instrucciones en pantalla.</li></ol><strong>En macOS (Safari):</strong><ol><li>Abre https://NasaEmoji.com en Safari.</li><li>Ve a <strong>Archivo</strong> > <strong>Agregar al Dock</strong>.</li></ol><strong>En el escritorio (Chrome):</strong><ol><li>Abre https://NasaEmoji.com en Chrome.</li><li>Haz clic en el ícono de <strong>Instalar</strong> en la barra de direcciones (una computadora con una flecha hacia abajo).</li><li>Haz clic en <strong>Instalar</strong>.</li></ol><strong>En el escritorio (Firefox y otros navegadores):</strong><p>Firefox no soporta la instalación de PWA directamente. Puedes agregar el sitio a tus marcadores o crear un acceso directo manualmente.</p>",
                "Tu peux ajouter NasaEmoji en tant qu'application web progressive (PWA) à ton écran d'accueil ou bureau pour un accès rapide.<br><strong>Sur iOS (Safari) :</strong><ol><li>Ouvre https://NasaEmoji.com dans Safari.</li><li>Tape sur l'icône <strong>Partager</strong> (un carré avec une flèche vers le haut).</li><li>Fais défiler vers le bas et tape sur <strong>Ajouter à l'écran d'accueil</strong>.</li><li>Tape sur <strong>Ajouter</strong> dans le coin supérieur droit.</li></ol><strong>Sur Android (Chrome et autres navigateurs) :</strong><ol><li>Ouvre https://NasaEmoji.com dans ton navigateur.</li><li>Tape sur l'icône <strong>Menu</strong> (trois points) dans le coin supérieur droit.</li><li>Sélectionne <strong>Ajouter à l'écran d'accueil</strong> ou <strong>Installer l'application</strong>.</li><li>Suivez les instructions à l'écran.</li></ol><strong>Sur macOS (Safari) :</strong><ol><li>Ouvre https://NasaEmoji.com dans Safari.</li><li>Va dans <strong>Fichier</strong> > <strong>Ajouter au Dock</strong>.</li></ol><strong>Sur Desktop (Chrome) :</strong><ol><li>Ouvre https://NasaEmoji.com dans Chrome.</li><li>Clique sur l'icône <strong>Installer</strong> dans la barre d'adresse (un ordinateur avec une flèche vers le bas).</li><li>Clique sur <strong>Installer</strong>.</li></ol><strong>Sur Desktop (Firefox et autres navigateurs) :</strong><p>Firefox ne prend pas en charge l'installation directe des PWA. Tu peux ajouter le site à tes favoris ou créer un raccourci manuellement.</p>",
                "يمكنك إضافة NasaEmoji كتطبيق ويب تقدمي (PWA) إلى شاشة البداية أو سطح المكتب للوصول السريع.<br><strong>على iOS (Safari):</strong><ol><li>افتح https://NasaEmoji.com في Safari.</li><li>اضغط على أيقونة <strong>مشاركة</strong> (مربع مع سهم لأعلى).</li><li>قم بالتمرير لأسفل واضغط على <strong>إضافة إلى شاشة البداية</strong>.</li><li>اضغط على <strong>إضافة</strong> في الزاوية العليا اليمنى.</li></ol><strong>على Android (Chrome ومتصفحات أخرى):</strong><ol><li>افتح https://NasaEmoji.com في متصفحك.</li><li>اضغط على أيقونة <strong>القائمة</strong> (ثلاث نقاط) في الزاوية العليا اليمنى.</li><li>اختر <strong>إضافة إلى شاشة البداية</strong> أو <strong>تثبيت التطبيق</strong>.</li><li>اتبع التعليمات على الشاشة.</li></ol><strong>على macOS (Safari):</strong><ol><li>افتح https://NasaEmoji.com في Safari.</li><li>اذهب إلى <strong>ملف</strong> > <strong>إضافة إلى Dock</strong>.</li></ol><strong>على سطح المكتب (Chrome):</strong><ol><li>افتح https://NasaEmoji.com في Chrome.</li><li>انقر على أيقونة <strong>تثبيت</strong> في شريط العنوان (كمبيوتر مع سهم للأسفل).</li><li>انقر على <strong>تثبيت</strong>.</li></ol><strong>على سطح المكتب (Firefox ومتصفحات أخرى):</strong><p>Firefox لا يدعم تثبيت PWA مباشرة. يمكنك إضافة الموقع إلى المفضلة أو إنشاء اختصار يدويًا.</p>",
                ""
            ],
        "faqQuestion10": [
            "Is my data secure?",
            "Sind meine Daten sicher?",
            "我的数据安全吗？",
            "Мои данные в безопасности?",
            "¿Está segura mi información?",
            "Mes données sont-elles sécurisées ?",
            "هل بياناتي آمنة؟",
            ""
        ],
        "faqAnswer10": [
            "Yes, all encryption and decryption happen locally on your device. No data is sent anywhere, ensuring your messages remain private.",
            "Ja, alle Verschlüsselungen und Entschlüsselungen erfolgen lokal auf deinem Gerät. Es werden keine Daten irgendwohin gesendet, wodurch deine Nachrichten privat bleiben.",
            "是的，所有加密和解密过程都在你的设备上本地进行。不会将任何数据发送到任何地方，确保你的消息保持私密。",
            "Да, все шифрования и дешифрования происходят локально на вашем устройстве. Данные никуда не отправляются, что обеспечивает сохранность ваших сообщений.",
            "Sí, todas las encriptaciones y desencriptaciones ocurren localmente en tu dispositivo. No se envían datos a ningún lado, asegurando que tus mensajes permanezcan privados.",
            "Oui, tous les processus de chiffrement et de déchiffrement se déroulent localement sur votre appareil. Aucune donnée n'est envoyée nulle part, garantissant que vos messages restent privés.",
            "نعم، جميع عمليات التشفير وفك التشفير تتم محليًا على جهازك. لا يقوم NasaEmoji بإرسال أي بيانات عبر الإنترنت.",
            ""
        ],
        "faqQuestion11": [
            "Can I convert text to emojis without encryption?",
            "Kann ich Text ohne Verschlüsselung in Emojis umwandeln?",
            "我可以在不加密的情况下将文本转换为表情符号吗？",
            "Могу ли я конвертировать текст в эмодзи без шифрования?",
            "¿Puedo convertir texto a emojis sin encriptación?",
            "Puis-je convertir du texte en émojis sans chiffrement ?",
            "هل يمكنني تحويل النص إلى إيموجي بدون تشفير؟",
            ""
        ],
        "faqAnswer11": [
            "Yes, NasaEmoji allows you to convert any text to emojis and back without encryption using the \"Convert\" feature.",
            "Ja, NasaEmoji ermöglicht es dir, jeden Text ohne Verschlüsselung in Emojis und zurück zu konvertieren, indem du die Funktion \"Convert\" verwendest.",
            "是的，NasaEmoji 允许你使用“转换”功能在不加密的情况下将任何文本转换为表情符号并返回。",
            "Да, NasaEmoji позволяет конвертировать любой текст в эмодзи и обратно без шифрования, используя функцию \"Convert\".",
            "Sí, NasaEmoji te permite convertir cualquier texto a emojis y viceversa sin encriptación utilizando la función \"Convert\".",
            "Oui, NasaEmoji vous permet de convertir n'importe quel texte en émojis et vice versa sans chiffrement en utilisant la fonctionnalité \"Convert\".",
            "نعم، يتيح لك NasaEmoji تحويل أي نص إلى إيموجي والعودة بدون تشفير باستخدام ميزة \"تحويل\".",
            ""
        ],
        "faqQuestion12": [
            "What encryption algorithms does NasaEmoji use?",
            "Welche Verschlüsselungsalgorithmen verwendet NasaEmoji?",
            "NasaEmoji 使用了哪些加密算法？",
            "Какие алгоритмы шифрования использует NasaEmoji?",
            "¿Qué algoritmos de cifrado utiliza NasaEmoji?",
            "Quels algorithmes de chiffrement NasaEmoji utilise-t-il ?",
            "ما هي خوارزميات التشفير التي يستخدمها NasaEmoji؟",
            ""
        ],
        "faqAnswer12": [
            "NasaEmoji uses a combination of AES-GCM, AES-CTR, and XOR encryption algorithms to secure your messages.",
            "NasaEmoji verwendet eine Kombination aus AES-GCM, AES-CTR und XOR Verschlüsselungsalgorithmen, um deine Nachrichten zu sichern.",
            "NasaEmoji 使用 AES-GCM、AES-CTR 和 XOR 加密算法的组合来保护您的消息。",
            "NasaEmoji использует комбинацию алгоритмов шифрования AES-GCM, AES-CTR и XOR для защиты ваших сообщений.",
            "NasaEmoji utiliza una combinación de algoritmos de cifrado AES-GCM, AES-CTR y XOR para asegurar tus mensajes.",
            "NasaEmoji utilise une combinaison des algorithmes de chiffrement AES-GCM, AES-CTR et XOR pour sécuriser tes messages.",
            "يستخدم NasaEmoji مزيجًا من خوارزميات التشفير AES-GCM و AES-CTR و XOR لتأمين رسائلك.",
            ""
        ],
        "faqQuestion13": [
            "Why are multiple encryption algorithms used?",
            "Warum werden mehrere Verschlüsselungsalgorithmen verwendet?",
            "为什么使用多个加密算法？",
            "Почему используются несколько алгоритмов шифрования?",
            "¿Por qué se utilizan múltiples algoritmos de cifrado?",
            "Pourquoi plusieurs algorithmes de chiffrement sont-ils utilisés ?",
            "لماذا يتم استخدام خوارزميات تشفير متعددة؟",
            ""
        ],
        "faqAnswer13": [
            "Using multiple algorithms enhances security by adding layers of encryption, making it more difficult for unauthorized parties to decrypt the message.",
            "Durch die Verwendung mehrerer Algorithmen wird die Sicherheit erhöht, indem Verschlüsselungsebenen hinzugefügt werden, was es Unbefugten erschwert, die Nachricht zu entschlüsseln.",
            "使用多个算法通过添加加密层来增强安全性，使未经授权的方更难解密消息。",
            "Использование нескольких алгоритмов повышает безопасность путем добавления слоев шифрования, что затрудняет расшифровку сообщения несанкционированными лицами.",
            "El uso de múltiples algoritmos mejora la seguridad al agregar capas de cifrado, lo que dificulta que partes no autorizadas descifren el mensaje.",
            "L'utilisation de plusieurs algorithmes améliore la sécurité en ajoutant des couches de chiffrement, ce qui rend plus difficile pour les parties non autorisées de déchiffrer le message.",
            "يعمل استخدام خوارزميات متعددة على تعزيز الأمان عن طريق إضافة طبقات من التشفير، مما يجعل من الصعب على الأطراف غير المصرح لها فك تشفير الرسالة.",
            ""
        ],
        "faqQuestion14": [
            "What is key hashing and why is it used?",
            "Was ist Schlüssel-Hashing und warum wird es verwendet?",
            "什么是密钥哈希，为什么要使用它？",
            "Что такое хеширование ключа и зачем оно используется?",
            "¿Qué es el hash de clave y por qué se utiliza?",
            "Qu'est-ce que le hachage de clé et pourquoi est-il utilisé ?",
            "ما هو تجزئة المفتاح ولماذا يتم استخدامها؟",
            ""
        ],
        "faqAnswer14": [
            "Key hashing transforms your key into a fixed-size hash using multiple algorithms, enhancing security by preventing direct access to the original key and making brute-force attacks more difficult.",
            "Schlüssel-Hashing wandelt deinen Schlüssel mithilfe mehrerer Algorithmen in einen Hash fester Größe um, wodurch die Sicherheit erhöht wird, indem der direkte Zugriff auf den ursprünglichen Schlüssel verhindert und Brute-Force-Angriffe erschwert werden.",
            "密钥哈希使用多个算法将您的密钥转换为固定大小的哈希，增强安全性，防止直接访问原始密钥，并使暴力攻击更加困难。",
            "Хеширование ключа преобразует ваш ключ в хеш фиксированного размера с помощью нескольких алгоритмов, повышая безопасность путем предотвращения прямого доступа к исходному ключу и усложнения атак перебором.",
            "El hash de clave transforma tu clave en un hash de tamaño fijo utilizando múltiples algoritmos, mejorando la seguridad al prevenir el acceso directo a la clave original y dificultar los ataques de fuerza bruta.",
            "Le hachage de clé transforme ta clé en un hachage de taille fixe en utilisant plusieurs algorithmes, améliorant la sécurité en empêchant l'accès direct à la clé originale et en rendant les attaques par force brute plus difficiles.",
            "تجزئة المفتاح تحول مفتاحك إلى تجزئة بحجم ثابت باستخدام خوارزميات متعددة، مما يعزز الأمان عن طريق منع الوصول المباشر إلى المفتاح الأصلي وجعل هجمات القوة الغاشمة أكثر صعوبة.",
            ""
        ],
        "faqQuestion15": [
            "How does key hashing prevent brute-force attacks?",
            "Wie verhindert Schlüssel-Hashing Brute-Force-Angriffe?",
            "密钥哈希如何防止暴力攻击？",
            "Как хеширование ключа предотвращает атаки перебором?",
            "¿Cómo previene el hash de clave los ataques de fuerza bruta?",
            "Comment le hachage de clé prévient-il les attaques par force brute ?",
            "كيف يمنع تجزئة المفتاح هجمات القوة الغاشمة؟",
            ""
        ],
        "faqAnswer15": [
            "By hashing the key multiple times with different algorithms and salts, it increases the computational effort required to guess the key, thus deterring brute-force attempts.",
            "Durch mehrmaliges Hashing des Schlüssels mit verschiedenen Algorithmen und Salzen wird der rechnerische Aufwand erhöht, um den Schlüssel zu erraten, wodurch Brute-Force-Versuche abgeschreckt werden.",
            "通过使用不同的算法和盐对密钥进行多次哈希，增加了猜测密钥所需的计算努力，从而阻止暴力攻击。",
            "Хешируя ключ несколько раз с различными алгоритмами и солями, увеличивается вычислительное усилие, необходимое для угадывания ключа, что сдерживает попытки перебора.",
            "Al hashear la clave múltiples veces con diferentes algoritmos y sales, aumenta el esfuerzo computacional requerido para adivinar la clave, disuadiendo así los intentos de fuerza bruta.",
            "En hachant la clé plusieurs fois avec différents algorithmes et sels, cela augmente l'effort computationnel nécessaire pour deviner la clé, dissuadant ainsi les tentatives par force brute.",
            "من خلال تجزئة المفتاح عدة مرات باستخدام خوارزميات وأملاح مختلفة، يزيد ذلك من الجهد الحسابي المطلوب لتخمين المفتاح، وبالتالي يردع محاولات القوة الغاشمة.",
            ""
        ],
        "faqQuestion16": [
            "What is the CryptoJS library?",
            "Was ist die CryptoJS-Bibliothek?",
            "什么是 CryptoJS 库？",
            "Что такое библиотека CryptoJS?",
            "¿Qué es la biblioteca CryptoJS?",
            "Qu'est-ce que la bibliothèque CryptoJS ?",
            "ما هي مكتبة CryptoJS؟",
            ""
        ],
        "faqAnswer17": [
            "CryptoJS is considered secure as it implements well-known cryptographic algorithms correctly. It is used in many applications for secure data handling.",
            "CryptoJS gilt als sicher, da es bekannte kryptografische Algorithmen korrekt implementiert. Es wird in vielen Anwendungen für die sichere Datenverarbeitung verwendet.",
            "CryptoJS 被认为是安全的，因为它正确地实现了众所周知的加密算法。它在许多应用程序中用于安全的数据处理。",
            "CryptoJS считается безопасной, поскольку правильно реализует известные криптографические алгоритмы. Он используется во многих приложениях для безопасной обработки данных.",
            "CryptoJS se considera segura ya que implementa correctamente algoritmos criptográficos bien conocidos. Se utiliza en muchas aplicaciones para el manejo seguro de datos.",
            "CryptoJS est considérée comme sécurisée car elle implémente correctement des algorithmes cryptographiques bien connus. Elle est utilisée dans de nombreuses applications pour la gestion sécurisée des données.",
            "تعتبر CryptoJS آمنة حيث تقوم بتنفيذ خوارزميات التشفير المعروفة بشكل صحيح. يتم استخدامها في العديد من التطبيقات لمعالجة البيانات بأمان.",
            ""
        ],
        "faqQuestion18": [
            "How does NasaEmoji handle key storage?",
            "Wie verwaltet NasaEmoji die Schlüssel-Speicherung?",
            "NasaEmoji 如何处理密钥存储？",
            "Как NasaEmoji обрабатывает хранение ключей?",
            "¿Cómo maneja NasaEmoji el almacenamiento de claves?",
            "Comment NasaEmoji gère-t-il le stockage des clés ?",
            "كيف يتعامل NasaEmoji مع تخزين المفاتيح؟",
            ""
        ],
        "faqAnswer18": [
            "You can save keys locally in one of the 5 available slots using your browser's local storage for quick access.",
            "Du kannst Schlüssel lokal in einem der 5 verfügbaren Slots speichern, indem du den lokalen Speicher deines Browsers für schnellen Zugriff nutzt.",
            "您可以使用浏览器的本地存储将密钥本地保存在 5 个可用插槽中的一个，以便快速访问。",
            "Вы можете сохранить ключи локально в одном из 5 доступных слотов, используя локальное хранилище вашего браузера для быстрого доступа.",
            "Puedes guardar claves localmente en una de las 5 ranuras disponibles utilizando el almacenamiento local de tu navegador para un acceso rápido.",
            "Tu peux enregistrer des clés localement dans l'un des 5 emplacements disponibles en utilisant le stockage local de ton navigateur pour un accès rapide.",
            "يمكنك حفظ المفاتيح محليًا في أحد الخمسة فتحات المتاحة باستخدام التخزين المحلي لمتصفحك للوصول السريع.",
            ""
        ],
        "faqQuestion19": [
            "Does NasaEmoji send any data over the internet?",
            "Sendet NasaEmoji irgendwelche Daten über das Internet?",
            "NasaEmoji 会通过互联网发送任何数据吗？",
            "Отправляет ли NasaEmoji какие-либо данные через интернет?",
            "¿NasaEmoji envía datos a través de Internet?",
            "NasaEmoji envoie-t-il des données sur Internet ?",
            "هل يرسل NasaEmoji أي بيانات عبر الإنترنت؟",
            ""
        ],
        "faqAnswer19": [
            "No, all operations are performed locally on your device. NasaEmoji does not send any data over the internet.",
            "Nein, alle Operationen werden lokal auf deinem Gerät ausgeführt. NasaEmoji sendet keine Daten über das Internet.",
            "不，所有操作都在您的设备上本地执行。NasaEmoji 不会通过互联网发送任何数据。",
            "Нет, все операции выполняются локально на вашем устройстве. NasaEmoji не отправляет никаких данных через интернет.",
            "No, todas las operaciones se realizan localmente en tu dispositivo. NasaEmoji no envía ningún dato a través de Internet.",
            "Non, toutes les opérations sont effectuées localement sur ton appareil. NasaEmoji n'envoie aucune donnée sur Internet.",
            "لا، جميع العمليات تتم محليًا على جهازك. لا يقوم NasaEmoji بإرسال أي بيانات عبر الإنترنت.",
            ""
        ],
        "faqQuestion20": [
            "Can I use NasaEmoji offline?",
            "Kann ich NasaEmoji offline nutzen?",
            "我可以离线使用 NasaEmoji 吗？",
            "Могу ли я использовать NasaEmoji офлайн?",
            "¿Puedo usar NasaEmoji sin conexión?",
            "Puis-je utiliser NasaEmoji hors ligne ?",
            "هل يمكنني استخدام NasaEmoji بدون اتصال بالإنترنت؟",
            ""
        ],
        "faqAnswer20": [
            "Yes, you can download NasaEmoji for local execution and use it offline without an internet connection. The latest release of the program can be downloaded under this <a href=\"https://github.com/mqxym/EmojiCrypt/releases\">link</a>.<ul><li>Download the source code on GitHub as a zip.</li><li>Unpack the zip.</li><li>Open index.html with the browser of your choice.</li></ul>",
            "Ja, du kannst NasaEmoji für die lokale Ausführung herunterladen und es offline ohne Internetverbindung nutzen. Die neueste Version des Programms kann unter diesem <a href=\"https://github.com/mqxym/EmojiCrypt/releases\">Link</a> heruntergeladen werden.<ul><li>Lade den Quellcode auf GitHub als ZIP herunter.</li><li>Entpacke die ZIP-Datei.</li><li>Öffne index.html mit dem Browser deiner Wahl.</li></ul>",
            "是的，您可以下载 NasaEmoji 进行本地执行，并在没有互联网连接的情况下离线使用。程序的最新版本可通过此 <a href=\"https://github.com/mqxym/EmojiCrypt/releases\">链接</a> 下载。<ul><li>在 GitHub 上以 zip 格式下载源代码。</li><li>解压 zip 文件。</li><li>使用您选择的浏览器打开 index.html。</li></ul>",
            "Да, вы можете скачать NasaEmoji для локального использования и использовать его офлайн без подключения к интернету. Последнюю версию программы можно скачать по этой <a href=\"https://github.com/mqxym/EmojiCrypt/releases\">ссылке</a>.<ul><li>Скачайте исходный код на GitHub в формате zip.</li><li>Распакуйте zip.</li><li>Откройте index.html в браузере по вашему выбору.</li></ul>",
            "Sí, puedes descargar NasaEmoji para ejecución local y usarlo sin conexión a Internet. La última versión del programa se puede descargar en este <a href=\"https://github.com/mqxym/EmojiCrypt/releases\">enlace</a>.<ul><li>Descarga el código fuente en GitHub como zip.</li><li>Descomprime el zip.</li><li>Abre index.html con el navegador de tu elección.</li></ul>",
            "Oui, tu peux télécharger NasaEmoji pour une exécution locale et l'utiliser hors ligne sans connexion Internet. La dernière version du programme peut être téléchargée via ce <a href=\"https://github.com/mqxym/EmojiCrypt/releases\">lien</a>.<ul><li>Télécharge le code source sur GitHub au format zip.</li><li>Décompresse le zip.</li><li>Ouvre index.html avec le navigateur de ton choix.</li></ul>",
            "نعم، يمكنك تنزيل NasaEmoji للتشغيل المحلي واستخدامه بدون اتصال بالإنترنت. يمكن تنزيل أحدث إصدار من البرنامج تحت هذا <a href=\"https://github.com/mqxym/EmojiCrypt/releases\">الرابط</a>.<ul><li>قم بتنزيل شفرة المصدر من GitHub كملف zip.</li><li>افتح ملف zip.</li><li>افتح index.html باستخدام المتصفح الذي تختاره.</li></ul>",
            ""
        ],
        "faqQuestion21": [
            "Is the encryption standardized?",
            "Ist die Verschlüsselung standardisiert?",
            "加密是标准化的吗？",
            "Является ли шифрование стандартизированным?",
            "¿El cifrado está estandarizado?",
            "Le chiffrement est-il standardisé ?",
            "هل التشفير موحد؟",
            ""
        ],
        "faqAnswer21": [
            "NasaEmoji uses standard encryption algorithms but combines them uniquely. While secure, it is recommended for casual use rather than critical security applications.",
            "NasaEmoji verwendet standardisierte Verschlüsselungsalgorithmen, kombiniert sie jedoch auf einzigartige Weise. Obwohl sicher, wird es eher für den persönlichen Gebrauch als für kritische Sicherheitsanwendungen empfohlen.",
            "NasaEmoji 使用标准的加密算法，但以独特的方式组合它们。虽然安全，但建议用于个人用途而非关键的安全应用程序。",
            "NasaEmoji использует стандартные алгоритмы шифрования, но комбинирует их уникальным образом. Хотя это безопасно, рекомендуется для личного использования, а не для критически важных приложений безопасности.",
            "NasaEmoji utiliza algoritmos de cifrado estándar pero los combina de manera única. Aunque es seguro, se recomienda para uso casual en lugar de aplicaciones de seguridad críticas.",
            "NasaEmoji utilise des algorithmes de chiffrement standard mais les combine de manière unique. Bien que sécurisé, il est recommandé pour un usage personnel plutôt que pour des applications de sécurité critiques.",
            "يستخدم NasaEmoji خوارزميات تشفير معيارية ولكنه يجمعها بشكل فريد. على الرغم من أنه آمن، يُنصح بالاستخدام الشخصي بدلاً من تطبيقات الأمان الحيوية.",
            ""
        ],
        "faqQuestion22": [
            "Can I trust NasaEmoji for highly sensitive information?",
            "Kann ich NasaEmoji für hochsensible Informationen vertrauen?",
            "我可以信任 NasaEmoji 处理高度敏感的信息吗？",
            "Могу ли я доверять NasaEmoji для очень конфиденциальной информации?",
            "¿Puedo confiar en NasaEmoji para información altamente sensible?",
            "Puis-je faire confiance à NasaEmoji pour des informations hautement sensibles ?",
            "هل يمكنني الوثوق بـ NasaEmoji للمعلومات الحساسة جدًا؟",
            ""
        ],
        "faqAnswer22": [
            "While NasaEmoji employs strong encryption, it is primarily designed for personal and casual use. For highly sensitive information, consult security professionals.",
            "Obwohl NasaEmoji starke Verschlüsselung verwendet, ist es hauptsächlich für den persönlichen Gebrauch konzipiert. Für hochsensible Informationen konsultiere bitte Sicherheitsexperten.",
            "虽然 NasaEmoji 采用强加密，但它主要用于个人和非正式用途。对于高度敏感的信息，请咨询安全专业人员。",
            "Хотя NasaEmoji использует сильное шифрование, он в основном предназначен для личного использования. Для очень конфиденциальной информации обратитесь к специалистам по безопасности.",
            "Aunque NasaEmoji emplea un cifrado fuerte, está diseñado principalmente para uso personal y casual. Para información altamente sensible, consulta a profesionales de seguridad.",
            "Bien que NasaEmoji utilise un chiffrement fort, il est principalement conçu pour un usage personnel. Pour des informations hautement sensibles, consulte des professionnels de la sécurité.",
            "بينما يستخدم NasaEmoji تشفيرًا قويًا، فهو مصمم بشكل أساسي للاستخدام الشخصي والعفوي. بالنسبة للمعلومات الحساسة جدًا، يُفضل استشارة متخصصي الأمان.",
            ""
        ],
        "faqQuestion23": [
            "Is NasaEmoji open-source?",
            "Ist NasaEmoji Open Source?",
            "NasaEmoji 是开源的吗？",
            "Является ли NasaEmoji открытым исходным кодом?",
            "¿NasaEmoji es de código abierto?",
            "NasaEmoji est-il open-source ?",
            "هل NasaEmoji مفتوح المصدر؟",
            ""
        ],
        "faqAnswer23": [
            "Yes, NasaEmoji's source code is available on <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub</a>, allowing you to review and contribute to its development.",
            "Ja, der Quellcode von NasaEmoji ist auf <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub</a> verfügbar, sodass du ihn überprüfen und zur Entwicklung beitragen kannst.",
            "是的，NasaEmoji 的源代码在 <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub</a> 上可用，允许您查看并为其开发做出贡献。",
            "Да, исходный код NasaEmoji доступен на <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub</a>, что позволяет вам просматривать и вносить вклад в его разработку.",
            "Sí, el código fuente de NasaEmoji está disponible en <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub</a>, lo que te permite revisar y contribuir a su desarrollo.",
            "Oui, le code source de NasaEmoji est disponible sur <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub</a>, ce qui te permet de le consulter et de contribuer à son développement.",
            "نعم، شفرة مصدر NasaEmoji متاحة على <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub</a>، مما يتيح لك مراجعتها والمساهمة في تطويرها.",
            ""
        ],
        "faqQuestion24": [
            "How can I contribute to NasaEmoji?",
            "Wie kann ich zu NasaEmoji beitragen?",
            "我如何为 NasaEmoji 做出贡献？",
            "Как я могу внести вклад в NasaEmoji?",
            "¿Cómo puedo contribuir a NasaEmoji?",
            "Comment puis-je contribuer à NasaEmoji ?",
            "كيف يمكنني المساهمة في NasaEmoji؟",
            ""
        ],
        "faqAnswer24": [
            "You can contribute by visiting the <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub repository</a>, reporting issues, suggesting improvements, or submitting pull requests. Translation improvements are always appreciated.",
            "Du kannst beitragen, indem du das <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub-Repository</a> besuchst, Probleme meldest, Verbesserungen vorschlägst oder Pull Requests einreichst. Verbesserungen der Übersetzung werden stets begrüßt.",
            "您可以通过访问 <a href=\"https://github.com/mqxym/EmojiCrypt\">GitHub 仓库</a>、报告问题、提出改进建议或提交拉取请求来做出贡献。翻译改进始终受到欢迎。",
            "Вы можете внести вклад, посетив <a href=\"https://github.com/mqxym/EmojiCrypt\">репозиторий на GitHub</a>, сообщив об ошибках, предложив улучшения или отправив pull-запросы. Улучшения перевода всегда приветствуются.",
            "Puedes contribuir visitando el <a href=\"https://github.com/mqxym/EmojiCrypt\">repositorio de GitHub</a>, informando problemas, sugiriendo mejoras o enviando pull requests. Se aprecian siempre las mejoras en las traducciones.",
            "Tu peux contribuer en visitant le <a href=\"https://github.com/mqxym/EmojiCrypt\">dépôt GitHub</a>, en signalant des problèmes, en suggérant des améliorations ou en soumettant des pull requests. Les améliorations des traductions sont toujours appréciées.",
            "يمكنك المساهمة بزيارة <a href=\"https://github.com/mqxym/EmojiCrypt\">مستودع GitHub</a>، الإبلاغ عن المشكلات، اقتراح التحسينات، أو تقديم طلبات سحب. تحسين الترجمات دائمًا مرحب به.",
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
