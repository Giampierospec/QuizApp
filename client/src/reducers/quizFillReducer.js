import {QUIZ_TO_FILL, CREATE_FILL_QUIZ} from '../actions/types';

export default(state = [], action) =>{
    switch (action.type) {
        case QUIZ_TO_FILL:
            return action.payload;
        case CREATE_FILL_QUIZ:
            return state.concat(action.payload)
        default:
            return state;
    }
}