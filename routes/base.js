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
			const expression = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;
			const regex = new RegExp(expression);
			if (url.longLink.match(regex)) {
				console.log(url.longLink, "not modified");
				res.status(301).redirect(url.longLink);
			} else {
				console.log(`http://${url.longLink}`)
				console.log(url.longLink, "modified");
				res.status(301).redirect(`http://${url.longLink}`);
			}
			
		}
	} catch (err) {
		next(err);
	}
})

module.exports = router;
