const express = require("express");
const router = express.Router();
const Url = require("../models/Url")

router.get("/:linkID", async (req, res, next) => {
	try {
		const url = await Url.findOne({ linkID: req.params.linkID })
		if (!url) {
			res.status(404).send("No link was found...");
		} else {
			res.redirect(url.longLink);
		}
	} catch (err) {
		next(err);
	}
})

module.exports = router;
