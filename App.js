import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
// import {Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from './src/authentication'
import UserSelect from './src/auth_slelect'
import Dashboard from './src/Dashboard'
import VikingChallenge from './src/viking_challenge'
import Nutrition from './src/choose_nutrition'
import Ragnar from './src/ragnar'
import Valkyrie from './src/valkyrie'
import Detail from './src/details'
import Random from './src/random_workout'
import Completed from './src/completed'
import LogDay from './src/log_day'
import DailyWorkout from './src/day_workout'
import Logged from './src/logged_days'
import Loading from './src/Loading'



const Stack = createStackNavigator();



export default class App extends Component {
  render() {
    console.disableYellowBox = true

    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={Loading} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="UserSelect" component={UserSelect} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Auth" component={Auth} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="VikingChallenge" component={VikingChallenge} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Nutrition" component={Nutrition} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Ragnar" component={Ragnar} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Valkyrie" component={Valkyrie} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Detail" component={Detail} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Random" component={Random} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Completed" component={Completed} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="LogDay" component={LogDay} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="DailyWorkout" component={DailyWorkout} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Logged" component={Logged} options={{ title: 'Auth', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
