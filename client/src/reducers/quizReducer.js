import { CREATE_QUIZ, GET_QUIZZES, GET_QUIZ } from '../actions/types';
export default (state = {}, action) => {
    switch (action.type) {
        case GET_QUIZZES:
            return action.payload;
        case CREATE_QUIZ:
            return state.concat(action.payload);
        case GET_QUIZ:
            return action.payload;
        default:
            return state;
    }
}