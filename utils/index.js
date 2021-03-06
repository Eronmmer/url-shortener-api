const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected!");
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

const applyRoutes = (routes, router) => {
	routes.forEach((individualRoute) => {
		router.use(individualRoute.endpoint, individualRoute.route);
	});
};

const applyMiddleware = (middleware, router) => {
	middleware.forEach((individualMiddleware) => {
		individualMiddleware(router);
	});
};

module.exports = {
	connectDB,
	applyRoutes,
	applyMiddleware,
};
