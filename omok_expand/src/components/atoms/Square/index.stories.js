import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Square from '.'

storiesOf('Square', module)
  .add('default', () => (
    <Square>Hello</Square>
  ))
  .add('reverse', () => (
    <Square reverse>Hello</Square>
  ))
