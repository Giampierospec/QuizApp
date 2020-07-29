import React, { Component } from 'react';
import {connect} from 'react-redux';

class QuizReview extends Component{
    componentDidMount(){
        console.log(this.props.quizForm);
    }
    render(){
        return (<div></div>);
    }
}

const mapStateToProps = ({ form }) => ({ quizForm:form.quizForm});

export default connect(mapStateToProps)(QuizReview);