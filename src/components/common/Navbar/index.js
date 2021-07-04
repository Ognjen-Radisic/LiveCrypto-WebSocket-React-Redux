import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	logo: {
		marginRight: "30px",
	},

	title: {
		flexGrow: 1,
	},
}));

const Navbar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h5" className={classes.logo}>
						Navbar
					</Typography>
					<Typography variant="h6" className={classes.title}>
						Home
					</Typography>
					<Button variant="contained" color="secondary">
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
