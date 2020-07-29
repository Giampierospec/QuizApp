import React, { Component } from 'react';
import '../css/loading.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

class Loading extends Component {
    render() {
        return (<div className="row margin-from-top text-center">
            <div className="col-sm-6 offset-sm-3">
                <h3><FontAwesomeIcon icon={faCircleNotch} className="rotate" size="6x"/></h3>
                <p className="text-muted blinking">{this.props.msg}</p>

            </div>
        </div>);
    }
}
export default Loading;