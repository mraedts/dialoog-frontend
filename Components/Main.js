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
import { useEffect, useState } from 'react';
import {setAuthToken} from '../actions/user';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements'
import { requestMatch } from '../api';
import { View, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import ProfileSettingsScreen from './ProfileSettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({chats}) {
    function getMatch() {
      // request match from api and store in state
    }

    const showToast = () => {
      ToastAndroid.show("Iedereen is het met je eens! We kunnen niemand met je matchen.", ToastAndroid.LONG)
    };

    return (
        <Tab.Navigator>
          <Tab.Screen name="Gesprekken" component={ChatTab} chats={chats} options={{headerRight: () => (
            <View style={{marginRight:10 , marginTop: 0}}>
                <Button
                title="Nieuw Gesprek"
                type="clear"
                onPress={showToast}
                />
            </View>
          )}} />
          <Tab.Screen name="Meningen" component={OpinionScreen} />
          <Tab.Screen name="Instellingen" component={SettingsScreen} />
        </Tab.Navigator>
    );
  }
  
function Main({user}) {
    useEffect(() => {
        console.log(user)
    })
    
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
    const { friends, user, chats } = state
    return { friends, user, chats }
  };
  



  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      
      setAuthToken
    }, dispatch)
  );
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);