import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { setUser, setAuthToken } from "../actions/user";
import {setOpinions} from '../actions/opinions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logIn } from "../api";


const LogInScreen = ({route, navigation, setUser, setOpinions, opinions}) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const url = 'https://dialoog-backend.herokuapp.com/login';

  async function getLogin() {
    const userInfo = await logIn(email, password);
    console.log('userInfo:')
    console.log(userInfo);
    
    setUser({
      name: userInfo.name,
      authToken: userInfo.authtoken,
      id: userInfo.userid
    })

    setOpinions(userInfo.answers)
    console.log(setOpinions)
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
    setAuthToken, setUser, setOpinions
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);