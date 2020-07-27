import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const LoginField = ({input, type,label, icon})=>{
    return (<div className="form-group row">
            <label className="control-label col-sm-2">{label} <FontAwesomeIcon icon={icon}/></label>
            <div className="col-sm-10">
                <input {...input} type={type} className="form-control"/>
            </div>
    </div>);
}
export default LoginField;