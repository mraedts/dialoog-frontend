import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Button } from "react-native";

const UselessTextInput = () => {
  const [name, changeName] = React.useState("");
  const [email, changeEmail] = React.useState("");
  const [password, changePassword] = React.useState("");
  const [vPassword, changeVPassword] = React.useState("");

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

        <Button title="Verstuur"></Button>
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

export default UselessTextInput;