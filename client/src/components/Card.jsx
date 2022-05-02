/** @format */

import "./cardflip.css";
import React from "react";
import * as Material from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authenticationService } from "services";
import { Role } from "helpers";

function BookCard(props) {
	const navigate = useNavigate();
	const book = props.book;
	return (
		<Material.Grid
			key={book.id}
			sx={{
				height: "200px",
				width: "150px",
				margin: "20px",
			}}
			className="flip-card"
		>
			<div className="flip-card-inner">
				<Material.Paper
					className="flip-card-front"
					elevation={5}
					sx={{
						overflowWrap: "break-word",
					}}
				>
					<div>
						<img src="https://images-na.ssl-images-amazon.com/images/I/71S-p+5smhL.jpg" alt="" width="150px" height="150px" />
						<h5>{book.bookname}</h5>
					</div>
				</Material.Paper>

				<Material.Paper
					className="flip-card-back"
					sx={{
						overflowWrap: "break-word",
					}}
					elevation={5}
				>
					<div>
						<h5>{book.author}</h5>
						<Material.Button
							onClick={() => {
								navigate("/view", { state: { book: book } });
							}}
						>
							View
						</Material.Button>

						{authenticationService.currentUserValue.role === Role.Admin && <Material.Button onClick={() => {
							navigate("/EditBook", { state: { book: book } });
						}}
						>
							Edit
						</Material.Button>}
					</div>
				</Material.Paper>
			</div>
		</Material.Grid>
	);
}

export default BookCard;
