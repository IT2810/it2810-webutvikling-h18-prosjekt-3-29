import React from 'react';
import FocusScreen from '../FocusScreen';
import renderer from 'react-test-renderer';
import MockAsyncStorage from 'mock-async-storage';
import { AsyncStorage as storage } from 'react-native'

//Implements mocks, the remianing mocks are done in test.setup.js
const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
  }
  
  it('should render corrrectly', async () => {
    mock();
    const tree = renderer.create(<FocusScreen/>).toJSON();
    expect (tree).toMatchSnapshot();
    jest.unmock('AsyncStorage');
  })