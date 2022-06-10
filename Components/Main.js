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




function Main({user}) {
    useEffect(() => {
        console.log(user)
    })
    
    return (
        <NavigationContainer>

            <Stack.Navigator>
            {user !== undefined ?  <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /> : null}
           
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}   />
            <Stack.Screen name="Log in" component={Login}  />
            <Stack.Screen name="Registreren" component={Register}  />
            <Stack.Screen name="UserChat" component={UserChat} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const mapStateToProps = (state) => {
    const { friends, user, chats } = state
    return { friends, user, chats }
  };
  
  export default connect(mapStateToProps)(Main);