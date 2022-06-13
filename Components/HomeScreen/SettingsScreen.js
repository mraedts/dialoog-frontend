import { Text, View, Image, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity, Switch } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser, logOut, deleteUser, setAcceptingMatches} from '../../actions/user'
import { deleteChats } from '../../actions/chats';
import { deleteOpinions, setOpinions } from '../../actions/opinions';
import { Icon } from 'react-native-elements'
import {useState} from 'react'
import * as api from '../../api'
import {} from '../../actions/user'
import DialogInput from 'react-native-dialog-input'
import { setSubscription } from '../../actions/subscription';
import * as Notifications from 'expo-notifications'


function SettingsScreen({setUser, user, logOut, navigation, setAcceptingMatches, deleteChats, deleteOpinions, subscription }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [emailPopupVisible, setEmailPopupVisible] = useState(false);
    const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);
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
            console.log({user})
            //Notifications.removeNotificationSubscription(user.notificationListener)
            deleteOpinions();
            setUser({});
            deleteChats();
        }r
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

    const showEmailPopup = () => {
        setEmailPopupVisible(true);
    };

    const showPasswordPopup = () => {
        setPasswordPopupVisible(true);
    };

    const handleCancel = () => {
        setEmailPopupVisible(false);
        setPasswordPopupVisible(false);
    };

    const updateEmail = async (inputText) => {
        let newEmail = inputText.toLowerCase();
        const response = await api.updateUser(user.id, user.name, newEmail, user.authToken, user.acceptingMatches);
        //TODO: update state
        if (response.statusCode !== 200) {
            console.log('Error occurred while trying to update email!')
        } else {
            console.log(user);
            setUser({
                name: user.name,
                authToken: user.authToken,
                id: user.id,
                acceptingMatches: user.acceptingMatches,
                email: newEmail,
                expoToken: user.expoToken
              })
        }
        setEmailPopupVisible(false);
    };

    const updatePassword = async (inputText) => {
        const data = await api.updatePassword(user.id, user.authToken, inputText);
        setPasswordPopupVisible(false);
    };

    function popUpTextInput (title, message, placeholder, submitInput, keyboardType) {
        return (
            <DialogInput isDialogVisible={true}
                title={title}
                message={message}
                hintInput ={placeholder}
                submitInput={submitInput}
                closeDialog={handleCancel}
                cancelText={"Annuleer"}
                submitText={"OK"}
                textInputProp={{keyboardType: keyboardType}}
                dialogStyle={{marginBottom: 150}}>
            </DialogInput>);
    }

    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <TouchableOpacity style={styles.groupContainer} onPress={() => navigation.navigate('Profiel Aanpassen')}>
                <Image source={{uri: user.image}} style={{width: 50, height: 50,  
            
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
                <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10}} onPress={showEmailPopup}>
                    <Icon name= 'alternate-email' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
                    <Text>Verander e-mailadres</Text>
                </TouchableOpacity>
                {emailPopupVisible ? popUpTextInput("Verander e-mail", `Huidig e-mailadres: ${user.email}`, "nieuwe@email.nl", updateEmail, "email-address") : null}
                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1}}></View>

                <TouchableOpacity style={{flexDirection: 'row', paddingTop: 10}} onPress={showPasswordPopup}>
                <Icon name= 'vpn-key' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
                    <Text>Verander wachtwoord</Text>
                </TouchableOpacity>
                {passwordPopupVisible ? popUpTextInput("Verander wachtwoord", "", "Nieuw wachtwoord", updatePassword, "") : null}
                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 10}}></View>

                <TouchableOpacity style={{flexDirection: 'row', paddingTop: 10}}>
                <Icon name= 'notifications' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
                    <Text>Notificaties</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.groupContainer, {marginTop: 50, flexDirection: 'column'}]} >
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {
                    Notifications.removeNotificationSubscription(subscription)
                    //console.log(user)
                    api.updateUser(user.id,user.name,user.email.toLowerCase(), user.authToken, user.acceptingMatches, 'LOGGED_OUT')
                    console.log(subscription)
                    setUser({justLoggedOut: true})
                    deleteOpinions()
                    deleteChats()
                    //console.log(user)
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
    const { user, chats, subscription } = state
    return { user, chats, subscription }
};
  
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser, logOut, setAcceptingMatches, deleteChats, deleteUser, deleteOpinions, setSubscription, 
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

