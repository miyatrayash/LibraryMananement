/** @format */
import { authHeader, handleResponse } from "helpers";
import { authenticationService } from "services";
import axios from "axios";
const userService = {
	getAll,
	getById,
    update,
    delete:_delete,
};

function getAll() {
	const requestOptions = { method: "GET", headers: authHeader() };
	return axios.get(`users`, requestOptions).catch(handleResponse);
}

function getById(id) {
	const requestOptions = { method: "GET", headers: authHeader() };
	return axios.get(`users/${id}`, requestOptions).catch(handleResponse);
}
function update(user) {
	const requestOptions = {
		method: "PUT",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(user),
	};

	return axios.put(`users/${authenticationService.currentUserValue._id}`, requestOptions).catch(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	return axios
		.delete(`users/${id}`, { headers: authHeader() })
		.catch(handleResponse);
}

export default userService;