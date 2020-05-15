import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import {removeDeck} from '../actions/index'

class DeckView extends Component {

    deleteDeck = () => {
        const {deck, navigation, dispatch} = this.props
        const {title} = deck

        dispatch(removeDeck(title))
        

    }

    render() {

        

        const {deck, navigation} = this.props

        if(!deck){
            navigation.navigate('DeckList') 
            return(
            <View style={styles.container}>                    

            </View>)  
        }

        return (
            <View style={styles.container}>

                <View>
                    <Text
                    style = {styles.text}>
                        {deck.title}
                    </Text>

                    <Text
                    style = {styles.smalltext}>
                        {deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}   
                    </Text>

                </View>

                <View>
                    <TouchableOpacity
                        style = {styles.submitBtn}
                        onPress = {() => {navigation.navigate('AddCard', {'title': deck.title})}}>
                        <Text style = {styles.submitBtnText}> Add Card </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.submitBtn}
                        onPress = {() => navigation.navigate('Quiz', {'deck': deck})}>
                        <Text style = {styles.submitBtnText}> Start Quiz </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress = {this.deleteDeck}>
                    <Text
                    style = {[styles.text, {color: '#DF301F', fontSize: 24, marginTop: 20}]}>
                        Delete Deck 
                    </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151B1D',
      justifyContent: 'space-around',
    },
    textinput:{
        backgroundColor: '#CFDDE1',
        margin: 15,
        height: 40,
        borderColor: '#2e8b57',
        borderWidth: 1,
        borderRadius: 15,
        textShadowRadius: 15,
        textDecorationColor: '#000',
        paddingLeft: 10
     },
    submitBtn:{
        backgroundColor: '#2e8b57',
        padding: 10,
        margin: 15,
        height: 40,
        width: 250,
        alignSelf:'center',
        borderRadius: 15
    },
    submitBtnText:{
        color: 'white',
        textAlign:'center',
     },
     text:{
        color: 'white',
        fontSize: 32,
        marginBottom: 20,
        textAlign: 'center'
     },
     smalltext: {
        color: '#C2C5C5',
        fontSize: 20,
        marginBottom: 32,
        textAlign: 'center'
     }
  });
  

function mapStatetoProps(state, props){
    if (props.route.params.id){
    const id = props.route.params.id
    const deck = state[id]

    return{
        deck,
    }
}
}


export default connect(mapStatetoProps)(DeckView);