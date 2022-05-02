/** @format */

import  {authenticationService}  from "services";


export function authHeader() {
	// return authorization header with jwt token
	const currentUser = authenticationService.currentUserValue;
	if (currentUser && currentUser.token) {
		return {
			Authorization: `Bearer ${currentUser.token}`,
			"Access-Control-Allow-Origin":"http://localhost:4000"
		};
	} else {
		return {};
	}
}
