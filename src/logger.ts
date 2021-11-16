var fs = require('fs');

// Our Logger object
var Logger = (exports.Logger = {
	info(msg: string) {
		var message = `${new Date().toISOString()} : ${msg}\n`;
		infoStream.write(message);
	},
	err(msg: string) {
		var message = `${new Date().toISOString()} : ${msg}\n`;
		errorStream.write(message);
	}
});

// Create 2 sets of write streams for the 2 levels of logging
var infoStream = fs.createWriteStream('./logs/info.txt');
var errorStream = fs.createWriteStream('./logs/error.txt');
