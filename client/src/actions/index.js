import axios from 'axios';
import Swal from 'sweetalert2';
import * as types from './types';

const renderError = (e)=>{
    let err = e;
    if(err.response)
        err = err.response.data;
    Swal.fire({
        title: "An error has ocurred",
        icon: "error",
        html: err
    });
};

export const fetchUser = () => async dispatch =>{
    try{
        const res = await axios.get('/api/users');
        dispatch({type:types.FETCH_USER,payload:res.data});
    }
    catch(e){
      renderError(e);
    }
};
export const loginUser = (values, history) => async dispatch =>{
    try {
        const res = await axios.post('/api/login',values);
        dispatch({ type: types.FETCH_USER, payload: res.data });
        history.push('/');
    }
    catch (e) {
        renderError(e);
    } 
};
export const logoutUser = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/logout');
        dispatch({ type: types.FETCH_USER, payload: res.data });
    } catch (e) {
        renderError(e);
    }
}

export const createUser = (values,history) => async dispatch =>{
    try {
        const res = await axios.post('/api/users', values);
        dispatch({ type: types.FETCH_USER, payload: res.data });
        history.push('/login');
        
    } catch (e) {
       renderError(e) ;
    }   
};
export const getQuizzes = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/quiz');
        dispatch({type:types.GET_QUIZZES, payload:res.data});
        } catch (e) {
        renderError(e);
    }
};
export const createQuiz = (values,history)=> async dispatch =>{
    try {
        const res = await axios.post('/api/quiz', values);
        dispatch({ type: types.CREATE_QUIZ, payload: [res.data] });
        history.push('/');

    } catch (e) {
        renderError(e);
    } 
};