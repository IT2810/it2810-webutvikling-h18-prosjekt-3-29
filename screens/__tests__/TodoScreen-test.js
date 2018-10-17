import React from 'react';
import TodoScreen from '../TodoScreen';
import renderer from 'react-test-renderer';

it('should render corrrectly', async () => {
    const tree = renderer.create(<TodoScreen/>).toJSON();
    expect (tree).toMatchSnapshot();
  })
