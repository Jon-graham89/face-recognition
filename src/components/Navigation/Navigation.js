import React from "react";

const Navigation = (props) => (
	<nav style={{ display: "flex", justifyContent: "flex-end" }}>
		<p
			className="f3 link dim black underline pa3 pointer"
			onClick={() => props.signOut("signin")}
		>
			{props.children}
		</p>
	</nav>
);

export default Navigation;
