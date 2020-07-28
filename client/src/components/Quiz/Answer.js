import React, {Component} from 'react';
import { faSms, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { renderField, renderCheckbox } from '../../utils/createQuiz.util';
class Answer extends Component{
    renderAnswer(){
        const {questIndex,index} = this.props;
        return (<div>
            {renderField({
                name: `questions[${questIndex}].options[${index}].description`,
                type: 'text',
                cssClass: 'form-group row',
                label: `Answer #${index + 1}`,
                icon: faSms,
                formClass: 'form-control'
            })}
            <br/>
            {
                renderCheckbox({
                    name: `questions[${questIndex}].options[${index}].correct`,
                    type: 'checkbox',
                    label: `Correct`,
                    icon: faCheck,
                    formClass: `form-check-input correct-${questIndex}`,
                    index: questIndex
                })
            }
               
            <br/>
        </div>);
    }
    render(){
        return(this.renderAnswer())
    }
}

export default Answer;