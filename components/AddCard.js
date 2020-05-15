import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
import {addNewCard} from '../actions'

class AddCard extends Component {

    state = {
        question : "",
        answer : ""
    }

    handleInputQuestion = (text) => {
        this.setState({question: text})
    }

    handleInputAnswer = (text) => {
        this.setState({answer: text})
    }


    submitPress = () => {
        const {dispatch, navigation, route} = this.props
        const {question, answer} = this.state
        const card = {question, answer}
        const {title} = route.params

        if (question !== "" && answer !== ""){

            dispatch(addNewCard(title, card )) 
            navigation.navigate('DeckView', {'id':title})
        }
        else{
            alert("Please fill both above text fields before pressing submit")
        }
    }

    render() {
        (this.props.route.params.title)

        return (
            <View style={styles.container}>

                <View>
                    <TextInput 
                    style = {styles.textinput}
                    placeholder={'Write your question here'}
                    placeholderTextColor ={'#5A676A'}
                    value ={this.state.question}
                    onChangeText = {this.handleInputQuestion}
                    />

                    <TextInput 
                    style = {styles.textinput}
                    placeholder={'Write your answer here'}
                    placeholderTextColor ={'#5A676A'}
                    value ={this.state.answer}
                    onChangeText = {this.handleInputAnswer}
                    />
                </View>

                <TouchableOpacity
                    style = {styles.submitBtn}
                    onPress = {this.submitPress}>
                    <Text style = {styles.submitBtnText}> Submit Card </Text>
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
     }
  });
  


export default connect()(AddCard);