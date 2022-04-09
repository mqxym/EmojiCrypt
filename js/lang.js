/*

Translation


*/

function getTranslation (id, lang) {
	let translation = [
		[	"footerSource", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],
		[	"explanation",
			"<h6>Encrypt or decrypt texts or messages with a password. The output can be converted back again only with the right password. For very long texts, hex or base64 encryption is recommended.</h6>",
			"<h6>Verschlüssele Text oder Nachrichten mit einem Passwort. Nur das richtige Passwort kann den Text wieder entschlüsseln. Für lange Texte ist das Benutzen von Hexadezimal oder Base64 empfohlen.</h6>"],
		[	"footerHigh", 
			"Secure on device AES/BF encryption! Version " + getVersion() + "<br>No data sent. No cookies. No tracking. No logging.<br>Anti-Bruteforce/Quantum/ASIC<br>Sprache wechseln:",
			"Sichere AES+Blowfish Verschlüsselung auf dem Gerät! Version " + getVersion() + "<br>Keine Daten werden gesendet. Keine Cookies. Kein Tracking. Kein Logging.<br>Anti-Bruteforce/Quantum/ASIC<br>Change language:"],
		[	"inputText", 
			"message",
			"Nachricht"],
		[	"btnConvert", 
			"🔀 Encrypt / Decrypt",
			"🔀 Verschlüsseln / Entschlüsseln"],	
		[	"deleteText", 
			"Delete <br> Message",
			"Text <br> löschen"],	
		[	"copyKey", 
			"Copy",
			"Kopieren"],	
		[	"btnEncodeWorking", 
			"⚙️ Encrypting...",
			"⚙️ Verschlüsseln..."],	
		[	"btnEncodeFailed", 
			"💔 Failure. Try again?",
			"💔 Fehler. Nochmal versuchen?"],	
		[	"btnEncodeSuccess", 
			"💚 Encrypted!",
			"💚 Verschlüsselt!"],	
		[	"btnDecodeWorking", 
			"⚙️ Decrypting...",
			"⚙️ Entschlüsseln..."],	
		[	"btnDecodeFailed", 
			"💔 Failed. Wrong key/password?",
			"💔 Falsches Passwort?"],	
		[	"btnDecodeSuccess", 
			"💚 Decrypted!",
			"💚 Entschlüsselt!"],
		[	"copyMessage", 
			"Copy <br>to clipboard",
			"Kopieren <br>in die <br> Zwischen-<br>ablage"],	
		[	"out", 
			"Decrypted/Encrypted message",
			"Entschlüsselte/Verschlüsselte Nachricht"],	
		[	"saveKey", 
			"<b>Load</b> or <b>save</b> keys from or to browser",
			"Schlüssel im Browser <b>speichern</b> oder <b>laden</b>"],	
		[	"saved", 
			"💾 Saved",
			"💾 Gespeichert"],	
		[	"loadKey", 
			"📲 Loaded",
			"📲 Geladen"],	
		[	"btnLoad", 
			"📲 Load",
			"📲 Laden"],
		[	"btnSave", 
			"💾 Save",
			"💾 Speichern"],
		[	"", 
			"",
			""],	
		[	"", 
			"",
			""],		
			
	];

	//Returns the translation (1 is english, 2 is german)

	for (let i = 0; i < translation.length; i++) {
		if (id === translation[i][0]) {
			return translation[i][lang+1];
		}
	}
}