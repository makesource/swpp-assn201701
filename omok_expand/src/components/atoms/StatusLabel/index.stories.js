import React from 'react'
import { storiesOf } from '@kadira/storybook'
import StatusLabel from '.'

storiesOf('StatusLabel', module)
  .add('default', () => (
    <StatusLabel>Hello</StatusLabel>
  ))
  .add('reverse', () => (
    <StatusLabel reverse>Hello</StatusLabel>
  ))
