import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {createQuiz} from '../../actions';
import { faFileSignature , faTimes, faQuestionCircle, faBraille, faSms, faCheck} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

class QuizReview extends Component {
    sendForm = ()=>{
        this.props.createQuiz(this.props.quizForm,this.props.history);
    }
    renderQuestions = ()=>{
        return this.props.quizForm.questions.map((question,index) =>{
            return(
                <div key={index}>
                    <p className="card-text"><b><FontAwesomeIcon icon={faQuestionCircle} /> Question#{index + 1}: </b>{question.question}</p> 
                    <p className="card-text"><b><FontAwesomeIcon icon={faBraille} /> Points: </b>{question.points}</p>
                    <h6>Answers</h6>
                    <hr/>
                    {question.options.map((option,i)=>{
                        return (<div key={i}>
                            <span className="card-text"><b><FontAwesomeIcon icon={faSms} /> Answer#{i + 1}: </b> {option.description} </span>
                            <span className={!option.correct? 'text-danger' : 'text-success'}><FontAwesomeIcon icon={!option.correct? faTimes : faCheck} /></span>
                        </div>);
                    })}
                </div>
            )
        });
    }
    render() {
        return (<div className="row margin-from-top">
            <div className="col-sm-8 offset-sm-2">
                <div className="card">
                    <div className="card-header bg-secondary text-white">
                        <h4 className="card-title">Review your Inputs</h4>
                    </div>
                    <div className="card-body">
                        <h4><FontAwesomeIcon icon={faFileSignature}/>Quiz Title: {this.props.quizForm.title}</h4>
                        <hr/>
                        <h5><FontAwesomeIcon icon={faQuestionCircle}/> Questions and Answers</h5>
                        <hr/>
                        {this.renderQuestions()}
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-info float-left" onClick={this.props.onCancel}><FontAwesomeIcon icon={faTimes}/> Cancel</button>
                        <button className="btn btn-primary float-right" onClick={this.sendForm}><FontAwesomeIcon icon={faCheck}/> Submit</button>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = ({ form }) => ({ quizForm: form.quizForm.values });

export default connect(mapStateToProps,{createQuiz})(withRouter(QuizReview));