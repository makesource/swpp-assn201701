import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { LoginOrganism } from 'components'

storiesOf('LoginOrganism', module)
  .add('default', () => (
    <LoginOrganism />
  ))
  .add('reverse', () => (
    <LoginOrganism reverse />
  ))
