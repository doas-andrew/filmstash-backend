const router = module.exports = require('express').Router();
const axios = require('axios').default;
const TMDB_KEY = process.env.TMDB_KEY;
const User = require('../models/user');
const jwt = require('../auth/jwt_auth');
const rsa = require('../auth/rsa_auth');

async function create(req, res) {
	const login_name = rsa.decrypt(req.body.username).toLowerCase();
	const user = await req.app.locals.users.findOne({ login_name: login_name });

	if (user && rsa.authenticate(user.password, req.body.password)) {
		res.status(200).json({ user: User.serialize(user), token: jwt.newToken(user) });
	} else {
		res.status(401).json({ error: 'Invalid username or password' });
	}
}

function search(req, res) {
	jwt.getUserId(req)
	.then(() => {
		axios.get('https://api.themoviedb.org/3/search/movie', {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TMDB_KEY}`,
			},
			params: {
				query: req.query.query,
				page: req.query.page,
				language: 'en-US',
				include_adult: 'false',
			},
		})
		.then(tmdb_res => res.status(200).send(tmdb_res.data))
		.catch(error => res.status(400).json({ error }));
	})
	.catch(error => res.status(401).json({ error }))
}

router.post('/', create);
router.get('/tmdb-search', search);