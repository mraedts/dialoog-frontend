import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Button } from "react-native";

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  return (
      <View style={{marginTop: 40}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          keyboardType="email-address"
          value={text}
          placeholder='E-mail'
          placeholderTextColor={'grey'}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Wachtwoord"
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