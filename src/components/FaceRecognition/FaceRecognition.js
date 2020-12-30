import React from "react";

const FaceRecognition = (props) => {
	return (
		<div className="center push">
			<img src={props.outputImg} />
		</div>
	);
};

export default FaceRecognition;
