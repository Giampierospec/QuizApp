import {QUIZ_TO_FILL} from '../actions/types';

export default(state = [], action) =>{
    switch (action.type) {
        case QUIZ_TO_FILL:
            return action.payload;
        default:
            return state;
    }
}