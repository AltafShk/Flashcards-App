import {AsyncStorage} from 'react-native';

const FLASHCARDS_STORAGE_KEY = 'mobile-flashcards'


const data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};






export function loadInitialDecks(){
    return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
}




export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        data[title].questions.push(card)
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}


export function getDecks(){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}



export function getDeck(id){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)

        return data[id] //Did not find its use anywwhere
    })
}

export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(title))
}

export function deleteDeck(title){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)

        data[title] = undefined
        delete data[title]

        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}