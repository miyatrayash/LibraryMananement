/** @format */

import React from "react";
import   "./Button.css";


function Button(props) {
	return (
		<input
			type={props.type}
			value={props.value}
			className={" btn cbtn " + props.className}
			onClick={() => props.onClick()}
		/>
	);
}

export default Button;
