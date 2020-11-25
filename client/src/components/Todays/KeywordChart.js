import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import './Todays.css';


class KeywordChart extends Component {
    static defaultProps = {
        keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
        keywordFreq: [0, 0, 0, 0, 0]
    }

    render() {
        const { keyword, keywordFreq } = this.props.data;
        console.log(keyword);
        console.log(keywordFreq);
        const data = {
            labels: keyword,
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
                    data: keywordFreq
                }
            ]
        }

        const options = {
            legend: { display: false },
            maintainAspectRatio: false,
            responsive:false 
        }

        return (
            <div style={{width: '800px'}} className="chart-left">
            <Line
                data={data}
                width={800}
                height={400}
                options={options}
            />
            </div>
        );
    }
}

export default KeywordChart;
