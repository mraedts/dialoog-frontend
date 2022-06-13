import { Text, View, Button } from 'react-native';
import { useEffect, useState , useRef} from 'react';
import {setAuthToken, setJustLoggedOut, setUser} from '../actions/user';
import { addMessageToChat } from '../actions/chats';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { createNewChat } from '../actions/chats';
import * as Notifications from 'expo-notifications'
import * as api from '../api'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


function Welcome({navigation, user, setAuthToken, opinions, addMessageToChat, createNewChat, route, setJustLoggedOut}) {
  



  

  
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:50, fontWeight: 'bold', paddingBottom: 20}}>Dialoog</Text> 
       <Button onPress={() => {
        
        navigation.navigate('Log in', )}
        } style={{marginBottom: 20}}  title="Log in"></Button> 
        <Button onPress={() => navigation.navigate('Registreren')} style={{marginTop: 20}}title="Registreer"></Button> 
      </View>
    );
}


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setAuthToken, addMessageToChat, createNewChat, setJustLoggedOut
  }, dispatch)
);




const mapStateToProps = (state) => {
  const { user, opinions, chats } = state
  return { user, opinions, chats }
};






export default connect(mapStateToProps, mapDispatchToProps)(Welcome);