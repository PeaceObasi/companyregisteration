import 'reflect-metadata';

/**
 * To finalize installation of react-native-gesture-handler,
 * add the following at the top (make sure it's at the top and there's nothing else before it)
 * of your entry file, such as App.tsx:
*/
import 'react-native-gesture-handler';

import React from 'react';
import { Image, StyleSheet } from 'react-native';
// Before rendering any navigation stack, enableScreens for memory optimisation. See https://reactnavigation.org/docs/react-native-screens/
import { enableScreens } from 'react-native-screens';
enableScreens();

/**
 * Import createStackNavigator that we will use to create the stack navigator for the home page
 * We shall see below how they are used
*/
import { createStackNavigator } from '@react-navigation/stack';
/**
 * Import NavigationContainer that we will use to wrap the stack we will create.
 See in App component below how it is used
*/
import { NavigationContainer } from '@react-navigation/native';

/**
 * Import our components that we will create screens for.
 * Among them is a new Component named Home which will simply contain Button links to
 * each of the other Component screens.
 * See Home.tsx for implementation for the saiD Home component
*/

import Home from './src/Home';
import AddEntry from './src/components/AddEntry';
import EntryFlatList from './src/components/EntryFlatList';
import Settings from './src/components/Settings';
import Extra from './src/Extra';
import BottomTabNavigator from './src/navigation/tabnavigation';
import AppStack from './src/navigation/stacknavigation';




const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;