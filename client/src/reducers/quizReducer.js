import {CREATE_QUIZ} from '../actions/types';
export default (state=[],action)=>{
    switch(action.type){
        case CREATE_QUIZ:
            return state.concat(action.payload);
        default:
            return state;
    }
}