import React from 'react'
import renderer from 'react-test-renderer'
import TabBarIcon from '../TabBarIcon'

//Check that TabBarIcon renders correctly
it('renders correctly', () => {
  const tree = renderer.create(<TabBarIcon />).toJSON()
  expect(tree).toMatchSnapshot()
})