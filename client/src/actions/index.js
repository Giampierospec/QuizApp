import axios from 'axios';
import Swal from 'sweetalert2';
import * as types from './types';

export const fetchUser = () => async dispatch =>{
    try{
        const res = await axios.get('/api/users');
        dispatch({type:types.FETCH_USER,payload:res.data});
    }
    catch(e){
        Swal.fire({
            title:"An error has ocurred",
            icon:"error",
            text:e
        });
    }
};