const JWT = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const secret = process.env.JWT_SECRET;

async function authorize(req) {
	let current_user = null;

	try {
		let id = decodeJWT(req).id;
		if (id) {
			id = ObjectId.createFromHexString(id);
			current_user = await req.app.locals.users.findOne({ _id: id });
		} 
	} catch (error) {};

	if (current_user) return current_user;
	else throw 'Bad token. Please log in.';
}

function getUserId(req) {
	// Validates token without making a query for the full user object
	return new Promise((resolve, reject) => {
		try {
			resolve(decodeJWT(req).id);
		} catch {
			reject('Bad token. Please log in.');
		}
	});
}

function newToken(user) {
	const payload = { id: user._id, username: user.username };
	return JWT.sign(payload, secret);
}

function decodeJWT(req) {
	const token = req.headers.authorization.split(' ')[1];
	return JWT.verify(token, secret);
}

module.exports = {
	authorize,
	getUserId,
	newToken,
};