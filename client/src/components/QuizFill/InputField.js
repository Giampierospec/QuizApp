import React from 'react';


const InputField = ({input,type,value})=>{
    return <input type={type} {...input}/>;
}

export default InputField;