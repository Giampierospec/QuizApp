import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Answer from './Answer';
import { renderField } from '../../utils/createQuiz.util';

class Question extends Component{
    state = {answers:[]};
    renderAnswers = ()=>{
        const setAnswers = this.state.answers
                            .concat([{}])
                            .map((x,i)=>{
                                return(<Answer key={i} questIndex={this.props.index} index={i}/>)
                            });
        this.setState({answers:setAnswers});
    }
    renderQuestion(){
        const {index} = this.props; 
        return (<div>
            {renderField({
                name: `questions[${index}].question`,
                type: 'text',
                cssClass: 'form-group row',
                label: `Question #${index + 1}`,
                icon: faQuestionCircle,
                formClass: 'form-control'
            })}
            <br />
            <h6>Answers <button className="btn btn-primary float-right" type="button" onClick={this.renderAnswers}><FontAwesomeIcon icon={faPlus} /></button></h6>
            <br />
            <hr />
            {this.state.answers}
            <hr />
        </div>);
    }
    render(){
        return (this.renderQuestion())
    }
}
export default Question;