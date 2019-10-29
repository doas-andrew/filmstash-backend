require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
// const logger = require('./middleware/logger'); // Disable for deployment - Heroku has its own logger
const cors = require('cors');
const config = require('./config');


// Initialize application
const app = express();


// Middleware
// app.use(logger); // Disable for deployment - Heroku has its own logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(config.CORS));


// Routes
app.get('/', (req, res) => res.status(200).json({ message: 'This API uses Express.js and MongoDB Atlas. See the code at: https://github.com/ASAllen67/flixnet-backend-express-mongodb' }));
app.use('/users', require('./controllers/users_controller'));
app.use('/entries', require('./controllers/entries_controller'));
app.use('/sessions', require('./controllers/sessions_controller'));


// Connect to MongoDB
MongoClient
.connect(...config.MONGO)
.catch(console.error)
.then(client => {
	app.listen(config.PORT, () => console.log(`Server started on port ${config.PORT}`));
	app.locals.users = client.db('FlixNet').collection('users');
});
