import { Text, View, FlatList, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function ListItem({ name, messages, nav, topic, userId}) {


  return (
    <View
    onTouchEnd={() => nav.navigate('UserChat', {messages, name,  userId})}
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
          
          style={{ paddingLeft: 5, fontSize: 14, paddingRight: 40 }}
          numberOfLines={2}
        >
          {messages.length === 0 ? '':messages[messages.length-1].text}
        </Text>
      </View>
    </View>
  );
}

const ChatList = ({ chats, nav}) => {
  
  

  const renderItem = ({ item }) => (
    <ListItem
      name={item.user.name}
      messages={item.messages}
      nav={nav}
      topic={item.topic}
      userId={item.user.userId}
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

function ChatTab({ navigation, friends, user, chats }) {
 
  useEffect(() => {
    console.log({chats})
  })

  function decrementCount() {
    let { count, actions } = props;
    count--;
    actions.changeCount(count);r
  }
  function incrementCount() {
    let { count, actions } = props;
    count++;
    actions.changeCount(count);
  }

  
  
  

  // Empty dependency array to prevent from firing infinitely
 

  return <ChatList chats={chats} nav={navigation}  />;
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

const mapStateToProps = (state) => {
  const { friends, user, chats } = state
  return { friends, user, chats }
};

export default connect(mapStateToProps)(ChatTab);

