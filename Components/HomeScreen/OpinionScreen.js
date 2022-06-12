import { Text, View, StyleSheet, StatusBar,  FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { getOpinions } from '../../api';
import Item from '../OpinionListItem'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setOpinions} from '../../actions/opinions'
import {useEffect} from 'react'




const OpinionScreen = ({user, opinions}) => {

  useEffect(()=> {
    console.log('from opinionScreen: ')
    console.log(opinions)
  })
  const renderItem = ({ item }) => (
    <Item title={item.title} statementText={item.statement} answer={item.answer} statementId={item.statementid}  />
  );

  return (
      <FlatList
        data={opinions}
        renderItem={renderItem}
        keyExtractor={item => undefined}
      />
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
      setOpinions
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OpinionScreen);

