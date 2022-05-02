/** @format */

import "./Input.css";
import { Field } from "formik";
function Input(props) {
	return (
		<Field
			name={props.name}
			type={props.type}
			className={props.className}
			value={props.value}
			onChange={(e) => {
				console.log(e.target.value);
				if (props.label) {
					if (e.target.value !== "")
						document.getElementById(props.label).innerHTML = "";
					else document.getElementById(props.label).innerHTML = props.name;
				}
				props.setFieldValue(props.name, e.target.value);
			}}
		/>
	);
}

export default Input;
