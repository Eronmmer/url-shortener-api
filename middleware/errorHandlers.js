const handleNotFound = (router) => {
	router.use((req, res, next) => {
		res.status(404).send(`${req.url} route not found`);
		next();
	});
};

const handlerServerError = (router) => {
	router.use((err, req, res, next) => {
		console.error(err);
		res.status(500).send("Internal Server Error!!");
		next(err);
	});
};

module.exports = [handleNotFound, handlerServerError];
