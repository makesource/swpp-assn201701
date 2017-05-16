import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import { ReduxField, Field, Button, PostForm, Label } from 'components'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
`

const LoginOrganism = ({state, onPostEnterRoom, ...props}) => {
  let uid, upwd, rid
  
  return (
    <Wrapper {...props}>
    	<div>
        <div>
          <div>
          <Label>Login :</Label>
          <input id="username_field" ref={node => {uid = node;}}/>
          </div>
          <div>
          <Label>PW :</Label>
          <input id="password_field" ref={node => {upwd = node;}}/>
          </div>
          <div>
          <Label>Room Number :</Label>
          <input id="room_field" ref={node => {rid = node;}}/>
          </div>
          <div>
          <Label>Enemy : </Label>
          <Label id="enemy_field">{state.enemyname}</Label>
          </div>
        </div>
        <Field id="connect" name="connect" type="submit" value="connect" onClick={() => onPostEnterRoom(uid.value, upwd.value, rid.value)}/>
 		  </div>
    </Wrapper>
  )
}

LoginOrganism.propTypes = {
  reverse: PropTypes.bool,
}

export default LoginOrganism
