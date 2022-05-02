/** @format */

import { Box } from "@mui/material";
import React from "react";
import * as Material from "@mui/material";

import { useNavigate } from "react-router-dom";
import Displaybooks from "components/DisplayBooks";

class HomePageClass extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<Material.Grid container>
					<Box
						sx={{
							display: "flex",
							width: "100%",
						}}
					>
						<Displaybooks category="Education"></Displaybooks>
					</Box>
					<Box
						sx={{
							display: "flex",
							width: "100%",
						}}
					>
						<Displaybooks category="Fiction"></Displaybooks>
					</Box>
				</Material.Grid>
			</Box>
		);
	}
}

const HomePage = (props) => {

	return <HomePageClass {...props} />;
};

export default HomePage;
