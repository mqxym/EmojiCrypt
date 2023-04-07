function getTranslation(e, r) {
    let n = [
        ["footerSource", 
            "Sourcecode (Github)", 
            "Quellcode (Github)", 
            "源代码（Github）", 
            "Исходный код (Github)", 
            "Código fuente (Github)",
            "Code source (Github)",
            "",
            ""],
        ["explanation", 
            "<h6>Encrypt or decrypt texts or messages with a password. The output is Emojis, the key is Emojis. With NasaEmoji, you can send secret messages to anyone! Generate and share a common key with your recipient using a method of your choice. Save the key in one of the 5 slots for ease of access. </h6>", 
            "<h6>Verschlüsseln oder entschlüsseln Sie Texte oder Nachrichten mit einem Passwort. Die Ausgabe sind Emojis, der Schlüssel sind Emojis. Mit NasaEmoji können Sie geheime Nachrichten an jeden senden! Teilen Sie Ihrem Empfänger einen gemeinsamen Schlüssel mit, indem Sie eine Methode Ihrer Wahl verwenden. Speichern Sie den Schlüssel in einem der 5 Slots, damit Sie leicht darauf zugreifen können.</h6>", 
            "<h6>用密码加密或解密文本或信息。输出的是Emojis，钥匙是Emojis。使用NasaEmoji，你可以向任何人发送秘密信息 用你选择的方法与你的收件人分享一个共同的密钥。将钥匙保存在5个插槽中的一个，以方便使用。</h6>", 
            "<h6>Шифруйте или расшифровывайте тексты или сообщения с помощью пароля. На выходе - эмодзи, ключ - эмодзи. С помощью NasaEmoji вы можете отправлять секретные сообщения кому угодно! Поделитесь общим ключом с получателем, используя выбранный вами метод. Сохраните ключ в одном из 5 слотов для удобства доступа.</h6>", 
            "<h6>Cifra o descifra textos o mensajes con una contraseña. La salida son Emojis, la clave son Emojis. Con NasaEmoji, ¡puedes enviar mensajes secretos a cualquiera! Comparte una clave común con tu destinatario utilizando el método que prefieras. Guarda la clave en una de las 5 ranuras para facilitar el acceso.</h6>",
            "<h6>Chiffrer ou déchiffrer des textes ou des messages à l'aide d'un mot de passe. La sortie est constituée d'Emojis, la clé est constituée d'Emojis. Avec NasaEmoji, vous pouvez envoyer des messages secrets à n'importe qui ! Partagez une clé commune avec votre destinataire en utilisant la méthode de votre choix. Sauvegardez la clé dans l'un des 5 emplacements pour y accéder facilement.</h6>",
            "", 
            ""],
        ["footerHigh", 
            "Secure on device AES encryption! Version " + getVersion() + "<br>No data sent. No cookies. No tracking. No logging.<br>Anti-Bruteforce/Quantum/ASIC<br><hr>🌌 Switch language:", 
            "Sichere AES Verschlüsselung auf dem Gerät! Version " + getVersion() + "<br>Keine Daten werden gesendet. Keine Cookies. Kein Tracking. Kein Logging.<br>Anti-Bruteforce/Quantum/ASIC<br><hr>🌌 Switch language:", 
            "设备上的安全加密！版本 " + getVersion() + "<br>没有数据发送。没有饼干。没有跟踪。没有记录。反暴力/量子/ASIC<br><hr> 🌌 Switch Language:", 
            "Безопасное шифрование на устройстве! Version " + getVersion() +"<br>Никаких данных не отправляется. Никаких файлов cookie. Никакого отслеживания. Никакого протоколирования. <br><hr> 🌌 Switch language:", 
            "Encriptación segura en el dispositivo! Versión " + getVersion() + "<br> No se envían datos. No hay cookies. No hay rastreo. No hay registro. <br> Anti-Bruteforce/Quantum/ASIC<br><hr> 🌌 Switch language:",
            "Cryptage sécurisé sur le dispositif! Version "+ getVersion() + "<br>Aucune donnée envoyée. Pas de cookies. Pas de suivi. Pas d'enregistrement. <br>Anti-Bruteforce/Quantum/ASIC<br><hr> 🌌 Change language:", 
            "", 
            ""],
        ["inputText", 
            "message", 
            "Nachricht", 
            "信息", 
            "сообщение", 
            "mensaje",
            "message",
            "", 
            ""],
        ["btnConvert", 
            "🔀 Encrypt / Decrypt", 
            "🔀 Verschlüsseln / Entschlüsseln", 
            "🔀加密/解密", 
            "🔀 Шифрование / Расшифровка", 
            "🔀 Cifrar / Descifrar",
            "🔀 Cryptage/décryptage",
            "", 
            ""],
        ["deleteText", 
            "Delete <br> Message", 
            "Text <br> löschen", 
            "删除消息", 
            "Удалить <br> сообщение", 
            "Eliminar <br> Mensaje", 
            "Supprimer <br>le message",
            "",
            ""],
        ["copyKey", 
            "Copy", 
            "Kopieren", 
            "拷贝", 
            "Копировать", 
            "Copie",
            "Copie",
            "", 
            ""],
        ["btnEncodeWorking", 
            "⚙️ Encrypting...", 
            "⚙️ Verschlüsseln...", 
            "⚙️ 加密...", 
            "⚙️ Шифрование...", 
            "⚙️ Cifrar...", 
            "⚙️ Encrypting...",
            "",
            ""],
        ["btnEncodeFailed", 
            "💔 Error. Try again?", 
            "💔 Fehler. Nochmal versuchen?", 
            "💔失败。再试一次？", 
            "💔 Ошибка. Попробуйте еще раз", 
            "💔 Error. Inténtelo de nuevo", 
            "💔 Erreur. Essayez à nouveau",
            "", 
            ""],
        ["btnEncodeSuccess", 
            "💚 Encrypted!", 
            "💚 Verschlüsselt!", 
            "💚 加密!", 
            "💚 Зашифровано!", 
            "💚 ¡Encriptado!", 
            "💚 Crypté !",
            "", 
            ""],
        ["btnDecodeWorking", 
            "⚙️ Decrypting...", 
            "⚙️ Entschlüsseln...", 
            "⚙️解密...", 
            "⚙️ Расшифровка...", 
            "⚙️ Descifrar...", 
            "⚙️ Décryptage...", 
            "",
            ""],
        ["btnDecodeFailed", 
            "💔 Failed. Wrong key/password?", 
            "💔 Falsches Passwort?", 
            "💔 失败。密钥/密码错误？", 
            "💔 Не удалось. Неправильный ключ/пароль?", 
            "💔 Falló. ¿Clave/contraseña incorrecta?", 
            "💔 Échec. Mauvaise clé/mot de passe ?", 
            "", 
            ""],
        ["btnDecodeSuccess", 
            "💚 Decrypted!", 
            "💚 Entschlüsselt!", 
            "💚 解密了!", 
            "💚 Расшифровано!", 
            "💚 ¡Descifrado!", 
            "💚 Décrypté !", 
            "", 
            ""],
        ["copyMessage",
             "Copy <br>to clipboard", 
             "Kopieren <br>in die <br> Zwischen-<br>ablage", 
             "复制<br>到剪贴板", 
             "Копировать <br>в буфер обмена", 
             "Copiar", 
             "Copie", 
             "",
             ""],
        ["out", 
            "Decrypted/Encrypted message", 
            "Entschlüsselte/Verschlüsselte Nachricht", 
            "解密的/加密的信息", 
            "Расшифрованное/зашифрованное сообщение", 
            "Mensaje desencriptado/encriptado", 
            "Message décrypté/encrypté", 
            "", 
            ""],
        ["saveKey", 
            "<b>Load</b> or <b>save</b> keys from or to browser", 
            "Schlüssel im Browser <b>speichern</b> oder <b>laden</b>", 
            "负载<br>或<b>拯救</b>从或到浏览器的键", 
            "Загрузка или сохранение ключей из браузера или в браузер", 
            "Cargar o guardar claves desde o hacia el navegador", 
            "Chargement ou sauvegarde des clés depuis ou vers le navigateur",
            "", 
            ""],
        ["saved", 
            "💾 Saved", 
            "💾 Gespeichert", 
            "💾救了", 
            "💾 Спасенный", 
            "💾 Guardado", 
            "💾 Sauvé", 
            "", 
            ""],
        ["loadKey", 
            "📲 Loaded", 
            "📲 Geladen", 
            "📲 已加载", 
            "📲 Загрузка", 
            "📲 Cargado", 
            "📲 Chargé", 
            "",
            ""],
        ["btnLoad", 
            "📲 Load", 
            "📲 Laden", 
            "📲 负载", 
            "📲 Загрузка", 
            "📲 Carga",
            "📲 Charge",
            "", 
            ""],
        ["btnSave", 
            "💾 Save", 
            "💾 Speichern", 
            "💾保存", 
            "💾 Сохранить", 
            "💾 Guardar",
            "💾 Save", 
            "", 
            ""],
        ["error", 
            "❌ Error", 
            "❌ Fehler", 
            "❌ Error", 
            "❌ Error", 
            "❌ Error",
            "❌ Error",
            "",
            ""],
        ["", 
            "", 
            "", 
            "", 
            "", 
            "",
            "",
            "",
            ""],
        ["", "", "", "", "", ""]
    ];
    for (let s = 0; s < n.length; s++)
        if (e === n[s][0]) return n[s][r + 1]
}