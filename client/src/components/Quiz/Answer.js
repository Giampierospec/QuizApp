import React, {Component} from 'react';
import { faSms, faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { renderField, renderCheckbox } from '../../utils/createQuiz.util';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
class Answer extends Component{
    renderAnswers(){
        const {fields,meta:{error,submitFailed} ,questIndex} = this.props;
      
        return (<div>
            <h6>Answers <button className="btn btn-primary float-right" type="button" onClick={()=> fields.push({})}><FontAwesomeIcon icon={faPlus} /></button></h6>
            <span className="text-danger">{error}</span>
            <br />
            <hr />
            {fields.map((option,index)=>{
                return(<div key={index}>
                    {renderField({
                        name: `${option}.description`,
                        type: 'text',
                        cssClass: 'form-group row',
                        label: `Answer #${index + 1}`,
                        icon: faSms,
                        formClass: 'form-control'
                    })}
                    <br />
                    {
                        renderCheckbox({
                            name: `${option}.correct`,
                            type: 'checkbox',
                            label: `Correct`,
                            icon: faCheck,
                            formClass: `form-check-input correct-${questIndex}`,
                            index:questIndex
                        })
                    }

                    <br />
                    <button className="btn btn-danger float-right" onClick={() => fields.remove(index)} type="button"><FontAwesomeIcon icon={faTimes} /></button>
                    <br />
                </div>);
            })}
        </div>);
    }
    render(){
        return(this.renderAnswers())
    }
}

export default Answer;