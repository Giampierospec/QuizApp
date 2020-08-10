import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteFilledQuiz } from '../../actions';

class ModalDelete extends Component {
    state={disable:false};
    deleteFilledQuiz = async (id) => {
        this.setState({disable:true});
        await this.props.deleteFilledQuiz(id);
        this.props.close();
    }
    renderModal = () => {
        const { show, quiz:{title,_id}, close } = this.props;
        return (<Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Are you sure you want to delete the quiz with title: <b>{title}</b> ?</h5>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={()=>{this.deleteFilledQuiz(_id)}} disabled={this.state.disable}>Confirm</button>
            </Modal.Footer>
        </Modal>)
    }
    render() {
        return this.renderModal();
    }
}

export default connect(null,{deleteFilledQuiz})(ModalDelete);