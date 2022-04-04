/*

Translation


*/

function getTranslation (id, lang) {
	let translation = [
		[	"footerSource", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],
		[	"explanation",
			"<h6>Encrypt or decrypt texts or messages with a password. The output can be converted back again only with the right password.</h6>",
			"<h6>Verschlüssele Text oder Nachrichten mit einem Passwort. Nur das richtige Passwort kann den Text wieder entschlüsseln.</h6>"],
		[	"footerHigh", 
			"Secure on device AES/BF encryption! Version " + getVersion(),
			"Sichere AES+Blowfish Verschlüsselung auf dem Gerät! Version " + getVersion()],
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

	if(id == -1) {
		return translation;
	}

	//Returns the translation (1 is english, 2 is german)

	for (let i = 0; i < translation.length; i++) {
		//console.log(id + " " + translation[i][0]);
		if (id === translation[i][0]) {
			//console.log(translation[i][lang+1]);
			return translation[i][lang+1];
		}
	}
}