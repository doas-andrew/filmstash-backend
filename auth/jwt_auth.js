const JWT = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const secret = process.env.JWT_SECRET;


const authorize = async (req, res) => {
	let current_user = null;

	try {
		const token = req.headers.authorization.split(' ')[1];
		const payload = JWT.verify(token, secret);
		if (payload && payload._id)
			current_user = await req.app.locals.users.findOne({ _id: ObjectId(payload._id) });
	}
	catch (error) {};

	if (current_user)
		return current_user;
	else
		throw 'Bad token. Please log in.';
};

// Gets current user's ID from token without making a query for the full user object
const getUserId = (req, res) => {
	let _id = null;

	try {
		const token = req.headers.authorization.split(' ')[1];
		const payload = JWT.verify(token, secret);
		_id = payload._id
	}
	catch (error) {};

	if (_id)
		return _id;
	else
		res.status(401).json({ error: 'Bad token. Please log in.' });
};

const newToken = user => {
	const payload = { _id: user._id, username: user.username };
	return JWT.sign(payload, secret);
};


module.exports = {
	authorize,
	getUserId,
	newToken
};
