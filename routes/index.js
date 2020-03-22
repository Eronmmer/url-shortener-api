const urls = require("./urls");
const base = require("./base");

module.exports = [
  { endpoint: "/api/urls", route: urls },
  { endpoint: "/", route: base },
];
