/** @format */

const express = require("express");
const router = express.Router();
const bookService = require("./book.service");
const authorize = require("helpers/authorize");
const Role = require("helpers/role");
const { Book } = require("helpers/db");
const paginate = require("helpers/paginate");
// routes
router.post("/add", authorize(Role.Admin), addBook);
router.post("/give", give);
router.post("/take", take);
router.post("/Mul",mul);
router.post("/", paginate(Book), getAll); // admin only
router.get("/:id", getById);
router.put("/:id", authorize(Role.Admin), updateBook);
router.delete("/:id", authorize(Role.Admin), _delete);

module.exports = router;


function mul(req,res,next) {
	console.log(req.body.ids)
	bookService.getMul(req.body.ids).then(books => res.json({books:books}))
	.catch((err) => next(err));

	return;
}

function give(req, res, next) {
	if (req.auth.role != Role.Admin) {
		bookService
			.giveBook(req.auth.sub, req.body.bookId)
			.then(() => res.json({ message: "Added Successfully" }))
			.catch((err) => next(err));
        return;
	}

	bookService
		.giveBook(req.body.userId, req.body.bookId)
		.then(() => res.json({ message: "Added Successfully" }))
		.catch((err) => next(err));

}

function take(req, res, next) {
    if (req.auth.role != Role.Admin) {
			bookService
				.takeBook(req.auth.sub, req.body.bookId)
				.then(() => res.json({ message: "Taken Successfully" }))
				.catch((err) => next(err));
        return;

		}

		bookService
			.takeBook(req.body.userId, req.body.bookId)
			.then(() => res.json({ message: "Taken Successfully" }))
			.catch((err) => next(err));
}

function addBook(req, res, next) {
	bookService
		.create(req.body)
		.then(() => res.json({ message: "Added Successfully" }))
		.catch((err) => next(err));
}

function getById(req, res, next) {
	bookService
		.getById(req.params.id)
		.then((book) => (book ? res.json(book) : res.sendStatus(404)))
		.catch((err) => next(err));
}

function getAll(req, res, next) {
	res.json(res.paginatedResult);
}

function updateBook(req, res, next) {
	console.log(req.body.bookname);

	bookService
		.update(req.params.id, req.body)
		.then((book) => {
			book
				? res.json(book)
				: res.status(400).json({ message: "Something went wrong" });
		})
		.catch((err) => next(err));
}

function _delete(req, res, next) {
	bookService
		.delete(req.params.id)
		.then(() => res.json({ message: "deleted Successfully" }))
		.catch((err) => next(err));
}
