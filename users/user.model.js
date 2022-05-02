/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
	username: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	role: { type: String, default: "User" },
	hash: { type: String, required: true },
	firstName: { type: String },
	lastName: { type: String },
	image: { type: String },
	available: {type: Number, default: 3},
	books: [Schema.Types.ObjectId],
	createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret.hash;
	},
});

module.exports = mongoose.model("User", schema);
