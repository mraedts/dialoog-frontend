import * as React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput
} from "react-native";
import { useEffect, useState} from "react";
import { Icon } from "react-native-elements";
import { bindActionCreators } from "redux";
import { addMessageToChat } from "../../actions/chats";
import { connect } from "react-redux";
import * as api from '../../api'

function UserChat({ route, navigation, addMessageToChat, user, chats}) {
  const { messages, name, topic, userId } = route.params;
  

  const [text, setText] = useState('')

  async function handleSendPress() {
    if (text.length < 1) {
      return;
    }
   
    addMessageToChat({
      userId,
      message: {
        time: new Date(),
        text: text,
        fromSelf: true,
      },
    });
    
    const data = await api.sendMessage(userId, user.id, text, user.authToken);
    setText('');
  }
  
  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  useEffect(() => {}, []);

  const renderItem = ({ item }) => {
    return <Message text={item.text} fromSelf={item.fromSelf} />;
  };

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        style={{ backgroundColor: "white" }}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
        ListHeaderComponent={<FlatList_Header topic={topic} name={name} />}
      />

      <View style={{ flexDirection: "row" }}>
        <View style={[styles.input, { flex: 1, borderRadius: 40 }]}>
          <TextInput style={{ flex: 1 }} onChangeText={setText}
          value={text}></TextInput>
        </View>
        <Icon
          name="send"
          type={"feather"}
          style={{ marginTop: 10, marginRight: 10}}
          
          onPress={() =>

            handleSendPress()
          }
        />
      </View>
    </View>
  );
}

function Message({ text, fromSelf }) {
  const alignSelf = fromSelf ? "flex-end" : "flex-start";
  const marginLeft = fromSelf ? 0 : 9;
  const marginRight = fromSelf ? 9 : 0;
  const backgroundColor = fromSelf ? "#34a4eb" : "#d3d3d3";
  const textColor = fromSelf ? "white" : "black";

  return (
    <View
      style={[
        { marginTop: 5, borderRadius: 10, maxWidth: "60%", padding: 8 },
        {
          alignSelf: alignSelf,
          marginLeft: marginLeft,
          marginRight: marginRight,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Text style={{ color: textColor, fontSize: 17 }}>{text}</Text>
    </View>
  );
}

const FlatList_Header = ({ topic, name }) => {
  return (
    <View
      style={{
        width: "100%",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 15,
          color: "black",
          textAlign: "center",
          paddingRight: 40,
          paddingLeft: 40,
          marginTop: 5,
        }}
      >
        Je bent gematcht met {name} gebaseerd op de stelling: "{topic}"
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 10,
    marginTop: 6,
    marginBottom: 6,
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addMessageToChat,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const { chats , user} = state;
  return { chats, user };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChat);
