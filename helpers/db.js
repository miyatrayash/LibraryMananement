/** @format */

const config = require("config.json");
const mongoose = require("mongoose");

const connectionOption = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.connect(config.connectionString, connectionOption);

mongoose.Promise = global.Promise;

module.exports = {
    User: require('users/user.model'),
	Book: require('books/book.model')
}