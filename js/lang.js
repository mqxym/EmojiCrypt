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
            "<h6>Encrypt or decrypt texts or messages with a password. The output can be converted back again only with the right password. For very long texts, hex or base64 encryption is recommended.</h6>", 
            "<h6>Verschlüssele Text oder Nachrichten mit einem Passwort. Nur das richtige Passwort kann den Text wieder entschlüsseln. Für lange Texte ist das Benutzen von Hexadezimal oder Base64 empfohlen.</h6>", 
            "<h6>使用密码加密或解密文本或消息。只有使用正确的密码才能再次转换输出。对于很长的文本，建议使用 hex 或 base64 加密。</h6>", 
            "<h6>Шифруйте или расшифровывайте тексты или сообщения с помощью пароля. Выходные данные могут быть преобразованы обратно только при наличии правильного пароля. Для очень длинных текстов рекомендуется использовать шестнадцатеричное шифрование или шифрование base64.</h6>", 
            "<h6>Cifra o descifra textos o mensajes con una contraseña. La salida se puede volver a convertir sólo con la contraseña correcta. Para textos muy largos, se recomienda el cifrado hexadecimal o en base64.</h6>",
            "<h6>Encryptez ou décryptez des textes ou des messages avec un mot de passe. La sortie ne peut être reconvertie qu'avec le bon mot de passe. Pour les textes très longs, le cryptage hexa ou base64 est recommandé.</h6>",
            "", 
            ""],
        ["footerHigh", 
            "Secure on device encryption! Version " + getVersion() + "<br>No data sent. No cookies. No tracking. No logging.<br>Anti-Bruteforce/Quantum/ASIC<br>🌌 Switch language:", 
            "Sichere Verschlüsselung auf dem Gerät! Version " + getVersion() + "<br>Keine Daten werden gesendet. Keine Cookies. Kein Tracking. Kein Logging.<br>Anti-Bruteforce/Quantum/ASIC<br>🌌 Switch language:", 
            "设备上的安全加密！版本 " + getVersion() + "<br>没有数据发送。没有饼干。没有跟踪。没有记录。反暴力/量子/ASIC<br>, 🌌 Switch Language:", 
            "Безопасное шифрование на устройстве! Version" + getVersion() +"<br>Никаких данных не отправляется. Никаких файлов cookie. Никакого отслеживания. Никакого протоколирования. <br> 🌌 Switch language:", 
            "Encriptación segura en el dispositivo! Versión " + getVersion() + "<br> No se envían datos. No hay cookies. No hay rastreo. No hay registro. <br> Anti-Bruteforce/Quantum/ASIC<br> 🌌 Switch language:",
            "Cryptage sécurisé sur le dispositif! Version "+ getVersion() + "<br>Aucune donnée envoyée. Pas de cookies. Pas de suivi. Pas d'enregistrement. <br>Anti-Bruteforce/Quantum/ASIC<br> 🌌 Change language:", 
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
            "💔 Error. Try again", 
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