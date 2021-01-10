import "./App.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
// import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "eea810b65864447c9ac8eb2fe6d540e2",
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: "",
			outputImg: "",
			imgUrl: "",
			box: [],
			users: [
				{ id: "000", username: "jgraham@opex.com", password: "password" },
				{ id: "001", username: "lovong@opex.com", password: "password1" },
				{ id: "002", username: "lgreen@opex.com", password: "password2" },
				{ id: "003", username: "jongraham@opex.com", password: "password3" },
				{
					id: "004",
					username: "jonathangraham@opex.com",
					password: "password4",
				},
			],
			route: "signin",
			userinput: {
				username: "",
				password: "",
			},
			userSubmit: {
				username: "",
				password: "",
			},
		};
	}

	calculateFaceLocation = (data) => {
		const image = document.getElementById("outputImage");
		const width = Number(image.width);
		const height = Number(image.height);

		const clarFaces = data.outputs[0].data.regions.map((dp, i) => {
			let face = dp.region_info.bounding_box;
			return {
				leftcol: face.left_col * width,
				toprow: face.top_row * height,
				rightcol: width - face.right_col * width,
				bottomrow: height - face.bottom_row * height,
			};
		});

		return clarFaces;
	};

	displayBoxHandler = (box) => {
		this.setState({ box: box });
	};

	onInputChangeHandler = (event) => {
		this.setState({
			imgUrl: event.target.value,
		});
	};

	onSubmitHandler = () => {
		app.models
			.predict("d02b4508df58432fbb84e800597b8959", this.state.imgUrl)
			.then((response) => {
				this.displayBoxHandler(this.calculateFaceLocation(response));
			})
			.catch((error) => console.log(error));
		this.setState({
			outputImg: this.state.imgUrl,
		});
	};

	usernameHandler = (event) => {
		this.setState({
			userinput: {
				username: event.target.value,
				password: this.state.userinput.password,
			},
		});
	};

	passwordHandler = (event) => {
		this.setState({
			userinput: {
				username: this.state.userinput.username,
				password: event.target.value,
			},
		});
	};

	registerUser = () => {};

	// submitFormHandler = () => {
	// 	console.log(this.state.userinput);

	// };

	routeChangeHandler = (route) => {
		this.setState({
			route: route,
		});
	};

	signInHandler = (route, event) => {
		let check = this.state.users.filter((user) => {
			return (
				user.username === this.state.userinput.username &&
				user.password === this.state.userinput.password
			);
		});
		if (check.length === 1) {
			this.setState({ route: route });
		} else {
			alert("something went wrong");
		}
	};

	render() {
		let display = null;
		if (this.state.route === "signin") {
			display = (
				<div>
					<Logo />
					<SignIn
						changeUser={this.usernameHandler}
						changePass={this.passwordHandler}
						submitForm={this.signInHandler}
						registerForm={this.routeChangeHandler}
					/>
				</div>
			);
		} else if (this.state.route === "home") {
			display = (
				<div>
					<Navigation signOut={this.routeChangeHandler} />
					<Logo />
					{/* <Rank /> */}

					<ImageLinkForm
						inputChange={this.onInputChangeHandler}
						onSubmit={this.onSubmitHandler}
					/>
					<FaceRecognition
						outputImg={this.state.outputImg}
						box={this.state.box}
					/>
				</div>
			);
		} else if (this.state.route === "register") {
			display = (
				<div>
					<Logo />

					<Register
						changeUser={this.usernameHandler}
						changePass={this.passwordHandler}
						submitForm={this.routeChangeHandler}
					/>
				</div>
			);
		}

		return (
			<div className="main">
				<Particles className="particles" />

				{display}
			</div>
		);
	}
}

export default App;
