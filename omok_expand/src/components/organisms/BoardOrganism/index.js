import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import { Restart, Board, StatusLabel } from 'components'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const BoardOrganism = ({state, onRestart, onOmokClick, ...props}) => {

 	if (state.waiting || state.started) {
	  return (
	    <Wrapper {...props}>
	 		<Board
	 			squares={state.squares} 
	 			turn={state.turn}
	 			player={state.player}
	 			onOmokClick={onOmokClick} />
	 		<StatusLabel 
	 			win={state.win}
	 			started={state.started} 
	 			waiting={state.waiting}
	 			turn={state.turn}/> 
	    </Wrapper>
	  )
 	}
 	return  <Wrapper {...props}/>
}


export default BoardOrganism