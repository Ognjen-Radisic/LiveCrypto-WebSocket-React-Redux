import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

//redux
import { useDispatch, useSelector } from "react-redux";

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
	const dispatch = useDispatch();
	const loginState = useSelector((state) => state.login);

	const logInFunc = () => {
		dispatch({ type: "LOG_IN", payload: true });
	};

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h5" className={classes.logo}>
						<Link to="/" className={classes.textLink}>
							Navbar
						</Link>
					</Typography>

					{/* Depending on loginState state, regulate flex-grow property */}
					<Typography
						variant="h6"
						style={{ flexGrow: loginState ? 0 : 1, marginRight: "20px" }}>
						<Link to="/" className={classes.textLink}>
							Home
						</Link>
					</Typography>

					{/* "loggin functionality", when button is clicked display Profile (Nav item) permanently */}
					{loginState ? (
						<Typography variant="h6">
							<Link to="/profile" className={classes.textLink}>
								Profile
							</Link>
						</Typography>
					) : (
						<Button
							variant="contained"
							color="secondary"
							onClick={() => logInFunc()}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
