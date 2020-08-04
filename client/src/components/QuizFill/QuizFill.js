import React, { Component } from 'react';
import SelectQuiz from './SelectQuiz';
import { connect } from 'react-redux';
import { getQuizToFill } from '../../actions';
import { reduxForm } from 'redux-form';
import QuestionsFiller from './QuestionsFiller';
import Loading from '../Loading';
import { createFillQuiz } from '../../actions';
import { withRouter } from 'react-router-dom';

class QuizFill extends Component {
    state = { loading: false, selectedQuiz: false }
    setSelectedQuiz = async (e) => {
        this.setState({ selectedQuiz: true, loading: true });
        await this.props.getQuizToFill(e.currentTarget.value);
        this.setState({ loading: false });
    }
    showSelectQuiz = () => {
        if (!this.state.selectedQuiz)
            return <SelectQuiz onSelect={this.setSelectedQuiz} />
        else
            return null;
    }
    submitForm = async (values) => {
        this.setState({ loading: true });
        await this.props.createFillQuiz(values, this.props.history);
        this.setState({ loading: false });
    }
    showForm = () => {
        return (<form onSubmit={this.props.handleSubmit(this.submitForm)}>
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title">{this.props.quiz?.title} <b>Points: </b>{this.props.quiz?.maxPoints}</h4>
                        </div>
                        <div className="card-body">
                            <QuestionsFiller />
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>);
    }
    render() {
        if (this.state.loading)
            return <Loading msg="Loading the quiz, please wait" />
        else {
            return (<div className="margin-from-top">
                {this.showSelectQuiz()}
                {this.props.quiz && this.showForm()}
            </div>);
        }
    }
}
const validate = (values) => {
    console.log(values);
}

const QuizFillForm = reduxForm({
    form: "quizFill",
    validate,
})(withRouter(QuizFill));

const mapStateToProps = ({ quiz }) => ({ quiz: quiz[0], initialValues: quiz[0] });
export default connect(mapStateToProps, { getQuizToFill, createFillQuiz })(QuizFillForm);