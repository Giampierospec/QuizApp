import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const CheckBoxField = ({label,icon, input, formClass, type})=>{
    return(
        <div className="form-check float-right">
            <input {...input} className={formClass} type={type}/>
            <label className="form-check-label"><FontAwesomeIcon icon={icon}/> {label}</label>
        </div>
    )
};

export default CheckBoxField;