const express = require("express");
const shortid = require("shortid");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Url = require("../models/Url");
const authenticator = require("../middleware/authenticator");
const baseLink = process.env.BASE_LINK;
const checkAuthenticated = require("../utils/checkAuthenticated");

// get own shortened links (authenticated users only)
router.get("/", authenticator, async (req, res, next) => {
	try {
		const links = await Url.find()
			.sort({ date: -1 })
			.where("user")
			.in(req.user.id)
			.exec();
		res.json({ allLinks: links });
	} catch (err) {
		next(err);
	}
});

// get a particular link with details (authenticated users only)
router.get("/:linkID", authenticator, async (req, res, next) => {
	try {
		const link = await Url.findById(req.params.linkID);
		if (!link) {
			return res.status(404).json({ msg: "Link could not be found" });
		}

		if (!link.user || link.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized" });
		}

		res.json({ link });
	} catch (err) {
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Link could not be found" });
		}
		next(err);
	}
});

// shorten link
router.post(
	"/",
	check("longLink", "Please include a valid link").isURL(),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const { longLink } = req.body;
		try {
			const linkID = shortid.generate();
			const shortLink = `${baseLink}/${linkID}`;
			let newUrl;

			if (checkAuthenticated(req)) {
				newUrl = new Url({
					user: checkAuthenticated(req).id,
					baseLink,
					longLink,
					shortLink,
					linkID,
				});
			} else {
				newUrl = new Url({
					baseLink,
					longLink,
					shortLink,
					linkID,
				});
			}

			await newUrl.save();

			console.log(checkAuthenticated(req));
			res.json({ shortenedLink: newUrl.shortLink });
		} catch (err) {
			next(err);
		}
	}
);

// change link destination
router.put("/:linkID", authenticator, async (req, res, next) => {
	const { newDestination } = req.body;
	try {
		const link = await Url.findById(req.params.linkID);
		if (!link) {
			return res.status(404).json({ msg: "Link could not be found" });
		}

		if (!link.user || link.user.toString() !== req.user.id) {
			return res.status(401).send("Not authorized!");
		}

		link.longLink = newDestination;
		link.save();
		res.json({ msg: "Destination of link successfully changed.", link });
	} catch (err) {
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Link could not be found" });
		}
		next(err);
	}
});

// Revoke(delete) a link
router.delete("/:linkID", authenticator, async (req, res, next) => {
	try {
		const link = await Url.findById(req.params.linkID);
		if (!link) {
			return res.status(404).json({ msg: "Link could not be found" });
		}

		if (!link.user || link.user.toString() !== req.user.id) {
			return res.status(401).send("Not authorized!");
		}

		await link.remove();

		res.json({ msg: "Link has been successfully revoked" });
	} catch (err) {
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Link could not be found" });
		}
		next(err);
	}
});

module.exports = router;
