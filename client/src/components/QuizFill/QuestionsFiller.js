
import React, { Component } from 'react';
import QuizFillField from './QuizFillFields';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

class QuestionsFiller extends Component {
    blockFields = (e,index)=>{
         const current = e.currentTarget;
         const elements = document.getElementsByClassName(`correct-${index}`);
        for(let i = 0; i <= elements.length; i++){
            if (current.checked && current.getAttribute('name') !== elements[i]?.getAttribute('name')) {
                if (elements[i]) {
                    elements[i].checked = false;
                    elements[i].disabled = true;
                }
            }
            if (!current.checked)
                if (elements[i])
                    elements[i].removeAttribute('disabled')
        }

    }
    renderFields = (options) => {
        return (<Field
            {...options}
            component={QuizFillField}
            onChange={(e)=>{this.blockFields(e,options.index)}}
        />)
    }
    renderAnswers(answer, index){
        return Object.keys(answer).map((k,i)=>{
            return this.renderFields({
                name: `questions[${index}].answer[${i}].chosen`,
                label: answer[k].description,
                key: `${index},${i}`,
                formClass: `correct-${index}`,
                index:index
            });
        });
    }

    renderQuestions() {
        const { quiz } = this.props;
        if (_.isEmpty(quiz))
            return null;
        return quiz.questions.map((question, i) => {
            return (<div key={i}>
                <h4>Question # {i + 1}: {question.question} <b>Value:{question.points}</b></h4>
                <hr />
                {this.renderAnswers(question.answer,i)}

            </div>)
        })


    }
    render() {
            return this.renderQuestions();
    }
}
const mapStateToProps = ({quizToFill})=>({quiz:quizToFill});

export default connect(mapStateToProps)(QuestionsFiller);