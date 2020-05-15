import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import AddCard from './components/AddCard'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import {handleInitialData, getAllDecks} from './actions'
import CreateDeck from './components/CreateDeck'
import DeckView from './components/DeckView'
import HomeView from './components/HomeView'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeViewStack from './components/HomeViewStack'
import {setLocalNotification, NOTIFICATION_KEY} from './utils/helpers'
import {AsyncStorage} from 'react-native'


const store = createStore(reducer, middleware)




export default class App extends React.Component {

  componentDidMount(){
    store.dispatch(handleInitialData())
    store.dispatch(getAllDecks())

    setLocalNotification()    
  }

  render(){
  return (
    <Provider store={store}>

      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'FLASHCARDS APP', style: { color: 'white', fontSize: 20, paddingBottom: 30, fontWeight: 'bold',fontStyle:'italic' } }}
          containerStyle={styles.header}
        />

        <NavigationContainer>
          <HomeViewStack/>
        </NavigationContainer>
        

        </View>
    </Provider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  header:{
    backgroundColor: '#2e8b57',
    borderBottomWidth: 0,
    height: 60,
  }
});
