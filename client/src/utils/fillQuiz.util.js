import {Field} from 'redux-form';
import InputField from '../components/QuizFill/InputField';
import React from 'react';

export const setInitialValues = (quiz)=>{
   return {
       title:quiz.title,
       maxPoints: quiz.totalPoints,
       questions:quiz.questions.map((question,index)=>{
            return {
                question:question.question,
                answer:""
            }
       })
    };
}
export const renderInput = (options)=> {
    return (<Field
        {...options}
        component={InputField}
    />)
}
