import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { BoardOrganism } from 'components'

storiesOf('BoardOrganism', module)
  .add('default', () => (
    <BoardOrganism />
  ))
  .add('reverse', () => (
    <BoardOrganism reverse />
  ))
