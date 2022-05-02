const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	bookname: { type: String, required: true },
	author: { type: String },
	category: { type: String },
	isIssued: { type: Boolean, default: false },
	issued_by: [Schema.Types.ObjectId],
	opened: { type: Number, default: 0 },
	publication_year: { type: String, required: true },
	copies: { type: Number, default: 1 },
	available: { type: Number, default: 1 },
	AddedDate: { type: Date, default: Date.now },
});

bookSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
});

module.exports = mongoose.model("Book", bookSchema);
