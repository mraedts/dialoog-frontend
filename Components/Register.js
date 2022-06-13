import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { setAuthToken, setUser } from "../actions/user";
import {registerAndLogin } from "../api";
import { ToastAndroid } from "react-native";
import { setOpinions } from "../actions/opinions";
import * as api from '../api'
import * as Notifications from 'expo-notifications'

const Register = ({user, setUser, setOpinions, opinions}) => {
  const [name, changeName] = React.useState("");
  const [email, changeEmail] = React.useState("");
  const [password, changePassword] = React.useState("");
  const [vPassword, changeVPassword] = React.useState("");
  
  async function handleNotification(not) {
    console.log(not.request.content.data)
    if (not.request.content.data.type === 'message') {
      addMessageToChat(not.request.content.data.message, not.request.content.data.senderId)
    } else if (not.request.content.data.type === 'match') {
        const matchedWith = not.request.content.data.senderId;
        const userInfo = await api.getUserInfo(matchedWith);


        let topic;

      opinions.forEach(op => {
        if (op.statementid === not.request.content.data.statementid) topic = op.statement;
      })
        createNewChat({img: '../assets/person1.jpg', topic, name: userInfo.name, userId: userInfo.userid });

    } else {
      console.log('received unrecognized notification!')
    }
  }

  const showRegistrationToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG)
  };

  const re = new RegExp ('1*@1*.1*');

  async function register() {
    const expoToken = await api.registerForPushNotificationsAsync();
    console.log({expoToken})

    
    if (false) {//!re.test(email)) {
      showRegistrationToast("Dat is geen geldig e-mailadres");
    } else if (name === '' | name === ' ' | !(name.length > 2)) {
      showRegistrationToast("Geen geldige username");
    } else if (password !== vPassword) {
        showRegistrationToast("Wachtwoorden zijn niet gelijk");
    } else {
      const userInfo = await registerAndLogin(name, email, password, expoToken);
      if (userInfo.statusCode === 405) {
        showRegistrationToast("Dat e-mailadres is al in gebruik");
      }
      console.log('from register(): ');
      console.log(userInfo);

      setUser({
        name: userInfo.name,
        authToken: userInfo.authtoken,
        id: userInfo.userid,
        acceptingMatches: userInfo.acceptingmatches,
        email,
        expoToken
      })

      setOpinions(userInfo.answers)

      console.log('----------------------------------------------------')
      console.log('adding Notificationreceivedlistener...')
      console.log('----------------------------------------------------')
      Notifications.addNotificationReceivedListener(handleNotification);
    }
  }

  return (
      <View style={{marginTop: 40}}>
         <TextInput
          style={styles.input}
          onChangeText={changeName}
          value={name}
          placeholder='Naam'
          placeholderTextColor='grey'
        />
        <TextInput
          style={styles.input}
          onChangeText={changeEmail}
          keyboardType="email-address"
          value={email}
          placeholder='E-mail'
          placeholderTextColor={'grey'}
        />
        <TextInput
          style={styles.input}
          onChangeText={changePassword}
          value={password}
          placeholder="Wachtwoord"
          placeholderTextColor={'grey'}
          secureTextEntry={true}
        />
      <TextInput
          style={styles.input}
          onChangeText={changeVPassword}
          value={vPassword}
          placeholder="Herhaal wachtwoord"
          placeholderTextColor={'grey'}
          secureTextEntry={true}
        />

        <Button title="Verstuur" onPress={register}></Button>
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
    setAuthToken, setUser, setOpinions
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { user, opinions } = state
  return { user, opinions }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);