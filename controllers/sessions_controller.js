const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const TMDB_KEY = process.env.TMDB_KEY;
const User = require('../models/user');
const jwt = require('../auth/jwt_auth');
const rsa = require('../auth/rsa_auth');


const create = async (req, res) => {
	const login_name = rsa.decrypt(req.body.username).toLowerCase();
	const user = await req.app.locals.users.findOne({ login_name: login_name });

	let noUserFound = false;
	if (!user) noUserFound = 'No account found with that username';

	if (user && rsa.authenticate(user.password, req.body.password))
		res.status(200).json({ user: User.serialize(user), token: jwt.newToken(user) });
	else
		res.status(401).json({ error: noUserFound || 'Invalid username or password' });
};

const search = (req, res) => {
	jwt.authorize(req, res)
	.then(() => {
		const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${req.query.query}&language=en-US&page=${req.query.pageNum}&include_adult=false`;
		axios.get(url)
		.then(tmdb_res => res.status(200).send(tmdb_res.data))
		.catch(error => res.status(400).json({ error }));
	})

	// const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${req.query.query}&language=en-US&page=${req.query.pageNum}&include_adult=false`;
	// axios.get(url)
	// .then(tmdb_res => res.status(200).send(tmdb_res.data))
	// .catch(error => res.status(400).json({ error }));
};


router.post('/', create);
router.get('/tmdb-search', search);

module.exports = router;
