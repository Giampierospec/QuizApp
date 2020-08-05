import { GET_QUIZ_TO_FILL } from "../actions/types";

export default (state={}, action)=>{
    switch(action.type){
        case GET_QUIZ_TO_FILL:
            return action.payload;
        default:
            return state;
    }
}