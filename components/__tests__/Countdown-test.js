import React from 'react'
import renderer from 'react-test-renderer'
import Countdown from '../Countdown'

// Sender med en tom funksjon
let onActionMock = jest.fn();

it('renders correctly', () => {
  const tree = renderer.create(<Countdown onProgress={onActionMock}/>).toJSON()
  expect(tree).toMatchSnapshot()
})