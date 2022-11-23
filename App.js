import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import StartScreen from './Screens/startScreen'
import LoginScreen from './Screens/LoginScreen'
import HomeScreen from './Screens/HomeScreen';
import CameraScreen from './Screens/Camerascreen';
import FormScreen from './Screens/FormScreen';

import React,{ Component } from 'react'

const stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name="Home" component={StartScreen} />
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="profile" component={HomeScreen} />
          <stack.Screen name="Camera" component={CameraScreen} />
          <stack.Screen name="Form" component={FormScreen} />
        </stack.Navigator>
      </NavigationContainer>
    );
  }
}
