import {connect} from 'react-redux';
import React, { Component } from 'react';
import QuizFillField from './QuizFillFields';
import { Field } from 'redux-form';
import InputField from './InputField';

class QuestionsFiller extends Component{
    renderFields(options) {
        return (<Field
            {...options}
            component={QuizFillField}
        />)
    }
    renderInput(options){
        return (<Field
            {...options}
            component={InputField}
        />)
    }
    
    renderQuestions(){
        const {quiz} = this.props;
        if(!quiz)
            return null;
        return quiz.questions.map((question,i)=>{
            return(<div key={i}>
                    {this.renderInput({
                        name:`questions[${i}].question`,
                        type:"hidden",
                        value:question.question
                    })}
                <h4>Question # {i + 1}: {question.question} <b>Value:{question.points}</b></h4>
                <hr/>
                {question.options.map((opt,j)=>(<div key={j}>
                    {this.renderInput({
                        name: `questions[${i}].answer.description`,
                        type: "hidden",
                        value: opt.description
                    })}
                        {this.renderFields({
                            name:`questions[${i}].answer.correct`,
                            value:opt.correct,
                            label:opt.description
                        })}
                </div>))}
            </div>)
        })
        

    }
    renderContent(){
        return (<div className="row">
            <div className="col-sm-8 offset-sm-2">
                <div className="card">
                    <div className="card-header bg-secondary text-white">
                    <h4 className="card-title">{this.props.quiz?.title} <b>Points: </b>{this.props.quiz?.totalPoints}</h4>
                    </div>
                    <div className="card-body">
                        {this.renderInput({
                            name: 'title',
                            type: 'hidden',
                            value: this.props.quiz?.title
                        })}
                        {this.renderInput({
                            name: 'maxPoints',
                            type: 'hidden',
                            value: this.props.quiz?.totalPoints
                        })}
                        {this.renderQuestions()}
                    </div>
                </div>
            </div>
        </div>);
    }
    render(){
        if(this.props.quiz)
            return this.renderContent();
        else 
        return null;
    }
}
const mapStateToProps = ({quiz})=>({quiz:quiz[0]});

export default connect(mapStateToProps)(QuestionsFiller);