import UserChat from './HomeScreen/UserChat';
import Welcome from '../Components/Welcome'
import Login from '../Components/Login';
import Register from '../Components/Register'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../Components/HomeScreen/SettingsScreen';
import ChatTab from '../Components/ChatTab';
import OpinionScreen from '../Components/HomeScreen/OpinionScreen';
import { connect } from 'react-redux';

import {setAuthToken} from '../actions/user';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements'
import { requestMatch } from '../api';
import { View, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';

import ProfileSettingsScreen from './ProfileSettingsScreen';
import HomeScreen from './HomeScreen/HomeSceen';
import * as api from '../api'
import * as Device from 'expo-device';


import React, { useState, useEffect, useRef } from 'react';










const Stack = createNativeStackNavigator();

function Main({user}) {
  
  function handleNotification() {
    console.log(1)
  }

    return (
        <NavigationContainer>

            <Stack.Navigator>
            {user.authToken !== undefined ?  <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /> : <>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}   />
            <Stack.Screen name="Log in" component={Login}  />
            <Stack.Screen name="Registreren" component={Register}  />
            </>}
            <Stack.Screen name="UserChat" component={UserChat} />
            <Stack.Screen name="Profiel Aanpassen" component={ProfileSettingsScreen} />
           
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}


const mapStateToProps = (state) => {
    const {  user, chats } = state
    return { user, chats }
  };
  



  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      
      setAuthToken
    }, dispatch)
  );
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);