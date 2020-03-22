const {
	handleLogger,
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  handleHelmet
} = require("./common");

module.exports = [
	handleLogger,
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  handleHelmet
];
