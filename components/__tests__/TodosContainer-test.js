import React from 'react';
import TodosContainer from '../TodosContainer';
import renderer from 'react-test-renderer';
import MockAsyncStorage from 'mock-async-storage';
import { AsyncStorage as storage } from 'react-native'

//Implements mock
const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
  }
  
  it('should render corrrectly', async () => {
    mock();
    const tree = renderer.create(<TodosContainer />).toJSON();
    expect (tree).toMatchSnapshot();
    jest.unmock('AsyncStorage');
  })

  it('Mock Async Storage working', async () => {
    await storage.setItem('testKey', '5')
    const value = await storage.getItem('testKey')
    expect(value).toBe('5')
  })