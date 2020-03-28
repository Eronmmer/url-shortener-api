const urls = require("./urls");
const base = require("./base");
const auth = require("./auth");
const user = require("./user");

module.exports = [
	{ endpoint: "/api/urls", route: urls },
	{ endpoint: "/api/auth", route: auth },
	{ endpoint: "/api/user", route: user },
	{ endpoint: "/", route: base },
];
