// const defaultState = {
// 	pair(BTCUSD):{
//      channelID: 1523,
// 		dailyChange: 5.1,
// 		volume: 999023,
// 		lastPrice: 37834
// 	}
// 1523(channelID):{
// 	pair:"BTCUSD",
// 		dailyChange: 5.1,
// 		volume: 999023,
// 		lastPrice: 37834

// }
// }

const tableData = (state = [], action) => {
	switch (action.type) {
		case "WEBSOCKET_UPDATE":
			return state;

		default:
			return state;
	}
};

export default tableData;
