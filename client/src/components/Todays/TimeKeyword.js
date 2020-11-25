import React, { Component } from 'react';

import './Todays.css';


class TimeKeyword extends Component {
    constructor () {
        super();
        this.handler = this.handler.bind(this);
    }

    static defaultProps = {
        currentTime: 0,
        data: {
            title: '0시~6시',
            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
            keywordFreq: [0, 0, 0, 0, 0]
        }
    }

    handler = (currentTime) => {
        this.props.func(currentTime);
        this.setState(this.state);
    }

    render() {
        // eslint-disable-next-line
        const title0 = this.props.data[0]['title'];
        const title1 = this.props.data[1]['title'];
        const title2 = this.props.data[2]['title'];
        const title3 = this.props.data[3]['title'];

        const keyword0 = this.props.data[0]['keyword'];
        const keywordList0 = keyword0.map((kw) => {return (<div className="timeKeyword-content">#{kw}</div>)})
        const keyword1 = this.props.data[1]['keyword'];
        const keywordList1 = keyword1.map((kw) => {return (<div className="timeKeyword-content">#{kw}</div>)})
        const keyword2 = this.props.data[2]['keyword'];
        const keywordList2 = keyword2.map((kw) => {return (<div className="timeKeyword-content">#{kw}</div>)})
        const keyword3 = this.props.data[3]['keyword'];
        const keywordList3 = keyword3.map((kw) => {return (<div className="timeKeyword-content">#{kw}</div>)})

        const currentHour = new Date().getHours();
        console.log(currentHour);

        return (
            <div>
                <div className='timeKeyword-table' onClick={() => this.handler(0)} style={{ visibility: currentHour >= 0 ? "" : "hidden" }}>
                    <div className='timeKeyword-title'>{title0}</div>
                    {keywordList0}
                </div>
                <div className='timeKeyword-table' onClick={() => this.handler(1)} style={{ visibility: currentHour >= 6 ? "" : "hidden" }}>
                    <div className='timeKeyword-title'>{title1}</div>
                    {keywordList1}
                </div>
                <div className='timeKeyword-table' onClick={() => this.handler(2)} style={{ visibility: currentHour >= 12 ? "" : "hidden" }}>
                    <div className='timeKeyword-title'>{title2}</div>
                    {keywordList2}
                </div>
                <div className='timeKeyword-table' onClick={() => this.handler(3)} style={{ visibility: currentHour >= 18 ? "" : "hidden" }}>
                    <div className='timeKeyword-title'>{title3}</div>
                    {keywordList3}
                </div>
            </div>
        );
    }
}

export default TimeKeyword;