import React, { Component } from 'react';
import SelectQuiz from './SelectQuiz';
import {connect} from 'react-redux';
import {getQuizToFill} from '../../actions';
import {reduxForm} from 'redux-form';
import QuestionsFiller from './QuestionsFiller';
import Loading from '../Loading';

class QuizFill extends Component{
    state = {loading:false, selectedQuiz:false}
    setSelectedQuiz = async (e)=>{
        this.setState({selectedQuiz:true, loading:true});
        await this.props.getQuizToFill(e.currentTarget.value);
        this.setState({loading:false});
    }
    showSelectQuiz = ()=>{
        if(!this.state.selectedQuiz)
            return <SelectQuiz onSelect={this.setSelectedQuiz}/>
        else 
            return null;
    }
    render(){
       if(this.state.loading)
        return <Loading msg="Loading the quiz, please wait"/>
       else{
           return (<div className="margin-from-top">
               {this.showSelectQuiz()}
               <form>
                 <QuestionsFiller/>
               </form>
           </div>);
       }
    }
}
const validate = (values)=>{
    console.log(values);
}

const QuizFillForm = reduxForm({
    form:"quizFill",
    validate
})(QuizFill);

export default connect(null,{getQuizToFill})(QuizFillForm);