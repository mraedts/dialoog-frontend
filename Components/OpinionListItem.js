import { Text, View, StyleSheet, StatusBar,  FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { changeOpinion } from '../api';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {modifyOpinion} from '../actions/opinions'
import {useEffect} from 'react'

function Item({ answer, statementText, statementId, user, opinions, modifyOpinion}) {
    
    async function myChangeOpinion(n) {
        const currentAnswer = answer;
      
      console.log(opinions)
  
      console.log('statementid: ' + statementId)

      modifyOpinion({answer: n+1, statement: statementText, statementid: statementId})

      const data = await changeOpinion(user.id, user.authToken, statementId, n+1);

      if (data.message !== "OK") {
        // Don't go through with state change if request wasn't processed
        modifyOpinion({answer: oldAnswer+1, statement: statementText, statementid: statementId})

      }

      
      
    }
  

    const getButColor = butIndex => answer - 1 === butIndex ? 'black' : 'white';
  
    return (
        <View style={{flex: 0.75,borderBottomColor: 'grey', borderBottomWidth: 1, alignItems: 'center',marginLeft: 15, marginRight: 15}}>
          <Text style={{padding: 20, textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{statementText} </Text>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
            <TouchableOpacity onPress={() => {myChangeOpinion(0)}} style={[styles.roundButton1, {backgroundColor: getButColor(0)}]} activeOpacity={1} />
            <TouchableOpacity onPress={() => {myChangeOpinion(1)}} style={[styles.roundButton1, {backgroundColor: getButColor(1)}]} activeOpacity={1}/>
            <TouchableOpacity onPress={() => {myChangeOpinion(2)}} style={[styles.roundButton1, {backgroundColor: getButColor(2)}]} activeOpacity={1}/>
            <TouchableOpacity onPress={() => {myChangeOpinion(3)}} style={[styles.roundButton1, {backgroundColor: getButColor(3)}]} activeOpacity={1}/>
            <TouchableOpacity onPress={() => {myChangeOpinion(4)}} style={[styles.roundButton1, {backgroundColor: getButColor(4)}]} activeOpacity={1}/>
          </View>
        </View>
        );
}
  




const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 40,
    },
    roundButton1: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      margin: 8,
      borderRadius: 100,
      
      borderColor: 'grey',
      borderWidth: 1
    }
  });

  const mapStateToProps = (state) => {
    const { user, chats, opinions } = state
    return { user, chats, opinions }
};
  



const mapDispatchToProps = dispatch => (
    bindActionCreators({
        modifyOpinion
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(Item);
