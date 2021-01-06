import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ outputImg, box }) => {
	const faceBox = box.map((box, index) => {
		return (
			<div
				key={index}
				className="bounding-box"
				style={{
					top: box.toprow,
					right: box.rightcol,
					bottom: box.bottomrow,
					left: box.leftcol,
				}}
			></div>
		);
	});
	return (
		<div className="center ma">
			<div className="absolute mt2 ">
				<img
					alt=""
					id="outputImage"
					src={outputImg}
					width="500px"
					height="auto"
				/>

				{faceBox}
			</div>
		</div>
	);
};

export default FaceRecognition;
