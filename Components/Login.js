import React, {useEffect, useState} from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { setUser, setAuthToken } from "../actions/user";
import {setOpinions} from '../actions/opinions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as api from "../api";
import * as Notifications from 'expo-notifications'
import {addMessageToChat, createNewChat} from '../actions/chats'
import {setSubscription} from '../actions/subscription'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const LogInScreen = ({ setUser, opinions, addMessageToChat, createNewChat, chats}) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  async function handleNotification(not) {
    console.log(not.request.content.data)
    if (not.request.content.data.type === 'message') {
      console.log('************************MESSAGE DATA FROM RECEIVER********************')
      
      console.log(not.request.content.data)

      

      console.log('************************MESSAGE DATA FROM RECEIVER********************')
      addMessageToChat(not.request.content.data.message, not.request.content.data.senderId)
    } else if (not.request.content.data.type === 'match') {
        const matchedWith = not.request.content.data.senderId;
        const userInfo = await api.getUserInfo(matchedWith);
        let topic;

      opinions.forEach(op => {
        if (op.statementid === not.request.content.data.statementid) topic = op.statement;
      })


        console.log({userId})
        createNewChat({img: '../assets/person1.jpg', topic, name: userInfo.name, userId: userInfo.userid });
        console.log('chats after creating new chat: ');
        console.log(chats)

    } else {
      console.log('received unrecognized notification!')
    }
  }

  

  

  const showLoginToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG)
  }

 

  
  async function getLogin() {
    const expoToken = await api.registerForPushNotificationsAsync()
    console.log({expoToken})
    const userInfo = await api.logIn(email, password, expoToken);
    if (userInfo.statusCode === 401) {
      showLoginToast("Incorrecte gegevens");
    }

    console.log('userInfo:');
    console.log(userInfo);

    console.log({expoToken})

    setUser({
      name: userInfo.name,
      authToken: userInfo.authtoken,
      id: userInfo.userid,
      email: email.toLowerCase(),
      expoToken,
      acceptingMatches: userInfo.acceptingmatches,
    })
    Notifications.addNotificationReceivedListener(handleNotification)
    

  }

  return (
      <View style={{marginTop: 40}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          keyboardType="email-address"
          value={email}
          placeholder='E-mail'
          placeholderTextColor={'grey'}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Wachtwoord"
          placeholderTextColor={'grey'}
          secureTextEntry={true}
        />

        <Button title="Verstuur" onPress={getLogin}></Button>
      </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setAuthToken, setUser, setOpinions, addMessageToChat, createNewChat, setSubscription
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { user , opinions, chats} = state
  return { user, opinions, chats }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);