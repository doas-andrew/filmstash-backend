module.exports = (req, res, next) => {
	const date = new Date();
	const timestamp = '[' + date.getFullYear() + '-' +
	('0' + (date.getUTCMonth()+1)).slice(-2) + '-' +
	('0' + date.getUTCDate()).slice(-2) + ' | ' +
	('0' + date.getUTCHours()).slice(-2) + ':' +
	('0' + date.getUTCMinutes()).slice(-2) + ':' + 
	('0' + date.getUTCSeconds()).slice(-2) + ' UTC]';
	console.log(`${timestamp} ${req.method} ${req.originalUrl} from ${req.hostname}`);
	next();
}