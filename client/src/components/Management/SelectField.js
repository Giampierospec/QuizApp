import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const SelectField = ({ input, label, icon, options, msg, keyValue, meta: { touched, error } }) => {
    return (
        <div className="form-group row">
            <label className="control-label col-sm-2"><FontAwesomeIcon icon={icon} /> {label}</label>
            <div className="col-sm-10">
                <select className="form-control" {...input}>
                    <option value="">{msg}</option>
                    {options.map((option, i) => <option key={i} value={option[keyValue.value]} > {option[keyValue.text]}</option>)}
                </select>
                <span className="text-danger">{touched && error}</span>
            </div>

        </div>
    )
}
export default SelectField;