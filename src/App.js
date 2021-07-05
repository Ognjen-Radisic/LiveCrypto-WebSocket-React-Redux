import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

//grab login state from redux
import { useSelector } from "react-redux";

function App() {
	const loginState = useSelector((state) => state.login);

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path="/" exact component={Home} />
				<ProtectedRoute
					path="/profile"
					exact
					isLogged={loginState}
					component={Profile}
				/>
			</Switch>
		</Router>
	);
}

export default App;
