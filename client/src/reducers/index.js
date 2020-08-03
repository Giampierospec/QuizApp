import { combineReducers } from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import quizReducer from './quizReducer';
import quizFillReducer from './quizFillReducer';

export default combineReducers({
    form:reduxForm,
    auth:authReducer,
    quiz: quizReducer,
    quizFill: quizFillReducer
});