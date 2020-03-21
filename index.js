require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

// load DB

// handle production or dev environment
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "client", "build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
	res.send("Welcome to my API bruhh...");
});
}

// load middleware

// error handling
app.listen(PORT, HOST, () => {
	console.log(`Server started on http://${HOST}:${PORT}`);
});
