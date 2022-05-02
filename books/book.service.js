/** @format */

const { Book, User } = require("../helpers/db");

module.exports = {
	getById,
	create,
	update,
	delete: _delete,
	giveBook,
	takeBook,
	getMul,
};


async function getMul(ids) {

	return await Book.find({
		'_id':{ $in:[...ids]}});
}

async function getById(id) {
	return await Book.findById(id);
}

async function create(bookParam) {
	if (await Book.findOne({ bookname: bookParam.bookname })) {
		throw bookParam.bookname + " is Already Registered Click Update to update";
	}

	const book = new Book(bookParam);

	await book.save();
}

async function takeBook(userId, bookId) {
	const book = await Book.findById(bookId);
	const user = await User.findById(userId);

	if (book.available == book.copies) throw Book.bookname + " is Not Rented";
	if (user.available == 3) throw "You dont have Taken this book";
    
    console.log(book);
	book.available++;
	if (book.available == book.copies) book.isIssued = false;

	var index = book.issued_by.indexOf(userId);

	if (index <= -1) throw "This book is Not Taken by specific User";

	book.issued_by.splice(index, 1);
	await book.save();

	index = user.books.indexOf(bookId);
	if (index <= -1) throw "This book is Not Taken by specific User";

	user.books.splice(index, 1);
	user.available++;

	await user.save();

	return true;
}

async function giveBook(userId, bookId) {
	const book = await Book.findById(bookId);
	const user = await User.findById(userId);

    console.log(user)

	if (book.available <= 0) throw book.bookname + " is Not available";
	if (user.available <= 0)
    {
		throw "You already have issued 3 books Return Previous ones to Get more";
        return;
    }

	book.available--;
	book.isIssued = true;
	book.issued_by.push(userId);

	await book.save();

	user.books.push(bookId);
	user.available--;

	await user.save();

	return true;
}

async function update(id, bookParam) {
	const book = await Book.findById(id);

	if (!book) throw "Book not Found";
	if (
		book.bookname !== bookParam.bookname &&
		(await Book.findOne({ bookname: bookParam.bookname }))
	) {
		throw bookParam.bookname + " is already exist Please choose another name";
	}

	Object.assign(book, bookParam);

	await book.save();

	return book;
}

async function _delete(id) {
	await Book.findByIdAndRemove(id);
}
