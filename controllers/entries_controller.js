const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const jwt = require('../auth/jwt_auth');


const create = (req, res) => {
	Entry.create(req, res);
};

const update = (req, res) => {
	jwt.authorize(req, res)
	.then(user => Entry.update(user, req, res))
	.catch(error => res.status(401).json({ error }));
};

const destroy = (req, res) => {
	Entry.destroy(req, res);
};


router.post('/:type', create);
router.patch('/:type/:tmdb_id', update);
router.delete('/:type/:tmdb_id', destroy);

module.exports = router;
