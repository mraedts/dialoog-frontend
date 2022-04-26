import {Text, View} from 'react-native';


// <Image source={require('./my-icon.png')} />



const data = [
    {
        name: 'Jolanda',
        lastText: 'Elon musk moet wilders en trump unbannen op twitter.',
        imageUrl: './assets/person1.png' 

    }
]

function ChatScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
}

export default ChatScreen;