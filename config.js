module.exports.MongoClient = [
  process.env.MONGODB_CLUSTER_URI,
  { maxPoolSize: 10 },
];

module.exports.CORS = {
  origin: process.env.FRONTEND_ORIGIN,
  methods: 'GET,POST,PATCH,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
