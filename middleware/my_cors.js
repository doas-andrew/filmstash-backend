// If you want to make your own CORS middleware, this is more or less how you do it.
// The npm-cors package seems more secure/robust, so I'm using that instead.

module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}
