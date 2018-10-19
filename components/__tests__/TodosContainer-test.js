import React from 'react';
import TodosContainer from '../TodosContainer';
import renderer from 'react-test-renderer';
import MockAsyncStorage from 'mock-async-storage';
import { AsyncStorage as storage } from 'react-native'

//Implements mock for AsyncStorage in order to be able to render TodosContainer
const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}
  
//Check that TodosContainer renders correctly
it('should render corrrectly', async () => {
  mock();
  const tree = renderer.create(<TodosContainer />).toJSON();
  expect (tree).toMatchSnapshot();
  jest.unmock('AsyncStorage');
})

//Just for fun, check that AsyncStorage is working correctly 
it('Mock Async Storage working', async () => {
  await storage.setItem('testKey', '5')
  const value = await storage.getItem('testKey')
  expect(value).toBe('5')
})