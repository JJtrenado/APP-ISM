import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';


import HomeScreen from "./src/components/pages/HomeScreen";
import LoginScreen from "./src/components/pages/LoginScreen";
import SettingsScreen from "./src/components/pages/SettingsScreen";
import ScannScreen from "./src/components/pages/ScannScreen";
import NewBookScreen from "./src/components/pages/NewBookScreen";
import RegisterScreen from './src/components/pages/RegisterScreen';
import WorkersScreen from './src/components/pages/WorkersScreen';
import BooksScreen from './src/components/pages/BooksScreen';

const Stack = createStackNavigator();

export default function App() { 
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Scann" component={ScannScreen} /> 
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Workers" component={WorkersScreen} />
        <Stack.Screen name="NewBook" component={NewBookScreen} />
        <Stack.Screen name="Books" component={BooksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}