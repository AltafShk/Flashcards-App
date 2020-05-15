import React, { Component, Fragment } from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import {connect} from 'react-redux'



function Deck ({title, noOfCards, navigation}){
    return (
        <TouchableOpacity 
        style = {styles.deck}
        onPress={() => {navigation.navigate('DeckView', {'id':title})}}
        >

            <Text
                style = {styles.text}>
                {title} 
            </Text>

            <Text
                style = {styles.smalltext}>
                {noOfCards} {noOfCards === 1 ? 'card' : 'cards'}   
            </Text>

        </TouchableOpacity>
    )
}


class HomeView extends Component {
    renderItem = ({item}) => {
        const {navigation} = this.props
        return <Deck {...item} navigation={navigation}/>
    }

    render() {
        const {decksList} = this.props
        
        return (
            <View style={styles.container}>
                <FlatList
                    data = {decksList}
                    renderItem = {this.renderItem}
                    keyExtractor = {(item, index) => (item.title)}
                />
            </View>

                
        );
    }
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151B1D',
      justifyContent: 'space-between',
    },
    deck: {
        backgroundColor: '#2e8b57',
        height: 150,
        borderRadius: 60,
        marginTop: 20
    },
    text:{
        color: 'white',
        fontSize: 28,
        marginBottom: 20,
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: 20
     },
     smalltext: {
        color: '#C2C5C5',
        fontSize: 20,
        marginBottom: 32,
        alignSelf: 'center',
        textAlign: 'center'
     }
  });
 






  
function mapStatetoProps(state){
    const decksTitles = Object.keys(state)
    const decksList = decksTitles.map((title) => {

    return {
        'title': state[title].title,
        'noOfCards': state[title].questions.length,
        }
    })

    return {
        decksList,
    }
}


export default connect(mapStatetoProps)(HomeView);