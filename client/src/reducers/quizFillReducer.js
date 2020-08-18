import { QUIZ_TO_FILL, CREATE_FILL_QUIZ, GET_QUIZ_FILLED, GET_QUIZ_FILLED_USER, DELETE_FILLED_QUIZ } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_QUIZ_FILLED:
            return action.payload;
        case QUIZ_TO_FILL:
            return action.payload;
        case CREATE_FILL_QUIZ:
            return action.payload;
        case GET_QUIZ_FILLED_USER:
            return action.payload;
        case DELETE_FILLED_QUIZ:
            let items = [...state.items];
            items = items.filter((fqId) => fqId._id !== action.payload);
            return { ...state, items: [...items] };
        default:
            return state;
    }
}