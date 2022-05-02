/** @format */

import React, { Component } from "react";
import { Box } from "@mui/material";
import * as Material from "@mui/material";
import { bookService } from "services";
import BookCard from "./Card";
import { useNavigate } from "react-router-dom";

class DisplaybooksClass extends Component {
	constructor(props) {
		super(props);

		this.state = {
			books: null,
		};
		this.getBooks = this.getBooks.bind(this);
	}

	componentDidMount() {
		console.log("in Books");
		this.getBooks();
	}

	getBooks() {
		console.log(this.props);
		bookService
			.getAll({ category: this.props.category }, this.props.sort, 7)
			.then((books) => {
				this.setState({ books: books });
			});
	}

	render() {
		return (
			<Box
				sx={{
					display: "flex",
					width: "100%",
				}}
			>
				<Material.Paper
					elevation={10}
					sx={{
						borderRadius: 4,
						width: "100%",
						margin: "50px",
						padding: "20px",
					}}
				>
					<h3>{this.props.category}</h3>
					<Box>
						<Material.Grid container>
							{this.state.books &&
								this.state.books.map((book) => {
									return <BookCard key={book.id} book={book} />;
								})}
							<Material.Grid>
								<Material.Paper
									elevation={5}
									sx={{
										margin: "10px",
										height: "200px",
										width: "150px",
										margin: "20px",
									}}
									onClick={() => {
										bookService
											.getAll({ category: this.props.category })
											.then((res) => {
												console.log(res);
												this.props.navigate("/search", {
													state: { books: res },
												});
											});
									}}
								>
									<h4>More</h4>
								</Material.Paper>
							</Material.Grid>
						</Material.Grid>
					</Box>
				</Material.Paper>
			</Box>
		);
	}
}

const Displaybooks = (props) => {
	const navigate = useNavigate();
	return <DisplaybooksClass navigate={navigate} {...props} />;
};

export default Displaybooks;
