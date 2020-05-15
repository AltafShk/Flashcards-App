import {addCardToDeck, saveDeckTitle, getDeck, getDecks, loadInitialDecks, deleteDeck} from '../utils/api'
import {FLASHCARDS_STORAGE_KEY} from '../utils/api'
import {AsyncStorage} from 'react-native'


export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'


export function receiveDecks(decks){
    return{
        type: RECEIVE_DECKS,
        decks
    }
}

export function delDeck(title){
    return{
        type: DELETE_DECK,
        title
    }
}

export function addDeck(title){
    return{
        type: SAVE_DECK_TITLE,
        title
    }
}

export function addCard(title, card){
    return{
        type: ADD_CARD,
        title,
        card
    }
}


export function handleInitialData(){
    return (dispatch) => {
        return loadInitialDecks()
        
    }
}


export function getAllDecks(){
    return (dispatch) => {
        return getDecks()
        .then((result) => {

            const data = JSON.parse(result)

            dispatch(receiveDecks(data))
        })
    }
}


export function addNewCard(title, card){
    return (dispatch) => {
        return addCardToDeck(title, card)
        .then(() => {
            
            dispatch(addCard(title,card))

        })
    }
}

export function addNewDeck(title){
    return (dispatch) => {
        return saveDeckTitle(title)
        .then(() => {

            dispatch(addDeck(title))

        })
    }
}

export function removeDeck(title){
    return (dispatch) => {
        return deleteDeck(title)
        .then(() => {

            dispatch(delDeck(title))

        })
    }
}