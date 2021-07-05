const login = (state = false, action) => {
	switch (action.type) {
		case "LOG_IN":
			return action.payload;

		default:
			return state;
	}
};

export default login;
