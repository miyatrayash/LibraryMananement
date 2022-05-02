/** @format */

const config = require("config.json");
const { expressjwt } = require("express-jwt");
module.exports = auth;

function auth() {
	const secret = config.secret;
	return expressjwt({ secret, algorithms: ["HS256"] }).unless({
		path: [
			// public routes that don't require authentication
			"/users/authenticate",
			"/users/register",
		],
	});
}

