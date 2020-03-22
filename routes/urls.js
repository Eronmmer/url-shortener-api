const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const Url = require("../models/Url");

router.post("/", async (req, res, next) => {
	try {
		const { longLink } = req.body;
		const baseLink = "localhost:5500";
	
		// check if long link is a URL

		const url = await Url.findOne({ longLink });
		if (url) {
			return res.status(200).send(url.shortLink);
		}
		const linkID = uuid.v4();
		const shortLink = `${baseLink}/${linkID}`

		const newUrl = new Url({
			baseLink,
			longLink,
			shortLink,
			linkID
		})
		await newUrl.save();

		res.json({shortenedLink: newUrl.shortLink})
	} catch (err) {
		next(err);
	}
})

module.exports = router;
