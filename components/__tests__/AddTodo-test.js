import React from 'react'
import renderer from 'react-test-renderer'
import AddTodo from '../AddTodo'

//Check that AddTodo-Component renders correctly and matches snapshot
it('renders correctly', () => {
  const tree = renderer.create(<AddTodo />).toJSON()
  expect(tree).toMatchSnapshot()
})