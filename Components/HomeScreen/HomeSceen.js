import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatTab from '../ChatTab';
import OpinionScreen from './OpinionScreen';
import SettingsScreen from './SettingsScreen';
import {View, Button} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthToken } from '../../actions/user';
import { createNewChat } from '../../actions/chats';
import * as api from '../../api'
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator();


function HomeScreen({chats, user, createNewChat, opinions,  }) {
    async function getMatch() {
     
      const data = await api.getMatch(user.id, user.authToken);
      console.log('data: ')
      console.log(data)
  
      
      const userResponse = await api.getUserInfo(data[0].userid2);

     console.log({statementId: data[0].statementid})
     
    let topic;

      opinions.forEach(op => {
        if (op.statementid === data[0].statementid) topic = op.statement;
      })

      console.log({topic})
      
      createNewChat({img: '../assets/person1.jpg', topic, name: userResponse.name, userId: data[0].userid2 })
      
      console.log('chats from NIEUW GESPREK')
      console.log(chats)
      console.log('data:')
      console.log(data[0])
      



    }

    

    const showToast = () => {
      ToastAndroid.show("Iedereen is het met je eens! We kunnen niemand met je matchen.", ToastAndroid.LONG)
    };

    return (
        <Tab.Navigator>
          <Tab.Screen name="Gesprekken" component={ChatTab} chats={chats} options={{headerRight: () => (
            <View style={{marginRight:10 , marginTop: 0}}>
                <Button
                title="Nieuw Gesprek"
                type="clear"
                onPress={getMatch}
                />
            </View>
          ),
          tabBarIcon: ({size, color}) => (<Icon name={"chat"} color={color} size={size} />)
          }} />
          <Tab.Screen name="Meningen" component={OpinionScreen} options={{
            tabBarIcon: ({size, color}) => (<Icon name={"tune"} color={color} size={size} />)
          }} />
          <Tab.Screen name="Instellingen" component={SettingsScreen} options={{
            tabBarIcon: ({size, color}) => (<Icon name={"settings"} color={color} size={size} />)
          }} />
        </Tab.Navigator>
    );
  }

  const mapStateToProps = (state) => {
    const {  user, chats, opinions } = state
    return { user, chats, opinions }
  };
  

 

  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      
        createNewChat
    }, dispatch)
  );
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);