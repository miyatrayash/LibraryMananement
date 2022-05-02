/** @format */

import Input from "components/Input/Input";
import { Link } from "react-router-dom";
import { authenticationService, bookService } from "services";
// import "style.css";
import { useNavigate } from "react-router-dom";
import SearchPage from "SearchPage/SearchPage";

export default function Navbar(props) {
	const navigate = useNavigate();
	return (
		<nav
			className="navbar navbar-expand-lg navbar-dark"
			style={{ background: "black" }}
		>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarTogglerDemo03"
				aria-controls="navbarTogglerDemo03"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<Link className="navbar-brand" to="/"></Link>

			<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item ">
						<Link className="nav-link" to="/">
							Home
						</Link>
					</li>
				</ul>

				<ul className="navbar-nav mr-auto">
					{authenticationService.currentUserValue && (
						<>
							{authenticationService.currentUserValue.role === "Admin" && (
								<>
									<Link to="/admin" className="nav-item nav-link">
										Admin
									</Link>
									<Link to="/AddBook" className="nav-item nav-link">
										AddBook
									</Link>
								</>
							)}
							<Link to="/MyBooks" className="nav-item nav-link">
								My Books
							</Link>

							<Link
								to={`/users/${authenticationService.currentUserValue.username}`}
								className="nav-item nav-link"
							>
								Profile
							</Link>
							<a
								href="/auth"
								onClick={() => { 
									console.log("Im Fucking Here")
									authenticationService.logout()}}
								className="nav-item nav-link"
							>
								Logout
							</a>
						</>
					)}

					{!authenticationService.currentUserValue && (
						<>
							<li className="nav-item">
								<Link className="mx-2 btn btn-outline-light" to="/auth">
									Login / Register
								</Link>
							</li>
							
							{/* <li className="nav-item">
								<Link className="mx-2 btn btn-outline-light" to="/auth">
									Register
								</Link>
							</li> */}
						</>
					)}
				</ul>

				<ul className="navbar-nav ms-auto me-3">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const val = document.getElementById("search").value;

							if (val) {
								bookService.getAll({ bookname: val, category: val,author: val, year:val }).then((res) => {
									console.log(res)
									navigate('/search', { state: { books: res } });
								});
							}
						}}
					>
						<input id="search" placeholder="Search..." />
					</form>
				</ul>
			</div>
		</nav>
	);
}
