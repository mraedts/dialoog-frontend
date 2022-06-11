import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { setAuthToken, setUser } from "../actions/user";
import {registerAndLogin } from "../api";

const Register = ({user, setUser}) => {
  const [name, changeName] = React.useState("");
  const [email, changeEmail] = React.useState("");
  const [password, changePassword] = React.useState("");
  const [vPassword, changeVPassword] = React.useState("");

  async function register() {
    const userInfo = await registerAndLogin(name, email, password)
    console.log('from register(): ')
    console.log(userInfo)

    setUser({
      name: userInfo.name,
      authToken: userInfo.authtoken
    })
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
    setAuthToken, setUser
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);


