
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './Components/SettingsScreen';
import ChatTab from './Components/ChatTab';
import OpinionScreen from './Components/OpinionScreen';
import UserChat from './Components/UserChat'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({chats}) {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Gesprekken" component={ChatTab} chats={chats} />
        <Tab.Screen name="Meningen" component={OpinionScreen} />
        <Tab.Screen name="Instellingen" component={SettingsScreen} />
      </Tab.Navigator>
    
  );
}

export default function App() {
 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="UserChat" component={UserChat} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}
