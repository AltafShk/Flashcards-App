import {RECEIVE_DECKS, RECEIVE_DECK, SAVE_DECK_TITLE, ADD_CARD, DELETE_DECK} from '../actions'
import {filterObject} from '../utils/helpers'



function decks (state={}, action){
    switch (action.type){

        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case SAVE_DECK_TITLE:
            return {
                ...state,
                ...action.title
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]:{
                    ...state[action.title],
                    questions:[...state[action.title].questions, action.card]
                }
            }
        case DELETE_DECK:
            console.log(filterObject(state, action.title, action.title))
            const {title} = action
            return filterObject(state, 'title', title)
            
        default:
            return state
    }
}


export default decks