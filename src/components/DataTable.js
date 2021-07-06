import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

export default function DataTable() {
	const classes = useStyles();
	const [webData, setWebData] = useState("dasd");

	const defaultRows = ["BTCUSD", "BTCEUR", "ETHUSD"]; //, "ETHEUR", "EOSUSD"
	const deafultColumns = [
		"#",
		"Symbol",
		"Daily change",
		"Volume",
		"Last Price",
	];

	useEffect(() => {
		const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

		ws.addEventListener("open", () => {
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

		ws.addEventListener("message", (msg) => {
			setWebData(msg.data);
			const dataArr = JSON.parse(msg.data);
			console.log(dataArr);
		});

		return () => {
			ws.close();
		};
	}, []);

	return (
		<>
			<h2>{webData}</h2>
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
						{defaultRows.map((row, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell>{index + 1}</StyledTableCell>
								<StyledTableCell>{row}</StyledTableCell>
								<StyledTableCell align="left">{row}</StyledTableCell>
								<StyledTableCell align="left">{row}</StyledTableCell>
								<StyledTableCell align="left">{row}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
