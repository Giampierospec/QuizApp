import React, { Component } from 'react';
import { reduxForm} from 'redux-form';
import { faHeading, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { questions, renderField } from '../../utils/createQuiz.util';
import Question from './Question';
class QuizForm extends Component {
    state = { questions:[]}
    renderQuestions = () => {
        const setQuestions = this.state.questions
            .concat(questions())
            .map((x, i) => {
                return (
                    <Question index={i} key={i} onRenderAnswers={this.renderAnswers}/>
                )
            });
        this.setState({ questions: setQuestions });
    }
    render() {
        return (
            <div className="row margin-from-top">
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title text-center">Create new Quiz</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.props.handleSubmit(this.props.onSubmittingForm)}>
                                {renderField({
                                    name: 'title',
                                    type: 'text',
                                    cssClass: 'form-group row',
                                    label: 'Quiz Title',
                                    icon: faHeading,
                                    formClass: 'form-control'
                                })}
                                <h5 className="card-text">Questions <button className="btn btn-primary float-right" type="button" onClick={this.renderQuestions}><FontAwesomeIcon icon={faPlus} /></button></h5>
                                <hr />
                                {this.state.questions}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'QuizForm',
    destroyOnUnmount: false
})(QuizForm);