const router = module.exports = require('express').Router();
const Entry = require('../models/entry');
const jwt = require('../auth/jwt_auth');

function create(req, res) {
	jwt.getUserId(req)
	.then(uid => Entry.create(uid, req, res))
	.catch(error => res.status(401).json({ error }));
}

function destroy(req, res) {
	jwt.getUserId(req)
	.then(uid => Entry.destroy(uid, req, res))
	.catch(error => res.status(401).json({ error }));
}

function mergeType(fn, str) {
	return (req, res) => {
		req.params.type = str
		fn(req, res)
	}
}

['completed', 'backlog', 'favorites'].forEach(type => {
	router.post(`/${type}`, mergeType(create, type));
	router.delete(`/${type}/:id`, mergeType(destroy, type));
});