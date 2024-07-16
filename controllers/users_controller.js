const router = module.exports = require('express').Router();
const User = require('../models/user');
const jwt = require('../auth/jwt_auth');

function create(req, res) {
	User.create(req)
	.then(user => res.status(200).json({ user, token: jwt.newToken(user) }))
	.catch(errors => res.status(422).json({ errors }));
}

function show(req, res) {
	jwt.authorize(req)
	.then(user => res.status(200).json({ user: User.serialize(user) }))
	.catch(error => res.status(401).json({ error }));
}

router.post('/', create);
router.get('/current', show);