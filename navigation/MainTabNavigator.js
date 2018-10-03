import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TodoScreen from '../screens/TodoScreen';
import FocusScreen from '../screens/FocusScreen';
import PomodoroScreen from '../screens/PomodoroScreen';
import SettingsScreen from '../screens/SettingsScreen';

const TodoStack = createStackNavigator({
  Home: TodoScreen,
});

TodoStack.navigationOptions = {
  tabBarLabel: 'Todo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-checkbox-outline'
      }
    />
  ),
};

const FocusStack = createStackNavigator({
  Links: FocusScreen,
});

FocusStack.navigationOptions = {
  tabBarLabel: 'Focus',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-speedometer${focused ? '' : '-outline'}` : 'md-speedometer'}
    />
  ),
};

const PomodoroStack = createStackNavigator({
  Pomodoros: PomodoroScreen,
});

PomodoroStack.navigationOptions = {
  tabBarLabel: 'Pomodoro',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-speedometer${focused ? '' : '-outline'}` : 'md-speedometer'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Achievements',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-ribbon${focused ? '' : '-outline'}` : 'md-ribbon'}
    />
  ),
};

export default createBottomTabNavigator({
  TodoStack,
  FocusStack,
  PomodoroStack,
  SettingsStack,
});
