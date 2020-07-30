import {CREATE_QUIZ, GET_QUIZZES} from '../actions/types';
export default (state=[],action)=>{
    switch(action.type){
        case GET_QUIZZES:
            return action.payload;
        case CREATE_QUIZ:
            return state.concat(action.payload);
        default:
            return state;
    }
}