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
        text: err
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
        history.push('/quiz');

    } catch (e) {
        renderError(e);
    } 
};
export const editQuiz = (id,values,history)=> async dispatch =>{
    try {
        const res = await axios.put(`/api/quiz/${id}`, values);
        dispatch({ type: types.CREATE_QUIZ, payload: [res.data] });
        history.push('/quiz');
    } catch (e) {
        renderError(e);
    }
}
export const getQuiz = (id)=> async dispatch =>{
    try {
        const res = await axios.get(`/api/quiz/${id}`);
        dispatch({ type: types.GET_QUIZ, payload: [res.data] });

    } catch (e) {
        renderError(e);
    } 
};

export const getQuizzesToFill = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/quizToFill');
        dispatch({type:types.QUIZ_TO_FILL,payload:res.data});
    } catch (e) {
        renderError(e);
    }
};
export const getQuizToFill = (id)=> async dispatch =>{
    try {
        const res = await axios.get(`/api/quizToFill/${id}`);
        dispatch({ type: types.GET_QUIZ_TO_FILL, payload: res.data });

    } catch (e) {
        renderError(e);
    }
}
export const clearQuizToFill = ()=> ({type:types.GET_QUIZ_TO_FILL, payload:{}});

export const createFillQuiz = (values, history)=> async dispatch =>{
    try {
        const res = await axios.post('/api/quizToFill',values);
        dispatch({ type: types.CREATE_FILL_QUIZ, payload: [res.data]});
        history.push('/filled');
    } catch (e) {
        renderError(e);
    }
}
export const getFilledQuizzes = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/quizFull');
        dispatch({type:types.GET_QUIZ_FILLED,payload:res.data});
    } catch (e) {
        renderError(e);
    }
}
export const getFilledQuiz = (id)=> async dispatch =>{
    try {
        const res = await axios.get(`/api/quizFull/${id}`);
        dispatch({ type: types.GET_QUIZ_FILLED_USER, payload: [res.data] });
    } catch (e) {
        renderError(e);
    }
}
export const deleteFilledQuiz = (id)=> async dispatch =>{
    try {
        await axios.delete(`/api/quizFull/${id}`);
        dispatch({ type: types.DELETE_FILLED_QUIZ, payload: id });
    } catch (e) {
        renderError(e);
    }
}
export const resetQuiz = ()=>{
    return {
        type:types.GET_QUIZ,
        payload:[]
    }
};