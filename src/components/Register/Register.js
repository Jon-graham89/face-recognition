import React from "react";

const Register = (props) => (
	<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
		<main className="pa4 black-80">
			<form className="measure">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f4 fw6 ph0 mh0">Register</legend>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="email-address">
							Email
						</label>
						<input
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							type="email"
							name="email-address"
							id="email-address"
							onChange={props.changeUser}
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
							onChange={props.changePass}
						/>
					</div>
					<div className="mv3">
						<label className="db fw6 lh-copy f6" htmlFor="password">
							Confirm Password
						</label>
						<input
							className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							type="password"
							name="confirm-password"
							id="confirm-password"
							onChange={props.changePass}
						/>
					</div>
				</fieldset>
				<div className="">
					<input
						className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
						type="submit"
						value="Sign In"
						onClick={() => props.submitForm("home")}
					/>
				</div>
			</form>
		</main>
	</article>
);

export default Register;
