// const defaultState = {
//    1523(channelID):{
// 	       dailyChange: 5.1,
// 	       volume: 999023,
// 	       lastPrice: 37834
//    }
// }

const tableData = (state = {}, action) => {
	switch (action.type) {
		case "WEBSOCKET_UPDATE":
			const id = action.payload.channelId;
			// const daily = `${action.payload.dailyChange.toFixed(1)}%`;
			// const vol = action.payload.volume.toFixed(2);
			// const lastP = action.payload.lastPrice.toFixed(2);

			const daily = action.payload.dailyChange;
			const vol = action.payload.volume;
			const lastP = action.payload.lastPrice;

			return {
				...state,
				[id]: {
					dailyChange: daily,
					volume: vol,
					lastPrice: lastP,
				},
			};

		case "WEBSOCKET_CLOSE":
			return {};

		default:
			return state;
	}
};

export default tableData;
