import React from 'react';


const QuizFillField = ({label, input, meta: { touched, error } }, value) => {
    return (
        <div className="form-check">
                <input {...input} className="form-check-input" type="radio" value={value}/>
                <label className="form-check-label">{label}</label>
                <span className="text-danger">{touched && error}</span>
        </div>
    )
};

export default QuizFillField;