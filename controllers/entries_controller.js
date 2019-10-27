const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');


const create = (req, res) => {
	Entry.create(req, res);
};

const destroy = (req, res) => {
	Entry.destroy(req, res);
};


router.post('/:type', create);
router.delete('/:type/:tmdb_id', destroy);

module.exports = router;
