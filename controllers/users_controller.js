const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('../auth/jwt_auth');


const show = (req, res) => {
	jwt.authorize(req, res)
	.then(user => res.status(200).json({ user: User.serialize(user) }))
	.catch(error => res.status(401).json({ error }));
};

const create = (req, res) => {
	User.create(req)
	.then(mongoRes => {
		const user = User.serialize(mongoRes.ops[0]);
		const token = jwt.newToken(mongoRes.ops[0]);
		res.status(200).json({ user, token });
	})
	.catch(errors => res.status(422).json({ errors }));
};


router.get('/current', show);
router.post('/', create);

module.exports = router;
