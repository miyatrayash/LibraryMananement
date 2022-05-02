/** @format */

require("rootpath")();

const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("helpers/auth");
const errorHandler = require('helpers/error-handler.js');
app.use(express.json({extended: false}));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(auth());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

app.use("/users", require("users/user.controller"));
app.use("/books", require("books/book.controller"));


app.use(errorHandler);



const port = process.env.NODE_ENV === "production" ? 80 : 4000;
app.listen(port, () => {
	console.log("Server listening on port " + port);
});
