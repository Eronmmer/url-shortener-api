const express = require("express");
const shortid = require("shortid");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Url = require("../models/Url");

router.post("/", check("longLink", "Please include a valid link").isURL(), async (req, res, next) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const { longLink } = req.body;
		const baseLink = "https://kut.glitch.me";

		const url = await Url.findOne({ longLink });
		if (url) {
			return res.status(200).send({shortenedLink: url.shortLink});
		}
		const linkID = shortid.generate();
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
