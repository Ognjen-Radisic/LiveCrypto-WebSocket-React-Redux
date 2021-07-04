import React from "react";
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
	},
	body: {
		fontSize: 16,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function createData(num, name, calories, fat, carbs, protein) {
	return { num, name, calories, fat, carbs, protein };
}

const rows = [
	createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData(3, "Eclair", 262, 16.0, 24, 6.0),
	createData(4, "Cupcake", 305, 3.7, 67, 4.3),
	createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
	table: {
		maxWidth: 700,
		margin: "100px auto",
	},
});

export default function DataTable() {
	const classes = useStyles();

	return (
		<TableContainer>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>#</StyledTableCell>
						<StyledTableCell>Dessert (100g serving)</StyledTableCell>
						<StyledTableCell align="right">Calories</StyledTableCell>
						<StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
						<StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
						<StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.num}>
							<StyledTableCell>{row.num}</StyledTableCell>
							<StyledTableCell>{row.name}</StyledTableCell>
							<StyledTableCell align="right">{row.calories}</StyledTableCell>
							<StyledTableCell align="right">{row.fat}</StyledTableCell>
							<StyledTableCell align="right">{row.carbs}</StyledTableCell>
							<StyledTableCell align="right">{row.protein}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
