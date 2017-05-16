import React from 'react'
import { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'components'
import { font, palette } from 'styled-theme'


const styles = css`
  background: #fff;
  border: 1px solid #999;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
`
const StyledButton = styled.button`${styles}`

const Square = ({id, value, ...props}) => {
	return (<StyledButton id={id} {...props} >
		{value}
	</StyledButton>)
}

Square.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func
}

export default Square
