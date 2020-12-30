import "./App.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
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
		};
	}

	onInputChangeHandler = (event) => {
		this.setState({
			imgUrl: event.target.value,
		});
	};

	onSubmitHandler = () => {
		app.models
			.predict(
				"d02b4508df58432fbb84e800597b8959",
				"https://variety.com/wp-content/uploads/2020/12/Meghan-Markle-Prince-Harry-Spotify-Holiday-Special-Podcast.jpg"
			)
			.then((response) => {
				this.setState({
					input: response.rawData.outputs[0].data.regions,
				});
				console.log(this.state.input);
			})
			.catch((error) => console.log(error));
		this.setState({
			outputImg: this.state.imgUrl,
		});
	};

	render() {
		return (
			<div className="main">
				<Particles className="particles" />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm
					inputChange={this.onInputChangeHandler}
					onSubmit={this.onSubmitHandler}
				/>
				<FaceRecognition outputImg={this.state.outputImg} />
			</div>
		);
	}
}

export default App;
