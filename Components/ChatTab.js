import { Text, View, FlatList, StyleSheet, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Message(time, text, fromSelf) {
  return {time: time, text: text, fromSelf: fromSelf}
}

function User(img, name, userId) {
   return {img: img, name: name, userId: userId}
}



/*
const Chats = [
  {
    user: User('./assets/person1.jpg', 'Jolanda', 1),
    messages: [
      Message(new Date(), "Lorem ipsum", false),
      Message(new Date(), "IUHSIUDHDSKJHDKJHSJKDHKJH", false),
    ],
    topic: "Genocide"
  },
  {
    user: User('./assets/person1.jpg', 'Hennie', 2),
    messages: [
      Message(new Date(), "JKBSDJKHDJKSHD", false),
      Message(new Date(), "Lorem ipsum", false),
    ],
    topic: "Rutte"
  }
]
*/

  

const _storeData = async () => {
  try {
    await AsyncStorage.setItem(
      '@Chats',
      JSON.stringify(Chats)
    );
    console.log('Saved data...')
  } catch (error) {
    console.log(error)
  }
};


const _readData = async () => {
  try {
    const data = await AsyncStorage.getItem('@Chats');
    
  } catch (error) {
    console.error(error);
  }
}


function ListItem({name, lastMessage, nav}) {
  useEffect(() => {
    console.log('from listitem: ')
    console.log(nav)
  })
  
  return (
    <View
      style={{
        flexDirection: "row",
        height: 90,
        paddingLeft:15,
        paddingRight: 15,
      }}
    >
      <View onTouchEnd={() => nav.navigate('UserChat')} style={{ backgroundColor: "blue", flex: 0.25, borderBottomColor: 'black',borderBottomWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/person1.jpg')} style={
          {width: '70%', height: undefined, aspectRatio: 1, borderRadius: 40, }} />
      </View>
      <View style={{ backgroundColor: "red", flex: 0.75, borderBottomColor: 'black',borderBottomWidth: 1 }} > 
        <Text style={{paddingBottom: 7, paddingTop: 5, paddingLeft: 5, fontSize: 15, fontWeight: 'bold'}}>{name}</Text>
        <Text onTouchEnd={_readData} style={{paddingLeft: 5, fontSize: 14, paddingRight: 40, }} numberOfLines={2}>{lastMessage}</Text>
      </View>
    </View>
  )
}

const ChatList = ({ chats, nav}) => {
  useEffect(() => {
    console.log("from chatlist:")
    console.log(nav)
    
  })
  

  const renderItem = ({ item }) => (
    <ListItem name={item.user.name} lastMessage={item.messages[0].text} nav={nav} />
  );


  return (
      <FlatList
        style={styles.list}
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item.user.userId}
        nav={nav}
        
      />
  );
}

function ChatTab({navigation}) {
  const [chats, setChats] = useState();

  const readChats = async () => {
    try {
      const str = await AsyncStorage.getItem('@Chats');
      const json = await JSON.parse(str);
      setChats(json);
    } catch (error) {
      console.error(error);
    }
  }

  // Empty dependency array to prevent from firing infinitely
  useEffect(async () => {
    readChats();
    console.log(navigation)
  }, [])

  return (
    <ChatList chats={chats}  nav={navigation} />
  )
}

const styles = StyleSheet.create({
  list: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'pink'
  },
  listItem: {
    backgroundColor: 'beige',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default ChatTab;
