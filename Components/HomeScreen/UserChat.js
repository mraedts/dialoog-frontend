import * as React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { useEffect } from 'react';

export default function UserChat({route, navigation}) {
  const { messages, name } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name
    })
  },[])

  return (
    <SafeAreaView >
      <MessageList messages={messages}/>
    </SafeAreaView>
  );
}

function Message({text, fromSelf}) {
 
  const alignSelf = fromSelf ? 'flex-end' : 'flex-start';
  const marginLeft = fromSelf ? 0 : 9;
  const marginRight = fromSelf ? 9 : 0;
  const backgroundColor = fromSelf ? '#34a4eb' : 'lightgrey';
  const textColor = fromSelf ? 'white' : 'black';

  return (
    <View style={[{ marginTop: 5, borderRadius: 10, maxWidth : '60%', padding: 8}, {alignSelf: alignSelf, marginLeft: marginLeft, marginRight: marginRight, backgroundColor:backgroundColor}]}>
         <Text style={{color: textColor, fontSize: 17 }}>{text}</Text>
    </View>
  )
}

function MessageList({messages}) {
  const renderItem = ({ item }) => {
  
    return (
      <Message text={item.text} fromSelf={item.fromSelf}/> 
    );
  };

  return (
    <View style={{display: 'flex', flexDirection: 'column', backgroundColor: 'purple', height: '100%', }}>
      <FlatList
        style={{height: '80%', backgroundColor: 'cyan'}}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.text}
      />
      <View  style={styles.input}><TextInput></TextInput></View>
    </View>

    
  );

}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'pink',
  },
});


