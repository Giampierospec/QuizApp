import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuizField = ({ cssClass, label, icon, input, formClass, type, meta: { touched, error } }) => {
    return (
        <div className={cssClass}>
            <label className="control-label col-sm-2"><FontAwesomeIcon icon={icon} /> {label}</label>
            <div className="col-sm-10">
                <input {...input} className={formClass} type={type} />
                <span className="text-danger">{touched && error}</span>
            </div>
        </div>
    )
};

export default QuizField;