import { Text, View, Image, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity, Switch } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser, logOut, deleteUser, setAcceptingMatches} from '../../actions/user'
import { deleteChats } from '../../actions/chats';
import { deleteOpinions } from '../../actions/opinions';
import { Icon } from 'react-native-elements'
import {useState} from 'react'
import * as api from '../../api'
import {} from '../../actions/user'
import DialogInput from 'react-native-dialog-input'



function SettingsScreen({setUser, user, logOut, navigation, setAcceptingMatches,deleteChats, deleteOpinions }) {
    const [isEnabled, setIsEnabled] = useState(false);
    //const [visible, setVisible] = useState(false);
    const toggleSwitch = () =>  {
        setAcceptingMatches(!user.acceptingMatches)
        sendMatchingAvailability(!user.acceptingMatches);
        console.log({user})
        //setIsEnabled(previousState => !previousState);
    }

    async function deleteAccount() {
        console.log(user)
        const response = await api.deleteUser(user.id, user.authToken);
        console.log(response);
        if (response.statusCode !== 200) {
            console.log('Error occurred while trying to delete account!')
        } else {
            console.log('Deleted user from state!')
            deleteOpinions();
            setUser({});
            deleteChats();
        }
    }
    
    const createTwoButtonAlert = () => {
        console.log('ran twobuttonalert')
        return Alert.alert(
        "Account verwijderen",
        "Weet je het zeker? Dit is permanent.",
        [
            {
            text: "Annuleer",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            {
              text: "Verwijder",
              onPress: () => deleteAccount(),
              style: "destructive"
            }
        ]
        )
    };

    async function sendMatchingAvailability(acceptingMatches) {
        console.log(user)
        const data = await api.updateUser(user.id,user.name,user.email,user.authToken,acceptingMatches);
        console.log(data);
    }
/*
    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };
*/


    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <TouchableOpacity style={styles.groupContainer} onPress={() => navigation.navigate('Profiel Aanpassen')}>
                <Image source={require('../../assets/person1.jpg')} style={{width: 50, height: 50,  
            
            aspectRatio: 1,
            borderRadius: 40,}}></Image>
                <Text style={{marginLeft: 10, fontSize: 20}}>{user.name}</Text>
            </TouchableOpacity>

            <View style={[styles.groupContainer, {marginTop: 50, flexDirection: 'column'}]}>
           
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <Icon name= 'connect-without-contact' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10, marginTop: 5}}></Icon>
                    <Text style={{marginTop: 5}}>Match mij op achtergrond</Text>
                    <Switch
                        trackColor={{ false: "lightgrey", true: "lightblue" }}
                        thumbColor={isEnabled ? "lightgrey" : "#f4f3f4"}
                        style={{marginTop: -12, height: 20, marginLeft: 10, marginTop : 6}}
                        onValueChange={toggleSwitch}
                        value={user.acceptingMatches}
                    />
                </View>
            </View>

            <View style={[styles.groupContainer, {marginTop: 50, flexDirection: 'column'}]}>
                <TouchableOpacity style={{flexDirection: 'row', marginBottom: 10}} /*onPress={showDialog}*/>
                    <Icon name= 'alternate-email' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
                    <Text>Verander e-mailadres</Text>
                </TouchableOpacity>
                {/*}
                <DialogInput isDialogVisible={visible}
                    title={"DialogInput 1"}
                    message={"Message for DialogInput #1"}
                    hintInput ={"HINT INPUT"}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.showDialog(false)}}>
                </DialogInput>
                */}
                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1}}></View>

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}>
                <Icon name= 'vpn-key' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
                    <Text>Verander wachtwoord</Text>
                </TouchableOpacity>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 10}}></View>

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}>
                <Icon name= 'notifications' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
                    <Text>Notificaties</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.groupContainer, {marginTop: 50, flexDirection: 'column'}]} >
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {
                    logOut()
                    console.log(user)
                    }} >
                <Icon name= 'logout' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
                    <Text>Uitloggen</Text>
                </TouchableOpacity>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 10}}></View>
                <View >
                    <TouchableOpacity style={{flexDirection: 'row',  marginTop: 10}} onPress={createTwoButtonAlert}>
                        <Icon name= 'delete' color={'red'} style={{ width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10, marginTop: -2}}></Icon>
                        <Text style={{color: 'red'}}>Verwijder account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    groupContainer: {
        borderColor: 'grey', borderWidth: 1, flexDirection: 'row', backgroundColor: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10
    }
})

const mapStateToProps = (state) => {
    const { user, chats } = state
    return { user, chats }
};
  
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser, logOut, setAcceptingMatches, deleteChats, deleteUser, deleteOpinions
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

