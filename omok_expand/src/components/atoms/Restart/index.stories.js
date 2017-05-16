import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Restart from '.'

storiesOf('Restart', module)
  .add('default', () => (
    <Restart>Hello</Restart>
  ))
  .add('reverse', () => (
    <Restart reverse>Hello</Restart>
  ))
  .add('another palette', () => (
    <Restart palette="secondary">Hello</Restart>
  ))
  .add('disabled', () => (
    <Restart disabled>Hello</Restart>
  ))
  .add('transparent', () => (
    <Restart transparent>Hello</Restart>
  ))
  .add('height', () => (
    <Restart height={100}>Hello</Restart>
  ))
  .add('link', () => (
    <Restart href="https://github.com/diegohaz/arc">ARc repository</Restart>
  ))
