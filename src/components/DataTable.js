import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ChangingColorCell from "./ChangingColorCell";

//redux
import { useDispatch, useSelector } from "react-redux";

//================table styling===================//
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 18,
		fontWeight: 700,
		border: "1px solid rgba(224, 224, 224, 1)",
	},
	body: {
		fontSize: 16,
		border: "1px solid rgba(224, 224, 224, 1)",
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		maxWidth: 700,
		margin: "100px auto",
	},
});

//=============================================//

//table component
export default function DataTable() {
	const classes = useStyles();
	const dispatch = useDispatch();

	//grabing 2 redux reducer states
	const cryptoData = useSelector((state) => state.tableData);
	const cryptoChannelID = useSelector((state) => state.pairChannel);

	//default columns and curencies that will be subscribed to websocket
	const defaultRows = ["BTCUSD", "BTCEUR", "ETHUSD", "ETHEUR", "EOSUSD"];
	const deafultColumns = [
		"#",
		"Symbol", //exm "BTCUSD"
		"Daily change", // position 4 in response array
		"Volume", // position 7 in response array
		"Last Price", // position 6 in response array
	];

	//on mount connect to websocket and setup event listeners
	useEffect(() => {
		const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

		ws.addEventListener("open", () => {
			//subscribe to these currency pairs
			defaultRows.map((pair) =>
				ws.send(
					JSON.stringify({
						event: "subscribe",
						channel: "ticker",
						symbol: pair,
					})
				)
			);
		});

		//when we get response from server filter it and assign it to correct redux state
		ws.addEventListener("message", (msg) => {
			const parsedData = JSON.parse(msg.data);
			//this means new data arrived for channel or just a ping to a existing channel
			if (Array.isArray(parsedData)) {
				//if it is not ping response, but data response continue, "hb" stands for hearthbeat
				if (parsedData[1] !== "hb") {
					// console.log(parsedData);
					dispatch({
						type: "WEBSOCKET_UPDATE",
						payload: {
							channelId: parsedData[0],
							dailyChange: parsedData[1][4],
							volume: parsedData[1][7],
							lastPrice: parsedData[1][6],
						},
					});
				}
			}
			//error checking
			else if (parsedData === undefined || parsedData === null) {
				console.log("We haave server connection problems");
			}
			//this means it is initial subscribe object as data response
			else {
				dispatch({
					type: "WEBSOCKET_SUBSCRIBE",
					payload: {
						pair: parsedData.pair,
						id: parsedData.chanId,
					},
				});
			}
		});

		//on unmount close websocket connection
		return () => {
			ws.close();
			dispatch({ type: "WEBSOCKET_CLOSE", payload: {} });
		};
	}, []);

	return (
		<>
			<TableContainer>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							{deafultColumns.map((item, index) => {
								return (
									<StyledTableCell key={index} align="left">
										{item}
									</StyledTableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{defaultRows.map((row, index) => {
							const curId = cryptoChannelID[row];

							//error checking to see is first batch of data loaded in redux state
							if (cryptoData[curId] === undefined) return null;

							return (
								<StyledTableRow key={index}>
									<StyledTableCell>{index + 1}</StyledTableCell>
									<StyledTableCell>{row}</StyledTableCell>
									<ChangingColorCell
										field={cryptoData[curId].dailyChange}
										fixedValue="daily"
									/>
									<ChangingColorCell
										field={cryptoData[curId].volume}
										fixedValue="common"
									/>
									<ChangingColorCell
										field={cryptoData[curId].lastPrice}
										fixedValue="common"
									/>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
