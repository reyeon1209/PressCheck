import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './Todays.css';

class KeywordChart extends Component {
    render() {
        const data = {
            labels: ['0시', '6시', '12시', '18시', '24시'],
            datasets: [
                {
                    label: false,
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [0, 10, 30, 20, 0],
                }
            ]
        }

        const options = {
            legend: { display: false },
            maintainAspectRatio: false,
            responsive:false 
        }

        return (
            <div style={{width: '500px', position: "relative"}}>
            <Line
                data={data}
                width={500}
                height={300}
                options={options}
            />
            </div>
        );
    }
}

export default KeywordChart;
