const jwt = require('../auth/jwt_auth');
const ObjectId = require('mongodb').ObjectId;

const new_entry_params = params => ({
	title: params.title,
	overview: params.overview || '',
	poster_path: params.poster_path || '',
	score: params.score || 0,
	notes: ''
});

const create = (req, res) => {
	const entry = new_entry_params(req.body);

	const user_collection = req.app.locals.users;
	const match = { _id: ObjectId(jwt.getUserId(req, res)) };
	const update = { [`${req.params.type}.${req.body.id}`]: entry };

	user_collection.updateOne(match, {$set: update})
	.then(mongoRes => res.status(200).json({ entry }))
	.catch(error => res.status(422).json({ error }));
};

const destroy = (req, res) => {
	const user_collection = req.app.locals.users;
	const match = { _id: ObjectId(jwt.getUserId(req, res)) };
	const update = { [`${req.params.type}.${req.params.tmdb_id}`]: 1 };

	user_collection.updateOne(match, {$unset: update})
	.then(mongoRes => res.status(200).json({ mongoRes }))
	.catch(error => res.status(422).json({ error }));
};


module.exports = {
	create,
	destroy
};
