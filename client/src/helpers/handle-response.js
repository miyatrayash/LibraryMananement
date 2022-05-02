/** @format */

import { authenticationService } from "services";

export function handleResponse(err) {
	console.log(err);
	const response = err.response;
	const data = response.data;

	if ([401, 403].indexOf(response.status) !== -1) {
		// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
		// authenticationService.logout();
		window.location.reload();
	}

	return Promise.reject(data);
}
