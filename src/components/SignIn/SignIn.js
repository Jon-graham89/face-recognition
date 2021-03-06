import React from "react";
import "../Register/Register.css";
class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
			signInError: "",
		};
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};
	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	};

	onSubmitSignIn = (e) => {
		e.preventDefault();
		fetch("https://shielded-cliffs-66198.herokuapp.com/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
					this.setState({ signInError: "" });
				}
				this.setState({ signInError: "Email and/or Password is incorrect" });
			});
	};

	render() {
		return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
				<main className="pa4 black-80">
					<form className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f4 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
								/>
							</div>
							<div className="ErrorMessageStyle">{this.state.signInError}</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Sign in"
								onClick={(e) => this.onSubmitSignIn(e)}
							/>
						</div>
						<div className="lh-copy mt3">
							<a
								href="#0"
								className="f6 link dim black db"
								onClick={() => this.props.onRouteChange("register")}
							>
								Register
							</a>
						</div>
					</form>
				</main>
			</article>
		);
	}
}

export default SignIn;
