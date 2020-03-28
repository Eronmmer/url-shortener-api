const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const checkAuthenticated = (req) => {
	const token = req.header("Authorization");
	if (!token) {
		return false;
	}
	try {
		const decoded = jwt.verify(token, jwtSecret);
		return decoded.user;
	} catch (err) {
		console.error(err);
		return false;
	}
};

module.exports = checkAuthenticated;
