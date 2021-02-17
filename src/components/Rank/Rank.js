import React from "react";

const Rank = ({ entries, name }) => {
	return (
		<div>
			<div className="white f3">
				<p>
					{name} your current entry count is...<br></br>
					{entries}
				</p>
			</div>
		</div>
	);
};

export default Rank;
