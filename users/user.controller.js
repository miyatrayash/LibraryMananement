/** @format */

const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const authorize = require("helpers/authorize");
const Role = require("helpers/role");

// routes
router.post("/authenticate", authenticate); // public route
router.post("/register", register);
router.get("/", authorize(Role.Admin), getAll); // admin only
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function authenticate(req, res, next) {
	console.log("in authentication");
	userService
		.authenticate(req.body)
		.then((user) =>
			user
				? res.json(user)
				: res
						.status(400)
						.json({ message: "Username or password is incorrect" }),
		)
		.catch((err) => next(err));
}

async function register(req, res, next) {
	userService
		.create(req.body)
		.then(() => res.json({ message: "created Successfully" }))
		.catch((err) => next(err));
}

function getAll(req, res, next) {
	console.log("hehe");

	userService
		.getAll()
		.then((users) => {
			// console.log(users)
			res.json(users);
		})
		.catch((err) => next(err));
}

function getCurrent(req, res, next) {
	console.log(req.auth);
	userService
		.getById(req.auth.sub)
		.then((user) => (user ? res.json(user) : res.sendStatus(404)))
		.catch((err) => next(err));
}

function getById(req, res, next) {
	const currentUser = req.auth;
	const id = parseInt(req.params.id);


	userService
		.getById(req.params.id)
		.then((user) => (user ? res.json(user) : res.sendStatus(404)))
		.catch((err) => next(err));
}

function update(req, res, next) {
	console.log(req.body.body.username);

	userService
		.update(req.params.id, JSON.parse(req.body.body))
		.then((user) => {
			user
				? res.json(user)
				: res.status(400).json({ message: "something went wrong" });
		})
		.catch((err) => next(err));
}

function _delete(req, res, next) {
	userService
		.delete(req.params.id)
		.then(() => res.json({ message: "deleted Successfully" }))
		.catch((err) => next(err));
}
