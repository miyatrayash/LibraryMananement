/** @format */

import { handleResponse } from "helpers";
import axios from "axios";
import { async } from "rxjs";

const bookService = {
	edit,
	create,
	getAll,
	get,
	borrow,
	getbooks,
	take,
};


async function edit(values) {
	console.log(values);
	return axios
		.put(`/books/${values.id}`, values)
		.then((response) => {
			return response.data;
		})
		.catch(handleResponse);
}

async function create(values) {
	console.log("here")
	return axios
		.post(`/books/add`, values)
		.then((response) => {
			return response.data;
		})
		.catch(handleResponse);
}

async function getAll(filters, srt = {}, limit = 100, page = 1) {
	console.log(filters);
	return axios
		.post(`/books?page=${page}&limit=${limit}`, {
			filter: filters,
			sort: srt,
		})
		.then((response) => {
			return response.data.results;
		})
		.catch(handleResponse);
}

async function get(id) {
	console.log("here");
	return axios
		.get(`/books/${id}`)
		.then((res) => {
			return res.data;
		})
		.catch(handleResponse);
}

async function getbooks(bookIds) {
	var books = [];
		await axios
			.post(`/books/Mul`,{ids: bookIds})
			.then((res) => {
				// console.log(res.data);
				books = res.data;
			})
			.catch((err) => alert(err));
		

	return books;
}

async function borrow(userId, bookId) {
	console.log({ userId, bookId });
	return axios
		.post("/books/give", { userId, bookId })
		.then((res) => {
			return res.data;
		})
		.catch(handleResponse);
}

async function take(userId, bookId) {
	return axios
		.post("/books/take", { userId, bookId })
		.then((res) => {
			return res.data;
		})
		.catch(handleResponse);
}

export default bookService;
