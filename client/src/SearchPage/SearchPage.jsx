/** @format */

import React from "react";
import * as Material from "@mui/material";
import { Box } from "@mui/material";
import BookCard from "components/Card";
import { useLocation } from "react-router-dom";

function SearchPage() {


	const { state } = useLocation();
	const books = state.books;
	console.log(state);


	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				height: "100vh",
				margin: "50px",
			}}
		>
			{state.title && <h3>state.title</h3>}
			<Material.Grid container>
				{books &&
					books.map((book) => {
						return <BookCard key={book.id} book={book} />;
					})}
				
			</Material.Grid>
		</Box>
	);
}

export default SearchPage;
