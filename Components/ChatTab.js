import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';


function Message(time, text, fromSelf) {
  return { time: time, text: text, fromSelf: fromSelf };
}

function User(img, name, userId) {
  return { img: img, name: name, userId: userId };
}




const Chats = [
  {
    user: User('../../../../assets/person1.jpg', 'Jolanda', 1),
    messages: [
      Message(new Date(), "Lorem ipsum", false),
      Message(new Date(), "IUHSIUDHDSKJHDKJHSJKDHKJH", false),
      Message(new Date(), "Ok Jolanda", true),
    ],
    topic: "Genocide"
  },
  {
    user: User('../assets/person1.jpg', 'Hennie', 2),
    messages: [
      Message(new Date(), "JKBSDJKHDJKSHD", false),
      Message(new Date(), "Lorem ipsum", false),
      Message(new Date(), "Ok Hennie", true),
    ],
    topic: "Rutte"
  },
  
]


  
const _storeData = async () => {
  try {
    await AsyncStorage.setItem('@Chats', JSON.stringify(Chats));
    console.log('Saved data...');
  } catch (error) {
    console.log(error);
  }
};

const _readData = async () => {
  try {
    const data = await AsyncStorage.getItem('@Chats');
  } catch (error) {
    console.error(error);
  }
};

function ListItem({ name, messages, nav }) {
  useEffect(() => {
    console.log('from listitem: ');
    console.log(nav);
  });

  return (
    <View
    onTouchEnd={() => nav.navigate('UserChat', {messages:messages, name: name, })}
    options={{ title: 'My home' }}
      style={{
        flexDirection: 'row',
        height: 90,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <View
        
        style={{
          flex: 0.25,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/person1.jpg')}
          style={{
            width: '70%',
            height: undefined,
            aspectRatio: 1,
            borderRadius: 40,
          }}
        />
      </View>
      <View
        style={{
          
          flex: 0.75,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            paddingBottom: 7,
            paddingTop: 10,
            paddingLeft: 5,
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          {name}
        </Text>
        <Text
          onPress={_readData}
          style={{ paddingLeft: 5, fontSize: 14, paddingRight: 40 }}
          numberOfLines={2}
        >
          {messages[messages.length-1].text}
        </Text>
      </View>
    </View>
  );
}

const ChatList = ({ chats, nav }) => {
  useEffect(() => {
    console.log('from chatlist:');
    console.log(nav);
  });

  const renderItem = ({ item }) => (
    <ListItem
      name={item.user.name}
      messages={item.messages}
      nav={nav}
    />
  );

  return (
    <FlatList
      style={styles.list}
      data={chats}
      renderItem={renderItem}
      keyExtractor={(item) => item.user.userId}
      nav={nav}
    />
  );
};

function ChatTab({ navigation }) {
  const [chats, setChats] = useState();
  useEffect(() => {_storeData()})
  
  const readChats = async () => {
    try {
      const str = await AsyncStorage.getItem('@Chats');
      const json = await JSON.parse(str);
      setChats(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Empty dependency array to prevent from firing infinitely
  useEffect(async () => {
    readChats();
  }, []);

  return <ChatList chats={chats} nav={navigation} />;
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white'
  },
  listItem: {
    backgroundColor: 'beige',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default ChatTab;
