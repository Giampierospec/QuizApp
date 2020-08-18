import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuizzes } from '../../actions';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
class Quiz extends Component {
    state = { loading: true, page: 1 };
    async componentDidMount() {
        await this.props.getQuizzes();
        this.setState({ loading: false });
    }
    renderQuizzes = () => {
        return this.props.quiz.map(q => {
            return (
                <div className="col-sm-4" key={q._id}>
                    <div className="card text-center">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title">{q.title}</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group-flush">
                                <li className="list-group-item"><b>No. of Questions: </b> <span className="badge badge-secondary">{q.questions?.length}</span></li>
                                <li className="list-group-item"><b>Points: </b> <span className="badge badge-secondary">{q.totalPoints}</span> </li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <div className="btn-group">
                                <Link to={`/quiz/${q._id}`} className="btn btn-primary">Detail</Link>
                                <Link to={`/edit/${q._id}`} className="btn btn-secondary">Edit</Link>
                            </div>
                        </div>
                    </div>
                </div>);
        })
    };
    callApi = async (page) => {
        this.setState({ loading: true, page });
        await this.props.getQuizzes(page);
        this.setState({ loading: false });

    }
    renderPages = () => {
        const pages = [];
        const { startPage, endPage } = this.props.pagination;
        for (let i = startPage; i <= endPage; i++)
            pages.push(<li className="page-item" key={i} onClick={() => { this.callApi(i) }}><button className="page-link">{i}</button></li>);
        return pages;
    }
    setFirst = async () => {
        if (this.state.page !== this.props.pagination.startPage)
            await this.callApi(this.props.pagination.startPage);
    }
    setPrevious = async () => {
        if (this.state.page !== this.props.pagination.startPage)
            await this.callApi(this.state.page - 1);
    }
    setNext = async () => {
        if (this.state.page !== this.props.pagination.endPage)
            await this.callApi(this.state.page + 1)
    }
    setLast = async () => {
        if (this.state.page !== this.props.pagination.endPage)
            await this.callApi(this.props.pagination.endPage);
    }
    renderPagination = () => {
        const { startPage, endPage, totalPages } = this.props.pagination;
        const prevCond = this.state.page === startPage;
        const nextCond = this.state.page === endPage;
        return (<div className="text-center">
            <p>page {this.state.page} of {totalPages}</p>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${(prevCond) ? 'disabled' : ''}`}>
                        <button className="page-link" disabled={prevCond} onClick={this.setFirst}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
                    </li>
                    <li className={`page-item ${(prevCond) ? 'disabled' : ''}`}>
                        <button className="page-link" disabled={prevCond} onClick={this.setPrevious}><FontAwesomeIcon icon={faAngleLeft} /></button>
                    </li>
                    {this.renderPages()}
                    <li className={`page-item ${(nextCond) ? 'disabled' : ''}`} >
                        <button className="page-link" disabled={nextCond} onClick={this.setNext}><FontAwesomeIcon icon={faAngleRight} /></button>
                    </li>
                    <li className={`page-item ${(nextCond) ? 'disabled' : ''}`} >
                        <button className="page-link" disabled={nextCond} onClick={this.setLast}><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
                    </li>
                </ul>
            </nav>
        </div>)
    }
    render() {
        if (this.state.loading)
            return <Loading msg="Loading Quizzes please wait..." />
        else if (!this.props.quiz.length)
            return (
                <div className="margin-from-top">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <h3>Nothing to show :(</h3>
                            <Link to="/create"> Create a new quiz here!</Link>
                        </div>
                    </div>
                </div>);
        else
            return (
                <div className="margin-from-top">
                    <h4 className="text-center">Available Quizzes <Link to="/create" className="btn btn-primary float-right"><FontAwesomeIcon icon={faPlus} /></Link></h4>
                    <hr />
                    <h5 className="text-center">Showing {this.props.quiz.length} of {this.props.pagination.totalItems}</h5>
                    <br />
                    <div className="row">
                        {this.renderQuizzes()}
                    </div>
                    <br />
                    {this.renderPagination()}
                </div>
            )
    }
}
const mapStateToProps = ({ quiz }) => ({ quiz: quiz.items, pagination: quiz });

export default connect(mapStateToProps, { getQuizzes })(Quiz);