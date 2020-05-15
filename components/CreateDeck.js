import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import {addNewDeck} from '../actions'
import {formatDeckTitle} from '../utils/helpers'

class CreateDeck extends Component {

    state = {
        title: ''
    }

    handleDeckName = (text) => {
        this.setState({title: text})
    }

    submitPress = () => {
        const {dispatch, navigation} = this.props
        const {title} = this.state
        const formattedTitle = formatDeckTitle(title)

        if(title !== ""){
            this.setState({title:''})
            dispatch(addNewDeck(formattedTitle))
            navigation.navigate('Decks')
        }
        else{
            alert("Please write a valid name for the deck before submitting")
        }
    }


    render() {
        return (
            <View style={styles.container}>

                
                <View>
                    <Text
                    style = {styles.text}>
                        What is the title of your new deck?
                    </Text>

                    <TextInput 
                    style = {styles.textinput}
                    placeholder={'Deck name?'}
                    placeholderTextColor ={'#5A676A'}
                    value ={this.state.title}
                    onChangeText = {this.handleDeckName}
                    />
                </View>

                <TouchableOpacity
                    style = {styles.submitBtn}
                    onPress = {this.submitPress}>
                    <Text style = {styles.submitBtnText}> Add Deck </Text>
                </TouchableOpacity>

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
        margin: 15,
        padding: 10,
        fontSize: 20,
        marginBottom: 32,
        alignSelf: 'center'
     }
  });
  


export default connect()(CreateDeck);