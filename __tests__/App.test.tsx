/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
/* build-ref:delta */
jest.mock('../global.css', () => ({}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('../src/navigation/AppNavigator', () => {
  const ReactLib = require('react');
  const {Text} = require('react-native');
  return () => ReactLib.createElement(Text, null, 'mocked nav');
});

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
