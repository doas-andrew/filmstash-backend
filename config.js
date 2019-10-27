// Only the ENV variables that apply to the server and MongoDB's connection are aggregated here
// The RSA keys, JWT secret, and TMDB API key are used directly where they are needed

const PORT = process.env.PORT;

const cluster_uri = process.env.CLUSTER_URI;
const mongo_options = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 };
const MONGO = [cluster_uri, mongo_options]; // use spread operator to list these elements inside connect()

const CORS = {
  origin: process.env.FRONTEND_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


module.exports = { PORT, MONGO, CORS };
