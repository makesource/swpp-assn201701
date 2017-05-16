import React from 'react';
import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Label = styled.label`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 1)};
  font-size: 1rem;
  line-height: 2em;
`

function StatusLabel({win, waiting, started, turn}) {
	let status = "";
	if (!waiting && !started){
		status = ""
	} else if (waiting) {
		status = "WAITING"
	} else if (win) {
		if (win == 1) status = "O win";
		if (win == 2) status = "X win";
	} else {
		status = (turn == 1 ? "Next O" : "Next X")
	}
	return (
		<Label id='status_label'>
			{status}
		</Label>
	);
}

export default StatusLabel
