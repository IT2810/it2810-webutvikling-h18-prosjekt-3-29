import React from 'react'
import renderer from 'react-test-renderer'
import Countdown from '../Countdown'

//Mock function to send as prop to Countdown
let onActionMock = jest.fn();

//Check that Countdown renders correctly and matches snapshot
it('renders correctly', () => {
  const tree = renderer.create(<Countdown onProgress={onActionMock}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
