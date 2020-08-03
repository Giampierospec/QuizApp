import React from 'react';


const QuizFillField = ({ label, input, formClass, meta: { touched, error } }) => {
    return (
        <div className="form-check">
            <input {...input} className={`form-check-input ${formClass}`} type="checkbox"/>
                <label className="form-check-label">{label}</label>
                <span className="text-danger">{touched && error}</span>
        </div>
    )
};

export default QuizFillField;