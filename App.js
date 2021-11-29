/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './app/navigation';

const App = () => {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
