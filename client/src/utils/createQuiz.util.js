import { Field } from 'redux-form';
import React from 'react';
import QuizField from '../components/Quiz/QuizField';
import CheckBoxField from '../components/Quiz/CheckBoxField';



export const questions = () => {
    return [{ options: [] }];
};

export const renderField = (options) => {
    return (<Field
        {...options}
        component={QuizField}
    />);
};
const seeOnChange = (e, index) => {
    const elements = document.getElementsByClassName(`correct-${index}`);
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