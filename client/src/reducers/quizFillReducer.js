import {QUIZ_TO_FILL, CREATE_FILL_QUIZ, GET_QUIZ_FILLED, GET_QUIZ_FILLED_USER} from '../actions/types';

export default(state = [], action) =>{
    switch (action.type) {
        case GET_QUIZ_FILLED:
            return action.payload;
        case QUIZ_TO_FILL:
            return action.payload;
        case CREATE_FILL_QUIZ:
            return state.concat(action.payload)
        case GET_QUIZ_FILLED_USER:
            return action.payload;
        default:
            return state;
    }
}