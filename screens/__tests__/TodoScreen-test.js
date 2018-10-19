import React from 'react';
import TodoScreen from '../TodoScreen';
import renderer from 'react-test-renderer';

//Checks that TodoScreen renders correctly
it('should render corrrectly', async () => {
  const tree = renderer.create(<TodoScreen/>).toJSON();
  expect (tree).toMatchSnapshot();
})
