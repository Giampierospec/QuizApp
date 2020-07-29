import React, { Component } from 'react';
import { reduxForm} from 'redux-form';
import { faHeading, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { questions, renderField, renderFields } from '../../utils/createQuiz.util';
import Question from './Question';
class QuizForm extends Component {
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
                               
                                {renderFields(
                                    {
                                        name:'questions',
                                        component:Question
                                    }
                                )}

                                <button className="btn btn-primary float-right" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const validate = (values)=>{
    const errors = {};
    console.log(values);
    errors['questions'] = [];
    if(!values['title'])
        errors['title'] = 'Title is required';
    if(!values['questions'] || !values['questions'].length)
        errors['questions'] = {_error:'At least one question must be entered'}
    return errors;

};
export default reduxForm({
    form: 'quizForm',
    destroyOnUnmount: false,
    validate
})(QuizForm);