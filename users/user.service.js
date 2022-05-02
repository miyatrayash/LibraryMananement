/** @format */

const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../helpers/db");
const User = db.User;

module.exports = {
	authenticate,
	getAll,
	getById,
	create,
	update,
	delete: _delete,
};

async function authenticate({ username, password }) {
	console.log(username);
	const user = await User.findOne({ username });
	if (user && bcrypt.compareSync(password, user.hash)) {
		const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
			expiresIn: "7d",
		});
		return {
			...user.toJSON(),
			token,
		};
	}
}

async function getAll() {
	// console.log("in All")
	return await User.find({});
}

async function getById(id) {
	console.log(id);
	return await User.findById(id);
}

async function create(userParam) {
	// validate
	if (await User.findOne({ username: userParam.username })) {
		throw 'Username "' + userParam.username + '" is already taken';
	}

	const user = new User(userParam);

	// hash password
	if (userParam.password) {
		user.hash = bcrypt.hashSync(userParam.password, 10);
	}
	else
		throw "Please Provide Valid Password";
	// save user
	await user.save();
}

async function update(id, userParam) {
	const user = await User.findById(id);

	// validate
	if (!user) throw "User not found";
	if (
		user.username !== userParam.username &&
		(await User.findOne({ username: userParam.username }))
	) {
		throw 'Username "' + userParam.username + '" is already taken';
	}

	// hash password if it was entered
	if (userParam.password) {
		userParam.hash = bcrypt.hashSync(userParam.password, 10);
	}
	console.log(userParam.email);

	// copy userParam properties to user
	Object.assign(user, userParam);

	await user.save();

	return user.toJSON();
}

async function _delete(id) {
	await User.findByIdAndRemove(id);
}
