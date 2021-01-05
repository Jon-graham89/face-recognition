import "./App.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Clarifai from "clarafai";

const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "eea810b65864447c9ac8eb2fe6d540e2",
});

console.log(app.models);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: "",
			outputImg: "",
			imgUrl: "",
			box: {},
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
		const clarafaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("outputImage");
		console.log(image.width, image.height);
		const width = Number(image.width);
		const height = Number(image.height);
		console.log(clarafaiFace);
		return {
			leftcol: clarafaiFace.left_col * width,
			toprow: clarafaiFace.top_row * height,
			rightcol: width - clarafaiFace.right_col * width,
			bottomrow: height - clarafaiFace.bottom_row * height,
		};
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
				// this.setState({
				// 	input: response.rawData.outputs[0].data.regions,
				// });
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

	submitFormHandler = () => {
		console.log(this.state.userinput);
		// this.setState({ route: "signedin" });
	};

	routeChangeHandler = (route) => {
		this.setState({
			route: route,
			userinput: {
				username: "",
				password: "",
			},
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
		// if (
		// 	this.state.users[0].username === this.state.userinput.username &&
		// 	this.state.users[0].password === this.state.userinput.password
		// ) {
		// 	this.setState({ route: route });
		// } else {
		// 	alert("something went wrong");
		// }
	};

	render() {
		let display = null;
		if (this.state.route === "signin") {
			display = (
				<div>
					{/* <Particles className="particles" /> */}

					{/* <Navigation signOut={this.signOutHandler} /> */}
					{/* <Logo /> */}
					<SignIn
						changeUser={this.usernameHandler}
						changePass={this.passwordHandler}
						submitForm={this.signInHandler}
					/>
				</div>
			);
		} else if (this.state.route === "home") {
			display = (
				<div>
					{/* <Particles className="particles" /> */}

					<Navigation signOut={this.routeChangeHandler} />
					{/* <Logo /> */}
					<Rank />
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
					{/* <Particles className="particles" />
					<Logo /> */}
					{/* <Navigation signOut={this.signOutHandler} /> */}

					<Register
						changeUser={this.usernameHandler}
						changePass={this.passwordHandler}
						submitForm={this.routeChangeHandler}
					/>
				</div>
			);
		}
		//if email.value === username && password.value === password
		//route to new page with everything
		return (
			<div className="main">
				{/* <Particles className="particles" />
				
				<Navigation />
				<Logo />
				<SignIn
					changeUser={this.usernameHandler}
					changePass={this.passwordHandler}
					submitForm={this.submitFormHandler}
				/>
				<Rank />
				<ImageLinkForm
					inputChange={this.onInputChangeHandler}
					onSubmit={this.onSubmitHandler}
				/>
				<FaceRecognition
					outputImg={this.state.outputImg}
					box={this.state.box}
				/> */}
				<Particles className="particles" />
				<Logo />
				{display}
			</div>
		);
	}
}

export default App;
