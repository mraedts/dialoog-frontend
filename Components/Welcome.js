import { Text, View, Button } from 'react-native';
import { useEffect } from 'react';

function Welcome({navigation}) {
    

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:50, fontWeight: 'bold', paddingBottom: 20}}>Dialoog</Text>
        <Button onPress={() => navigation.navigate('Log in')} style={{marginBottom: 20}} title="Log in"></Button>
        <Button onPress={() => navigation.navigate('Registreren')} style={{marginTop: 20}}title="Registreer"></Button>
      </View>
    );
}

export default Welcome;