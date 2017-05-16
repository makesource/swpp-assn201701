import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import { Square } from 'components'

const Board = ({ squares, turn, player, onOmokClick }) => {
	return (<div>
		{renderBoard(squares, (turn == player), onOmokClick)}
	</div>);
}

function renderBoard(squares, myTurn, onOmokClick) {
	var list = [];
	for (var i=0;i<squares.length;i++) {
		list.push(<div>{renderRow(i, squares, myTurn, onOmokClick)}</div>);
	}
	return list;
}

function renderRow(row, squares, myTurn, onOmokClick) {
	var list = [];
	for (var i=0;i<squares[row].length;i++) {
		list.push(renderSquare(row, i, squares, myTurn, onOmokClick));
	}
	return list;
}

function renderSquare(row, col, squares, myTurn, onOmokClick) {
	let id = row + "_" + col;
	if (squares[row][col] === '-' && myTurn) {
		return (
			<Square 
				id={id}
				value={squares[row][col]}
				onClick={() => onOmokClick(id)}
			/>
		);
	}
	return (
		<Square 
			id={id}
			value={squares[row][col]}
		/>
	);
}

export default Board
