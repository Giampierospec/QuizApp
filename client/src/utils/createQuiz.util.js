import { Field, FieldArray } from 'redux-form';
import React from 'react';
import QuizField from '../components/Quiz/QuizField';
import CheckBoxField from '../components/Quiz/CheckBoxField';

export const validate = (values) => {
    const errors = {};
    if (!values['title'])
        errors['title'] = 'Title is required';
    if (!values['questions'] || !values['questions'].length)
        errors['questions'] = { _error: 'At least one question must be entered' }
    else {
        const questionErrors = [];
        values['questions'].forEach((question, index) => {
            const questionError = {};
            if (!question.question)
                questionError['question'] = 'Question is required';

            if (!question.points)
                questionError['points'] = 'Points are required';

            if (!question['options'] || question['options'].length < 2)
                questionError['options'] = { _error: 'Must have at least 2 answers' };
            else {
                const answerErrors = [];
                question['options'].forEach((option, index) => {
                    const answerError = {};
                    if (!option.description)
                        answerError['description'] = 'Must provide a description';

                    answerErrors[index] = answerError;
                });
                questionError['options'] = answerErrors;

            }

            questionErrors[index] = questionError;

        });
        errors['questions'] = questionErrors;
    }
    return errors;

};
export const renderField = (options) => {
    return (<Field
        {...options}
        component={QuizField}
    />);
};
export const renderFields = (options)=>{
    return (<FieldArray
        {...options}
    />);
}
const seeOnChange = (e, option) => {
    const elements = document.getElementsByClassName(`correct-${option}`);
    for (let i = 0; i <= elements.length; i++) {
        if (e.currentTarget.checked && e.currentTarget.getAttribute('name') !== elements[i]?.getAttribute('name')) {
            if (elements[i]) {
                elements[i].setAttribute('checked', false);
                elements[i].setAttribute('disabled', true);
            }
        }
        if(!e.currentTarget.checked)
            if(elements[i])
                elements[i].removeAttribute('disabled');


    }
}
export const renderCheckbox = (options) => {
    return (<Field
        {...options}
        component={CheckBoxField}
        onChange={(ev) => { seeOnChange(ev, options.index); }}
    />);
}