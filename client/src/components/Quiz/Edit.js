import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {withRouter} from 'react-router-dom';
import QuizForm from './QuizForm';
import QuizReview from './QuizReview';
import {connect} from 'react-redux';
import {editQuiz} from '../../actions';
class Edit extends Component {
    state = { showReview: false }
    submitForm = async (values) => {
        await this.props.editQuiz(this.props.match.params.id,values, this.props.history);
    }   
    render() {
        if (!this.state.showReview)
            return <QuizForm onSubmittingForm={() => { this.setState({ showReview: true }) }} quizId={this.props.match.params.id} title={`Edit Quiz #${this.props.match.params.id}`}/>
        else
            return <QuizReview onCancel={() => { this.setState({ showReview: false }) }} onFormSubmit={this.submitForm}/>
            
    }
}

const FormQuiz = reduxForm({
    form: 'quizForm'
})(withRouter(Edit));

export default connect(null,{editQuiz})(FormQuiz);