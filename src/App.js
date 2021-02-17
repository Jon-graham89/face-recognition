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

//create security for this apikey - needs to go to backend, can it be created safe with hash?
const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "eea810b65864447c9ac8eb2fe6d540e2",
});

const initialState = {
	input: "",
	outputImg: "",
	imgUrl: "",
	box: [],
	isSignedIn: false,
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: "",
	},
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

class App extends React.Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			},
		});
	};

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
				if (response) {
					this.setState({
						outputImg: this.state.imgUrl,
					});
					fetch("https://shielded-cliffs-66198.herokuapp.com:3000/image", {
						method: "put",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: this.state.user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							this.setState(Object.assign(this.state.user, { entries: count }));
						});
				}
				this.displayBoxHandler(this.calculateFaceLocation(response));
			})

			.catch((error) => console.log(error));
	};

	// registerUser = () => {};

	routeChangeHandler = (route) => {
		if (route === "signin") {
			this.setState(initialState);
		} else if (route === "home") {
			this.setState({ isSignedIn: true });
		}
		this.setState({
			route: route,
		});
	};

	render() {
		let display = null;
		if (this.state.route === "signin") {
			display = (
				<div>
					<Logo />
					<SignIn
						onRouteChange={this.routeChangeHandler}
						loadUser={this.loadUser}
					/>
				</div>
			);
		} else if (this.state.route === "home") {
			display = (
				<div>
					<Navigation signOut={this.routeChangeHandler}>Sign Out</Navigation>
					<Logo />
					<Rank entries={this.state.user.entries} name={this.state.user.name} />

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
					<Navigation signOut={this.routeChangeHandler}>Return</Navigation>
					<Logo />

					<Register
						onRouteChange={this.routeChangeHandler}
						loadUser={this.loadUser}
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
