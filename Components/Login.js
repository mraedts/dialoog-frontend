import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";


const LogInScreen = ({route, navigation}) => {
  
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const url = 'https://dialoog-backend.herokuapp.com/login';

  async function logIn() {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password,
          email: email
        })
      });

      const data = (await response.json())[0];
      if (data.authToken !== null) {
        navigation.navigate('Home');
      }

    } catch (err) {
      console.error(err)
    }

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

        <Button title="Verstuur" onPress={logIn}></Button>
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

export default LogInScreen;