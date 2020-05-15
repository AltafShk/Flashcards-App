import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeView from '../components/HomeView'
import CreateDeck from '../components/CreateDeck'

const Tabs = createMaterialTopTabNavigator();


class TabsView extends Component {
    render() {
        return (
                <Tabs.Navigator
                    tabBarOptions={{
                    activeTintColor: '#E2791C',
                    inactiveTintColor: 'gray',
                    }}>
                    <Tabs.Screen name="Decks" component={HomeView} />
                    <Tabs.Screen name="Add Deck" component={CreateDeck} />
                </Tabs.Navigator>
        );
    }
}

export default TabsView;