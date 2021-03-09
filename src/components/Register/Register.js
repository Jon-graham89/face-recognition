import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./Register.css";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: "",
			emailUnavailable: "",
		};
	}

	onSubmitRegister = (values) => {
		this.setState({
			name: values.name,
			email: values.email,
			password: values.password,
		});

		fetch("https://shielded-cliffs-66198.herokuapp.com/register", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					this.setState({ emailUnavailable: "" });
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				} else {
					this.setState({ emailUnavailable: "Email unavailable" });
				}
			});
	};

	render() {
		const schema = yup.object().shape({
			name: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().min(6).required(),
		});
		return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
				<main className="pa4 black-80">
					<Formik
						initialValues={{ name: "", email: "", password: "" }}
						onSubmit={this.onSubmitRegister}
						validationSchema={schema}
					>
						{(props) => (
							<Form className="measure">
								<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
									<legend className="f4 fw6 ph0 mh0">Register</legend>
									<div className="mt3">
										<label className="db fw6 lh-copy f6" htmlFor="name">
											Name
										</label>
										<Field
											className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
											as="input"
											name="name"
											id="user-name"
										/>
										<ErrorMessage name="name">
											{(msg) => <p className="ErrorMessageStyle">{msg}</p>}
										</ErrorMessage>
									</div>
									<div className="mt3">
										<label
											className="db fw6 lh-copy f6"
											htmlFor="email-address"
										>
											Email
										</label>
										<Field
											className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
											as="input"
											name="email"
											id="user-email-address"
										/>
										<ErrorMessage name="email">
											{(msg) => <p className="ErrorMessageStyle">{msg}</p>}
										</ErrorMessage>
										<div className="ErrorMessageStyle">
											{this.state.emailUnavailable}
										</div>
									</div>
									<div className="mv3">
										<label className="db fw6 lh-copy f6" htmlFor="password">
											Password
										</label>
										<Field name="password" id="register-password">
											{() => (
												<input
													className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
													type="password"
													onChange={props.handleChange}
													name="password"
												/>
											)}
										</Field>
										<ErrorMessage name="password">
											{(msg) => <p className="ErrorMessageStyle">{msg}</p>}
										</ErrorMessage>
									</div>
								</fieldset>
								<div className="">
									<button
										className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
										type="submit"
										value="Register"
									>
										Register{" "}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</main>
			</article>
		);
	}
}

export default Register;
