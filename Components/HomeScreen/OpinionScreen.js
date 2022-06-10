import { Text, View, StyleSheet, StatusBar,  FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

//@TODO:
// - fetch opinions at component render
// - make api call to change opinion




const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Nederland moet meer investeren in defensie.',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'De basisbeurs moet worden verhoogd naar 500 euro per maand.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'myaes',
  },
  
];

function Item({ id, title}) {
  const [pressed, setPressed] = useState(-1);
  
  
  async function changeOpinion(pressed) {
    // call api
    console.log(pressed);

    setPressed(pressed)
    console.log(pressed)
  }

  
  const getButColor = butIndex => pressed === butIndex ? 'black' : 'white';

  

  return (
      <View style={{flex: 0.75,borderBottomColor: 'grey', borderBottomWidth: 1, alignItems: 'center',marginLeft: 15, marginRight: 15}}>
        <Text style={{padding: 20, textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{title} </Text>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
          <TouchableOpacity onPress={() => {changeOpinion(0)}} style={[styles.roundButton1, {backgroundColor: getButColor(0)}]} activeOpacity={1} />
          <TouchableOpacity onPress={() => {changeOpinion(1)}} style={[styles.roundButton1, {backgroundColor: getButColor(1)}]} activeOpacity={1}/>
          <TouchableOpacity onPress={() => {changeOpinion(2)}} style={[styles.roundButton1, {backgroundColor: getButColor(2)}]} activeOpacity={1}/>
          <TouchableOpacity onPress={() => {changeOpinion(3)}} style={[styles.roundButton1, {backgroundColor: getButColor(3)}]} activeOpacity={1}/>
          <TouchableOpacity onPress={() => {changeOpinion(4)}} style={[styles.roundButton1, {backgroundColor: getButColor(4)}]} activeOpacity={1}/>
        </View>
      </View>
      );
}

const OpinionScreen = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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

export default OpinionScreen;