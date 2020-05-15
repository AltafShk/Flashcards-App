import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'
import * as Permissions from 'expo-permissions'


class Quiz extends Component {
    state = {
        questionsArray: this.props.route.params.deck.questions,
        totalQuestions: this.props.route.params.deck.questions.length,
        questionNumber: 1,
        flipped: false,
        totalScore: 0
    }

    componentWillMount(){
        this.animatedValue = new Animated.Value(0)
        this.value = 0
        this.animatedValue.addListener(({value}) => {
            this.value = value
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }


    flipCard = () => {
        
        Animated.spring(this.animatedValue, {
            toValue: 180,
            friction: 8,
            tension: 10
        }).start()

        

        this.setState({flipped: true})
    }

    nextQuestionCorrect = () => {
        if(this.value > 90){
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration:1
            }).start()
        }

        const {totalQuestions, questionNumber} = this.state
        
        if(totalQuestions === questionNumber){
            this.setState((prevState) => ({
                questionsArray: [],
                totalScore: prevState.totalScore += 1
            }))

            clearLocalNotification()
            .then(setLocalNotification)
        }
        else{
            this.setState((prevState) => ({
                questionsArray: prevState.questionsArray.slice(1),
                questionNumber: prevState.questionNumber += 1,
                totalScore: prevState.totalScore += 1,
                flipped: false
            }))
        }
    }

    nextQuestionIncorrect = () => {
        if(this.value > 90){
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration:1
            }).start()
        }

        const {totalQuestions, questionNumber} = this.state
        
        if(totalQuestions === questionNumber){
            this.setState({
                questionsArray: []
            })

            clearLocalNotification()
            .then(setLocalNotification)
        }
        else{
            this.setState((prevState) => ({
                questionsArray: prevState.questionsArray.slice(1),
                questionNumber: prevState.questionNumber += 1,
                flipped: false
            }))
        }

        
    }

    startQuizAgain = () => {
        this.setState({
            questionsArray: this.props.route.params.deck.questions,
            totalQuestions: this.props.route.params.deck.questions.length,
            questionNumber: 1,
            flipped: false,
            totalScore: 0
        })
    }


    render() {
        const frontAnimatedStyle = {
            transform: [{
                rotateY: this.frontInterpolate
            }]
        }
        const backAnimatedStyle = {
            transform: [{
                rotateY: this.backInterpolate
            }]
        }

        const {deck} = this.props.route.params
        const {navigation} = this.props
        const {questionsArray, questionNumber, flipped, totalQuestions, totalScore} = this.state

        if(questionsArray.length === 0 && flipped === false){
            return (
                <View style = {styles.container}>
                    <Text style={styles.text}>
                        Sorry you can not take a quiz because there are no cards in this deck!
                    </Text>


                    <TouchableOpacity
                    style = {styles.answerBtn}
                    onPress = {() => {navigation.navigate('DeckView', {'id':deck.title})}}>
                        <Text style = {styles.answerBtnText}>Return to Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }


        if (flipped === true && questionsArray.length === 0){
            return (
                <View style = {styles.container}>
                    <Text style = {styles.completetext}>
                        QUIZ COMPLETED
                    </Text>
                    <Text style={styles.text}>
                        You got {totalScore} out of {totalQuestions}
                        {totalQuestions=== 1 ? ' question' : ' questions'} correct ({(totalScore/totalQuestions)*100}%)
                    </Text>

                    <Text style = {styles.messageText}>
                    {(totalScore/totalQuestions) >= 0.9 ? 'Excellent Work' : ''}
                    {(totalScore/totalQuestions) >= 0.7 && (totalScore/totalQuestions) < 0.9 ? 'Good Work' : ''}
                    {(totalScore/totalQuestions) >= 0.5 && (totalScore/totalQuestions) < 0.7 ? 'You have potential to improve' : ''}
                    {(totalScore/totalQuestions) < 0.5 ? 'Practice and try again later' : ''}
                    </Text>

                    <TouchableOpacity
                    style = {[styles.answerBtn, {marginTop:110}]}
                    onPress = {this.startQuizAgain}>
                        <Text style = {styles.answerBtnText}>Restart this quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style = {[styles.answerBtn,{marginTop:30}]}
                    onPress = {() => {navigation.navigate('DeckView', {'id':deck.title})}}>
                        <Text style = {styles.answerBtnText}>Return to Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }


        return (
            <View style={styles.container}>
                <View>
                    <Text style = {styles.smalltext}>
                        {questionNumber} / {totalQuestions}
                    </Text>
                </View>

                <Animated.View style = {[styles.card, frontAnimatedStyle]}>
                    <Text style = {styles.cardHeadText}>
                        {flipped === false ? 'Question' : 'Answer'}
                    </Text>

                    <Text style = {styles.cardMainText}>
                        {flipped === false? questionsArray[0].question : questionsArray[0].answer}
                    </Text>
                </Animated.View>
                <Animated.View style = {[styles.card, backAnimatedStyle, {position: 'absolute', marginTop:80}]}>
                    <Text style = {styles.cardHeadText}>
                        {flipped === false ? 'Question' : 'Answer'}
                    </Text>

                    <Text style = {styles.cardMainText}>
                        {flipped === false? questionsArray[0].question : questionsArray[0].answer}
                    </Text>
                </Animated.View>

                <View>
                {flipped === false
                ? <TouchableOpacity 
                    style = {styles.answerBtn}
                    onPress = {this.flipCard}>
                        <Text style = {styles.answerBtnText}>
                            See Answer
                         </Text>
                    </TouchableOpacity>

                : <View>
                  <Text style = {styles.text}>
                    You got that answer...
                  </Text>

                  <TouchableOpacity 
                  style = {styles.correctBtn} 
                  onPress = {this.nextQuestionCorrect}>
                    <Text style = {{textAlign: 'center'}}>Correct</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                  style = {[styles.correctBtn, {backgroundColor: '#E87A54', marginTop: 10}]}
                  onPress = {this.nextQuestionIncorrect}>
                    <Text style = {{textAlign: 'center'}}>Incorrect</Text>
                  </TouchableOpacity>

                  </View>
                  }   
                
                </View>
            </View>
        );
    }
}


export default Quiz;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151B1D',
      justifyContent: 'flex-start',
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
    answerBtn:{
        backgroundColor: '#2e8b57',
        padding: 10,
        margin: 15,
        height: 40,
        width: 250,
        alignSelf:'center',
        borderRadius: 15,
        marginTop: 150,
    },
    answerBtnText:{
        color: 'white',
        textAlign:'center',
     },
     text:{
        color: 'white',
        fontSize: 26,
        marginTop: 50,
        textAlign: 'center'
     },
     smalltext: {
        color: '#C2C5C5',
        fontSize: 20,
        
     },
     card:{
        backgroundColor: '#2e8b57',
        width: 350,
        height: 250,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 22,
        backfaceVisibility: 'hidden'
     },
     cardHeadText:{
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
     },
     cardMainText:{
        textAlign: 'center',
        fontSize: 25,
        marginTop: 40,
        fontWeight: 'bold',
     },
     correctBtn:{
        backgroundColor: '#81D25E',
        padding: 10,
        margin: 15,
        height: 40,
        width: 250,
        alignSelf:'center',
        borderRadius: 15,
        marginTop: 50,
     },
     completetext:{
         fontWeight: 'bold',
         color: 'white',
        fontSize: 26,
        marginTop: 150,
        textAlign: 'center'
     },
     messageText:{
        color: '#C2C5C5',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30
     }
  });