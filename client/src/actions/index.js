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