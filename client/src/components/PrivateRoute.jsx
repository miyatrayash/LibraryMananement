/** @format */

import React from "react";
import {  Navigate } from "react-router-dom";

import { authenticationService } from "services";

export const PrivateRoute = (props) => {
	const currentUser = authenticationService.currentUserValue;
	console.log(":here")
			if (!currentUser) {
				// not logged in so redirect to login page with the return url
				return (
					<Navigate
						to={{ pathname: "/auth", state: { from: props.location } }}
					/>
				);
			}
			console.log(props)
			// check if route is restricted by role
			if (props.roles && props.roles.indexOf(currentUser.role) === -1) {
				// role not authorised so redirect to home page
				return <Navigate to={{ pathname: "/" }} />;
			}

			// authorised so return component
			return <props.Component {...props} />;
		};
