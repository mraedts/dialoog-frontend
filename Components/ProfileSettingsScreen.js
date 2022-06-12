import React, { useState, useFocusEffect } from 'react'
import styled from 'styled-components'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import {setUser} from '../actions/user'
import * as api from "../api";
import {bindActionCreators} from 'redux'


function ProfileSettingsScreen({user, setUser}) {
    const [name, setName] = useState(user.name);
    async function changeName() {
        //const data = await api.updateUser(user.id, user.name, user.email, user.authToken, user.acceptingMatches);
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity>
                <Image
                    style={{width: 80, height: 80, aspectRatio: 1, borderRadius: 40, marginTop: 100}}
                    source={require('../assets/person1.jpg')}
                />
            </TouchableOpacity>
            <Icon
                name= 'edit'
                style={{width: 22, height: 22,  aspectRatio: 1, borderRadius: 40, marginRight: 10}}
            />
            <TextInput
                style={{height: 40, margin: 30, borderWidth: 1, padding: 10, width: '80%'}}
                onChangeText={setName}
                value={name}
                placeholder='Naam'
                placeholderTextColor='grey'
            />
        </View>
       )
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      setUser
    }, dispatch)
  );
  
  const mapStateToProps = (state) => {
    const { user } = state
    return { user }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsScreen);