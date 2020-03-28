const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

// register users, POST
router.post(
	"/",
	[
		check("name", "Your name should be at least 4 characters").isLength({
			min: 4,
		}),
		check("email", "Your email must be a valid one").isEmail(),
		check("password", "Your password must be at least 8 characters").isLength({
			min: 8,
		}),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ msg: "Oops, user already exists. Choose another email." });
			}
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
			user = new User({
				name,
				email,
				password: hashedPassword,
			});
			await user.save();
			res.json({ msg: "Account successfully created" });
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
