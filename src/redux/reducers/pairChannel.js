const pairChannel = (state = {}, action) => {
	switch (action.type) {
		case "WEBSOCKET_SUBSCRIBE":
			return { ...state, [action.payload.pair]: action.payload.id };

		default:
			return state;
	}
};

export default pairChannel;
