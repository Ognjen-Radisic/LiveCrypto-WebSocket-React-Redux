import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	logo: {
		marginRight: "50px",
	},
	textLink: {
		color: "inherit",
		textDecoration: "inherit",
	},
}));

const Navbar = () => {
	const classes = useStyles();
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h5" className={classes.logo}>
						Navbar
					</Typography>

					{/* Depending on loggedIn state, regulate flex-grow property */}
					<Typography
						variant="h6"
						style={{ flexGrow: loggedIn ? 0 : 1, marginRight: "20px" }}>
						<Link to="/" className={classes.textLink}>
							Home
						</Link>
					</Typography>

					{/*Quasi loggin functionality, when button is clicked display Profile (Nav item) permanently */}
					{loggedIn ? (
						<Typography variant="h6">
							<Link to="/profile" className={classes.textLink}>
								Profile
							</Link>
						</Typography>
					) : (
						<Button
							variant="contained"
							color="secondary"
							onClick={() => setLoggedIn(true)}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
