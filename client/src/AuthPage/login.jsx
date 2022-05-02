/** @format */

import { useNavigate } from "react-router-dom";
import Button from "components/Button/Button";
//import "./login.css";
import { authenticationService } from "services";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "components/Input/Input";
function Login(props) {
	const navigation = useNavigate();

	function handleLogin({ username, password }, { setStatus, setSubmitting }) {
		setStatus();

		authenticationService
			.login(username, password)
			.then((user) => {
				console.log(user);
				//console.log(user);
				// const { from } = history.location.state || { from: { pathname: "/" } };

				navigation('/')
			})
			.catch((error) => {
				setSubmitting(false);
				setStatus(error.message);
			});
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card border-0 shadow my-5">
						<div className="card-body p-4 p-sm-5">
							<h2 className="card-title text-center">Sign In</h2>
							<hr className="mb-5"></hr>
							<div>
								<Formik
									initialValues={{ username: "", password: "" }}
									validationSchema={Yup.object().shape({
										username: Yup.string().required("Username is required"),
										password: Yup.string().required("Password is required"),
									})}
									onSubmit={handleLogin}
								>
									{({
										values,
										setFieldValue,
										errors,
										status,
										touched,
										isSubmitting,
									}) => (
										<Form>
											<ErrorMessage
												name="username"
												component="div"
												className="invalid-feedback  mb-3 d-flex justify-content-center"
											/>
											<div className="mb-3 form-floating d-flex justify-content-end">
												<label htmlFor="username" id="lblUser">
													Username
												</label>
												<Input
													name="username"
													type="username"
													label="lblUser"
													className={
														"form-control py-0" +
														(errors.username && touched.username
															? " is-invalid"
															: "")
													}
													value={values["username"]}
													setFieldValue={setFieldValue}
												/>
											</div>
											<ErrorMessage
												name="password"
												component="div"
												className="invalid-feedback mb-3 d-flex justify-content-center"
											/>
											<div className="mb-3 d-flex form-floating justify-content-end">
												<label htmlFor="password" id="lblPass">
													Password
												</label>
												<Input
													name="password"
													type="password"
													label="lblPass"
													className={
														"form-control py-0" +
														(errors.password && touched.password
															? " is-invalid"
															: "")
													}
													value={values["password"]}
													setFieldValue={setFieldValue}
												/>
											</div>
											{status && (
												<div className={"alert alert-danger"}>
													{status.toString()}
												</div>
											)}
											<div className="d-grid justify-content-center">
												<Button
													type="submit"
													value="Login"
													onClick={() => {}}
												/>
												{isSubmitting && (
													<img
														alt="load"
														src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
													/>
												)}
											</div>
											<hr class="my-4" />
											<div className="content">
												<h3>New here ?</h3>
												<p>Please Sign Up to our website</p>
												<Button
													value="Sign Up"
													type="button"
													onClick={() => {
														props.changeVal();
													}}
												></Button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
