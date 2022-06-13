import React, { useState, useFocusEffect } from 'react'
import styled from 'styled-components'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import {setUser, setImg} from '../actions/user'
import * as api from "../api";
import {bindActionCreators} from 'redux'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import {manipulateAsync} from 'expo-image-manipulator'



function ProfileSettingsScreen({user, setUser, setImg}) {
    const [name, setName] = useState(user.name);
    const [image, setImage] = useState('../assets/person1.jpg');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0,
          base64: true,
        });
    
        if (!result.cancelled) {
          setImage(result);
        }
        uploadImage();
    };

    const uploadImage = async () => {
        const resizedImage = await ImageManipulator.manipulateAsync(image.uri, [{resize: {width: 160}}], {base64: true, compress: 0});
        const response = await api.uploadImage(user.id, user.authToken, resizedImage.base64);
        if (response.statusCode !== 200) {
            console.log('Error occurred while trying to upload image!')
        } else {
            setImg(resizedImage.uri);
        }
    };  


    const updateUsername = async () => {
        const response = await api.updateUser(user.id, name, user.email, user.authToken, user.acceptingMatches);
        if (response.statusCode !== 200) {
            console.log('Error occurred while trying to update username!')
        } else {
            setName(name);
        }
    };

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity onPress={pickImage}>
                <Image
                    style={{width: 80, height: 80, aspectRatio: 1, borderRadius: 40, marginTop: 100}}
                    source={{uri: user.image}}
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
      setUser, setImg
    }, dispatch)
  );
  
  const mapStateToProps = (state) => {
    const { user } = state
    return { user }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsScreen);