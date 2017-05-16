import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Board } from 'components'

storiesOf('Board', module)
  .add('default', () => (
    <Board>Hello</Board>
  ))
  .add('reverse', () => (
    <Board reverse>Hello</Board>
  ))
