import axios from 'axios';
import Swal from 'sweetalert2';

const renderError = (e) => {
    let err = e;
    if (err.response)
        err = err.response.data;
    Swal.fire({
        title: "An error has ocurred",
        icon: "error",
        text: err
    });
};
export const generateRandomColor = ()=>{
    const red = Math.floor(Math.random() * 130) + 100;
    const green = Math.floor(Math.random() * 130) + 100;
    const blue = Math.floor(Math.random() * 130) + 100;
    return `rgb(${red},${green},${blue})`;
}

export const generateOptions = ()=>{
    return [
        {
            name:"user",
            value:"user"
        },
        {
            name:"title",
            value:"title"
        }
    ];
}
export const getStat = async(url="")=>{
    try{
        return await axios.get(url);
    }catch(e){
        return renderError(e);
    }
}