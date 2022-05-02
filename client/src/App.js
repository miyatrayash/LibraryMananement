/** @format */

import AddBookPage from "AddBookPage/AddBookPage";
import AuthPage from "AuthPage/AuthPage";
import Navbar from "components/Navbar/Navbar";
import { PrivateRoute } from "components/PrivateRoute";
import { history, Role } from "helpers";
import HomePage from "HomePage/HomePage";
import MyBooksPage from "MyBooksPage/MyBooksPage";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "SearchPage/SearchPage";
import { authenticationService } from "services";
import ViewBook from "ViewBookPage/ViewBook";
import EditBookPage from "EditBookPage/EditBookPage";

function App() {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		authenticationService.currentUser.subscribe((x) => {
			setCurrentUser(x);
			console.log(x && x.role);
		});
	}, [currentUser]);

	return (
		<Router history={history}>
			{authenticationService.currentUser && <Navbar />}
			<Routes>
				<Route exact path="/auth" element={<AuthPage />}></Route>
				<Route
					exact
					path="/"
					element={<PrivateRoute Component={HomePage} />}
				></Route>
				<Route
					exact
					path="/search"
					element={<PrivateRoute Component={SearchPage} />}
				/>
				<Route
					exact
					path="/view"
					element={<PrivateRoute Component={ViewBook} />}
				/>
				<Route
					exact
					path="/myBooks"
					element={<PrivateRoute Component={MyBooksPage} />}
				/>
				<Route
					exact
					path="/AddBook"
					element={
						<PrivateRoute roles={[Role.Admin]} Component={AddBookPage} />
					}
				/>
				<Route
					exact
					path="/EditBook"
					element={
						<PrivateRoute roles={[Role.Admin]} Component={EditBookPage} />
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
