import React, { useRef, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
	body: {
		fontSize: 16,
		border: "1px solid rgba(224, 224, 224, 1)",
		transition: "all 0.5s ease-in",
	},
}))(TableCell);

const ChangingColorCell = ({ field, fixedValue }) => {
	const [highlight, setHighlight] = useState(false);
	const [changingColor, setChangingColor] = useState("");
	const prevField = usePrevious(field);

	const handleClick = (newColor) => {
		setHighlight(true);
		setChangingColor(newColor);
		setTimeout(() => {
			setHighlight(false);
		}, 3000);
	};

	useEffect(() => {
		// console.log(field);
		// console.log(prevField);
		if (field > prevField) {
			//green color
			handleClick("#00FF00");
		} else if (field < prevField) {
			//red color
			handleClick("#FF1919");
		}
	}, [field, prevField]);

	return (
		<StyledTableCell
			style={{ backgroundColor: highlight ? changingColor : "" }}>
			{fixedValue === "daily" ? `${field.toFixed(1)}%` : field.toFixed(2)}
		</StyledTableCell>
	);
};

export default ChangingColorCell;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
