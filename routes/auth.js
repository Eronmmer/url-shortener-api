const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authenticator = require("../middleware/authenticator");
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// authenticate logged in, GET
router.get("/", authenticator, async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select(["-password"]);
		const { urls, name, email } = user;
		res.json({ user: { urls, name, email } });
	} catch (err) {
		next();
	}
});

// login POST
router.post("/", async (req, res, next) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "Incorrect email or password" });
		}
		const verifyPassword = await bcrypt.compare(password, user.password);
		if (!verifyPassword) {
			return res.status(400).json({ msg: "Incorrect email or password" });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			jwtSecret,
			{
				expiresIn: "2days",
			},
			(err, token) => {
				if (err) {
					throw err;
				} else {
					res.status(200).json({ msg: "Successfully logged in", token });
				}
			}
		);
	} catch (err) {
		next();
	}
});

module.exports = router;
