import React from 'react';
import PomodoroScreen from '../PomodoroScreen';
import renderer from 'react-test-renderer';
import { _getFinishedPomodorosFromAsync } from '../PomodoroScreen';

it('should render corrrectly', async () => {
    const tree = renderer.create(<PomodoroScreen/>).toJSON();
    expect (tree).toMatchSnapshot();
  })

const AsyncStorage = require('react-native');
const provider = renderer.create(<PomodoroScreen></PomodoroScreen>).getInstance();

describe('storage', () => {
  test('_setFinishedPomodorosAsyncAndState should set state with no errors', () => {
      provider._setFinishedPomodorosAsyncAndState('123').then((error) => {
        expect(error).toEqual(null);
        expect(provider.setState({ finishedPomodoros : 123 })).toBeCalled();
    })
  })
  test('_setFinishedPomodorosAsyncAndState should store in AsyncStorage with no errors', () => {
    provider._setFinishedPomodorosAsyncAndState('123').then((error) => {
      expect(error).toEqual(null);
      expect(AsyncStorage.setItem).toBeCalledWith('pomodoroCounter', '123');
    })
  })
  test('_getFinishedPomodorosFromAsync should set state with no errors', () => {
    provider._getFinishedPomodorosFromAsync().then((error) => {
      expect(error).toEqual(null);
      expect(this.setState).toBeCalled();
    })
  })
  test('_getFinishedPomodorosFromAsync should get item with no error', () => {
    provider._getFinishedPomodorosFromAsync().then((error) => {
      expect(error).toEqual(null);
      expect(AsyncStorage.getItem).toBeCalledWith('pomodoroCounter');
    })
  })
})
