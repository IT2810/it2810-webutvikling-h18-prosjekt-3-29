import React from 'react';
import PomodoroScreen from '../PomodoroScreen';
import renderer from 'react-test-renderer';

it('should render corrrectly', async () => {
    const tree = renderer.create(<PomodoroScreen/>).toJSON();
    expect (tree).toMatchSnapshot();
  })