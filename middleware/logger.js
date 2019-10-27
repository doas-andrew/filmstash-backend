const logger = (req, res, next) => {
	const d = new Date();
	const timestamp = '[' + d.getFullYear() + '-' +
	('0' + (d.getUTCMonth()+1)).slice(-2) + '-' +
	('0' + d.getUTCDate()).slice(-2) + ' | ' +
	('0' + d.getUTCHours()).slice(-2) + ':' +
	('0' + d.getUTCMinutes()).slice(-2) + ':' + 
	('0' + d.getUTCSeconds()).slice(-2) + ' UTC]';
	const message = `${timestamp} ${req.method} ${req.originalUrl}`;
	console.log(message);
	next();
}

module.exports = logger;
