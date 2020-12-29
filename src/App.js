import "./App.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: "",
		};
	}

	onInputChangeHandler = (event) => {
		console.log(event.target.value);
	};

	onSubmitHandler = () => {
		console.log("clicked");
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
				{/* <FaceRecognition /> */}
			</div>
		);
	}
}

export default App;
