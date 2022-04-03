/*

Translation


*/

function getTranslation (id, lang) {
	let translation = [
		[	"footerSource", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],
		[	"explanation",
			"<h6>Encrypt or decrypt texts or messages with a password. The emoji-output can be converted back again only with the right password.</h6>",
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
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],	
		[	"footerHigh", 
			"Sourcecode (Github)",
			"Quellcode (Github)"],		
			
	];

	for (let i = 0; i < translation.length; i++) {
		if (id == translation[i][0]) {
			return translation[i][lang+1];
		}
	}
}

function getBtnDecodeWorking(id) {
	switch (id) {
		case 0:
			return "⚙️ Decrypting...";
		case 1:
			return "⚙️ Entschlüsseln...";
	}
}

function getBtnDecodeFailed(id) {
	switch (id) {
		case 0:
			return "💔 Failed. Wrong key/password?";
		case 1:
			return "💔 Falsches Passwort?";
	}
}

function getBtnDecodeSuccess(id) {
	switch (id) {
		case 0:
			return "💚 Decrypted!";
		case 1:
			return "💚 Entschlüsselt!";
	}
}

function getBtnEncodeWorking(id) {
	switch (id) {
		case 0:
			return "⚙️ Encrypting...";
		case 1:
			return "⚙️ Verschlüsseln...";
	}
}

function getBtnEncodeFailed(id) {
	switch (id) {
		case 0:
			return "💔 Failure. Try again?";
		case 1:
			return "💔 Fehler. Nochmal versuchen?";
	}
}

function getBtnEncodeFinished(id) {
	switch (id) {
		case 0:
			return "💚 Encrypted!";
		case 1:
			return "💚 Verschlüsselt!";
	}
}

function getBtnKeyGenerate(id) {
	switch (id) {
		case 0:
			return "Generate";
		case 1:
			return "Generator";
	}
}

function getCopyKey(id) {
	switch (id) {
		case 0:
			return "Copy";
		case 1:
			return "Kopie";
	}
}

function getCopyMessage(id) {
	switch (id) {
		case 0:
			return "Copy <br>to clipboard";
		case 1:
			return "Kopieren <br>in die <br> Zwischen-<br>ablage";
	}
}

function getOut(id) {
	switch (id) {
		case 0:
			return "Decrypted/Encrypted message";
		case 1:
			return "Entschlüsselte/Verschlüsselte Nachricht";
	}
}

function getSaveKey(id) {
	switch (id) {
		case 0:
			return "<b>Load</b> or <b>save</b> keys from or to browser";
		case 1:
			return "Schlüssel im Browser <b>speichern</b> oder <b>laden</b>";
	}
}

function getSaved(id) {
	switch (id) {
		case 0:
			return "💾 Saved";
		case 1:
			return "💾 Gespeichert";
	}
}

function getLoadKey(id) {
	switch (id) {
		case 0:
			return "📲 Loaded";
		case 1:
			return "📲 Geladen";
	}
}

function getBtnLoad(id) {
	switch (id) {
		case 0:
			return "📲 Load";
		case 1:
			return "📲 Laden";
	}
}

function getBtnSave(id) {
	switch (id) {
		case 0:
			return "💾 Save";
		case 1:
			return "💾 Speichern";
	}
}

function get(id) {
	switch (id) {
		case 0:
			return "";
		case 1:
			return "";
	}
}

function get(id) {
	switch (id) {
		case 0:
			return "";
		case 1:
			return "";
	}
}