import React from 'react';


const InputField = ({input,type})=>{
    return <input type={type} {...input}/>;
}

export default InputField;