const mongoose = require("mongoose");

const Url = new mongoose.Schema({
	baseLink: String,
	longLink: String,
	shortLink: String,
	linkID: String,
	numberOfClicks: Number,
	clickInsights: [{
		device: String,
		location: String,
		browser: String
	}],
	date: {
		type: String,
		default: Date.now
	}
});

module.exports = mongoose.model("urls", Url);
