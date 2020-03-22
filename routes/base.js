const express = require("express");
const browser = require("browser-detect");
const router = express.Router();
const Url = require("../models/Url")

router.get("/:linkID", async (req, res, next) => {
	const browserResult = browser(req.headers["user-agent"]);
	try {
		const url = await Url.findOne({ linkID: req.params.linkID })
		if (!url) {
			res.status(404).send("No link was found...");
		} else {
			++url.numberOfClicks;

			const clickInsight = {
				shortLink: url.shortLink,
				device: {
					mobile: browserResult.mobile,
					os: browserResult.os
				},
				browser: {
					name: browserResult.name,
					version: browserResult.version
				},
				date: `${new Date().toDateString()}, ${new Date().toTimeString()}`
			}
			url.clickInsights.unshift(clickInsight);
			await url.save();
			res.redirect(url.longLink);
		}
	} catch (err) {
		next(err);
	}
})

module.exports = router;
