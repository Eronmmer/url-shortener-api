require("dotenv").config();
const express = require("express");
const app = express();
const { applyRoutes, applyMiddleware, connectDB } = require("./utils");
const middleware = require("./middleware");
const routes = require("./routes");
const errorHandlers = require("./middleware/errorHandlers");
const path = require("path");
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

// load DB
connectDB();

app.get("/", (req, res) => {
	res.send("Welcome to my API bruhh...");
});

// load middleware
applyMiddleware(middleware, app);

// apply routes
applyRoutes(routes, app);

// error handling
applyMiddleware(errorHandlers, app);

app.listen(PORT, HOST, () => {
	console.log(`Server started on http://${HOST}:${PORT}`);
});
