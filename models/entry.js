const jwt = require('../auth/jwt_auth');
const ObjectId = require('mongodb').ObjectId;


const entry_params = params => ({
	title: params.title || '',
	overview: params.overview || '',
	poster_path: params.poster_path || '',
	score: params.score || '0',
	genre_ids: params.genre_ids || [],
	notes: params.notes || ''
});

const create = (req, res) => {
	const entry = entry_params(req.body);

	const user_collection = req.app.locals.users;
	const matchUser = { _id: ObjectId(jwt.getUserId(req, res)) };
	const action = { [`${req.params.type}.${req.body.id}`]: entry };

	user_collection.updateOne(matchUser, {$set: action})
	.then(mongoRes => res.status(200).json({ entry }))
	.catch(error => res.status(422).json({ error }));
};

const update = (user, req, res) => {
	const entry = entry_params(req.body);

	const user_collection = req.app.locals.users;
	const matchUser = { _id: ObjectId(user._id) };
	let action = { [`${req.params.type}.${req.params.tmdb_id}`]: entry };

	if (req.params.type === 'completed' && user.favorites[req.params.tmdb_id]) {
		action['favorites.'+req.params.tmdb_id] = entry;
	}
	else if (req.params.type === 'favorites' && user.completed[req.params.tmdb_id]) {
		action['completed.'+req.params.tmdb_id] = entry;
	}

	user_collection.updateOne(matchUser, {$set: action} )
	.then(mongoRes => res.status(200).json({ entry }))
	.catch(error => res.status(422).json({ error }));
};

const destroy = (req, res) => {
	const user_collection = req.app.locals.users;
	const matchUser = { _id: ObjectId(jwt.getUserId(req, res)) };
	const action = { [`${req.params.type}.${req.params.tmdb_id}`]: 1 };

	user_collection.updateOne(matchUser, {$unset: action})
	.then(mongoRes => res.status(200).json({ mongoRes }))
	.catch(error => res.status(422).json({ error }));
};


module.exports = {
	create,
	update,
	destroy
};
