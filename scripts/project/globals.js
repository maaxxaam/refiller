// This module is used as a way to define global variables.
// In modules, a top-level variable declaration is only accessible within the
// same module, so that doesn't work for defining global variables.
// Setting global properties on 'window' or 'globalThis' is generally frowned
// upon, since it shares the browser's own global namespace, which is already
// croweded. That makes it hard to avoid conflicts, and also trickier to view
// in the debugger.
// Module exports are read-only, so variables can't be written to if they are
// directly exported. Therefore we export a global object, with properties
// to represent global variables. Any script can import globals.js and access
// Globals.score etc., including writing to them.

export class Command {
	constructor(func){
		if (func) {
			this.exec = func;
		} else {
			this.exec = null;
		}
	}
	
	rebind(func){
		if (func) {
			this.exec = func;
		} else {
			this.exec = null;
		}
	}
	
	execute(){
		this.exec();
	}
}

export function Platform(gameKey, secretKey, prefix, shopText) {
	return {
		gameKey: gameKey,
		secretKey: secretKey,
		prefix: prefix,
		shopText: shopText
	}
}

export const vars = {
	platforms: {
		"VK": Platform("", "", "VK", ""),
		"YANDEX": Platform("", "", "YA", ""),
		"OK": Platform("", "", "OK", ""),
		"NONE": Platform("", "", "VK", "втра можно!")
	},
	platform: null,
	runtime: null
};

// Export the object representing global variables.
export default {vars, Command, Platform};