import React, { Component } from 'react';
import QuizForm from './QuizForm';
import QuizReview from './QuizReview';
import {reduxForm} from 'redux-form';


class Create extends Component{
    state = {showReview:false}
    render(){
        if(!this.state.showReview)
            return <QuizForm onSubmittingForm={()=>{this.setState({showReview:true})}}/>
        else
            return <QuizReview onCancel={()=>{this.setState({showReview:false})}}/>
    }
}

export default reduxForm({
    form:"quizForm"
})(Create);