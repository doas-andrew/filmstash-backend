const { ObjectId } = require('mongodb');

function entryParams(params) {
	return {
		title: params.title || '',
		overview: params.overview || '',
		poster_path: params.poster_path || '',
		genre_ids: params.genre_ids || [],
	}
}

function create(uid, req, res){
	const entry = entryParams(req.body.entry);
	const key = `${req.params.type}.${req.body.id}`;
	const id = ObjectId.createFromHexString(uid);
	const action = { $set: { [key]: entry }};

	if (req.params.type === 'completed') {
		action['$unset'] = {['backlog.' + req.body.id]: 1}
	} else if (req.params.type === 'favorites') {
		action['$set']['completed.' + req.body.id] = entry
		action['$unset'] = {['backlog.' + req.body.id]: 1}
	}

	req.app.locals.users.updateOne({ _id: id }, action)
	.then(() => res.status(200).json({ entry }))
	.catch(error => res.status(422).json({ error }));
}

function destroy(uid, req, res) {
	const key = `${req.params.type}.${req.params.id}`;
	const id = ObjectId.createFromHexString(uid);
	const action = { $unset: { [key]: 1 }};

	if (req.params.type === 'completed') {
		action['$unset']['favorites.' + req.params.id] = 1
	}

	req.app.locals.users.updateOne({ _id: id }, action)
	.then(mongoRes => res.status(200).json({ mongoRes }))
	.catch(error => res.status(422).json({ error }));
}

module.exports = {
	create,
	destroy,
};