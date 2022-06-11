import { Text, View, Image, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser, logOut} from '../../actions/user'
import { Icon } from 'react-native-elements'


function SettingsScreen({setUser, user, logOut}) {

    const createTwoButtonAlert = () => {
        console.log('ran twobuttonalert')
        return Alert.alert(
        "Doe het niet",
        "alsjeblieft karen",
        [
            {
            text: "ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "ik doe het toch", onPress: () => console.log("OK Pressed") }
        ]
        
        )
};

    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <TouchableOpacity style={styles.groupContainer}>
                <Image source={require('../../assets/person1.jpg')} style={{width: 50, height: 50,  
            
            aspectRatio: 1,
            borderRadius: 40,}}></Image>
                <Text style={{marginLeft: 10, fontSize: 20}}>{user.name}</Text>
            </TouchableOpacity>

            <View style={[styles.groupContainer, {marginTop: 50, flexDirection: 'column'}]}>
                <TouchableOpacity style={{flexDirection: 'row', marginBottom: 10}}>
                    <Icon name= 'alternate-email' style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
                    <Text>Verander e-mailadres</Text>
                </TouchableOpacity>

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
                        <Icon name= 'delete' color={'red'} style={{ width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Icon>
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
        setUser, logOut
    }, dispatch)
);

  
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

