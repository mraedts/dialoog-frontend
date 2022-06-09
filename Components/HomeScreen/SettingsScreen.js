import { Text, View, Image, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';


function SettingsScreen() {

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
                <Text style={{marginLeft: 10}}>Username</Text>
            </TouchableOpacity>

            <View style={[styles.groupContainer, {marginTop: 50, flexDirection: 'column'}]}>
                <TouchableOpacity style={{flexDirection: 'row', marginBottom: 10}}>
                    <Image source={require('../../assets/person1.jpg')} style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Image>
                    <Text>Verander e-mailadres</Text>
                </TouchableOpacity>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1}}></View>

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}>
                    <Image source={require('../../assets/person1.jpg')} style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Image>
                    <Text>Verander wachtwoord</Text>
                </TouchableOpacity>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 10}}></View>


                <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}>
                    <Image source={require('../../assets/person1.jpg')} style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Image>
                    <Text>Notificaties</Text>
                </TouchableOpacity>

            
            </View>

            <TouchableOpacity style={[styles.groupContainer, {marginTop: 50, flexDirection: 'column'}]} onPress={createTwoButtonAlert}>
                <View style={{flexDirection: 'row'}} >
                    <Image onPress={createTwoButtonAlert} source={require('../../assets/person1.jpg')} style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40,marginRight: 10}}></Image>
                    <Text>Verwijder account 💩</Text>
                </View>
            </TouchableOpacity>



            
        </View>
    );
}

const styles = StyleSheet.create({
    groupContainer: {
        borderColor: 'grey', borderWidth: 1, flexDirection: 'row', backgroundColor: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10
    }
})



export default SettingsScreen;