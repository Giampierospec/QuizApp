import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestionCircle, faBraille, faTrash } from '@fortawesome/free-solid-svg-icons';
import Answer from './Answer';
import { renderField, renderFields } from '../../utils/createQuiz.util';

class Question extends Component {
    renderQuestions() {
        const { fields, meta: { error } } = this.props;
        return (<div>
            <h5 className="card-text">Questions <button className="btn btn-primary float-right" type="button" onClick={() => fields.push({})}><FontAwesomeIcon icon={faPlus} /></button></h5>
            <span className="text-danger">{error}</span>
            <hr />
            {fields.map((question, index) => {
                return (
                    <div key={index}>
                        {renderField({
                            name: `${question}.question`,
                            type: 'text',
                            cssClass: 'form-group row',
                            label: `Question #${index + 1}`,
                            icon: faQuestionCircle,
                            formClass: 'form-control'
                        })}
                        {renderField({
                            name: `${question}.points`,
                            type: 'number',
                            cssClass: 'form-group row',
                            label: `Points`,
                            icon: faBraille,
                            formClass: 'form-control'
                        })}
                        <button className="btn btn-danger float-right" type="button" onClick={() => fields.remove(index)}><FontAwesomeIcon icon={faTrash} /></button>
                        <br />
                        <br />
                        {renderFields({
                            name: `${question}.options`,
                            component: Answer,
                            questIndex: index
                        })}
                        <hr />
                    </div>
                );
            })}
            <br />

        </div>);
    }
    render() {
        return (this.renderQuestions())
    }
}
export default Question;