

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './Components/HomeScreen/SettingsScreen';
import ChatTab from './Components/ChatTab';
import OpinionScreen from './Components/HomeScreen/OpinionScreen';
import UserChat from './Components/HomeScreen/UserChat'
import Welcome from './Components/Welcome'
import Login from './Components/Login';
import Register from './Components/Register'
import {useState} from 'react';


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
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /> : null}
    
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name="Log in" component={Login} />
        <Stack.Screen name="Registreren" component={Register} />
        <Stack.Screen name="UserChat" component={UserChat} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
