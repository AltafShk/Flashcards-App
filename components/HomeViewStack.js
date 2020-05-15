import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from '../components/HomeView'
import DeckView from '../components/DeckView'
import AddCard from '../components/AddCard';
import TabsView from '../components/TabsView'
import Quiz from '../components/Quiz'


const Stack = createStackNavigator();


class HomeViewStack extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="DeckList" component={TabsView} />
                <Stack.Screen name="DeckView" component={DeckView} />
                <Stack.Screen name="AddCard" component={AddCard} />
                <Stack.Screen options={{headerStyle:{height: 40 }}} name = 'Quiz' component={Quiz}/> 
            </Stack.Navigator>
        );
    }
}

export default HomeViewStack;