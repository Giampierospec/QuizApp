import React, { Component } from 'react';
import Chart from 'chart.js';
import { getStat, generateRandomColor } from '../../utils/statUtil';
class UserRolesStats extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            roles: []
        };
    }
    async componentDidMount() {
        const { data } = await getStat('/api/roles');
        this.setState({ roles: data });
        this.renderContext();
    }
    renderContext() {
        const ctx = this.chartRef.current.getContext("2d");
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [...this.state.roles.map(role => role._id)],
                datasets: [{
                    data: [...this.state.roles.map(role => role.count)],
                    backgroundColor: [...this.state.roles.map(() => generateRandomColor())]
                }]
            }
        })
    }

    render() {
        return (<div>
            <canvas ref={this.chartRef}></canvas>
        </div>);
    }
}

export default UserRolesStats;