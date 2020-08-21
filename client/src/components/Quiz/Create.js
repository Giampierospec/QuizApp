import React, { Component } from 'react';
import QuizForm from './QuizForm';
import QuizReview from './QuizReview';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createQuiz } from '../../actions';
import { withRouter } from 'react-router-dom';

class Create extends Component {
    state = { showReview: false }
    submitForm = async (values) => {
        await this.props.createQuiz(values, this.props.history);
    }
    render() {
        if (!this.state.showReview)
            return <QuizForm onSubmittingForm={() => { this.setState({ showReview: true }) }} title="Create New Quiz" />
        else
            return <QuizReview onCancel={() => { this.setState({ showReview: false }) }} onFormSubmit={this.submitForm} />
    }
}

const FormQuiz = reduxForm({
    form: "quizForm"
})(Create);
export default connect(null, { createQuiz })(withRouter(FormQuiz));