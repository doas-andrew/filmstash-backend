require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { MongoClient } = require('mongodb');
const logger = require('./middleware/logger');
const config = require('./config');

// Initialize application
const app = express();

// Middleware
if (process.env.APP_ENVIRONMENT === 'development') app.use(logger);
app.use(cors(config.CORS));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (_, res) => res.status(200).json({ready: true}));
app.use('/users', require('./controllers/users_controller'));
app.use('/entries', require('./controllers/entries_controller'));
app.use('/sessions', require('./controllers/sessions_controller'));

// Connect to MongoDB
MongoClient
.connect(...config.MongoClient)
.catch(console.error)
.then(client => {
	app.locals.users = client.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION);
	app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
});
