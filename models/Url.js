const mongoose = require("mongoose");

const Url = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	baseLink: String,
	longLink: String,
	shortLink: String,
	linkID: String,
	numberOfClicks: {
		type: Number,
		default: 0,
	},
	clickInsights: [
		{
			shortLink: String,
			device: {
				mobile: Boolean,
				os: String,
			},
			browser: {
				name: String,
				version: String,
			},
			time: String,
		},
	],
	date: {
		type: String,
		default: `${new Date().toDateString()}, ${new Date().toTimeString()}`,
	},
});

module.exports = mongoose.model("urls", Url);
