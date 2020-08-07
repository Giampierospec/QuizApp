import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { faHeading, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { renderField, renderFields, validate } from '../../utils/createQuiz.util';
import {Link} from 'react-router-dom';
import Question from './Question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import {getQuiz} from '../../actions';
class QuizForm extends Component {
    async componentDidMount(){
        if (this.props.quizId)
            await this.props.getQuiz(this.props.quizId);
    }
    render() {
        const { submitting } = this.props;
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmittingForm)}>
                <div className="row margin-from-top">
                    <div className="col-sm-8 offset-sm-2">
                        <div className="card">
                            <div className="card-header bg-secondary text-white">
                            <h4 className="card-title text-center">{this.props.title}</h4>
                            </div>
                            <div className="card-body">
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
                                        name: 'questions',
                                        component: Question
                                    }
                                )}
                            </div>
                            <div className="card-footer">
                                <Link to='/' className="btn btn-info float-left"><FontAwesomeIcon icon={faTimes}/> Cancel</Link>
                                <button className="btn btn-primary float-right" type="submit" disabled={submitting}><FontAwesomeIcon icon={faSearch}/> Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const FormQuiz = reduxForm({
    form: 'quizForm',
    destroyOnUnmount: false,
    validate,
    enableReinitialize:true
})(QuizForm);

const mapStateToProps = ({quiz})=>({initialValues:quiz[0]});

export default connect(mapStateToProps,{getQuiz})(FormQuiz);


