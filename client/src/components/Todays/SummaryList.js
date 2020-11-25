import React, { Component } from 'react';
import Axios from 'axios';

import SummaryIcon from '../../assets/images/summary.png';


class SummaryList extends Component {
    static defaultProps = {
        data: []
    }

    newsClickHandler = async (url) => {
        const variable = { url: url }
        const data = await Axios.post('http://localhost:1818/article/url', variable);
        const _id = data.data[0]._id;
        
        window.location.href = '../news/analyze/detail?id=' + _id;
    }

    render() {
        var link = [];
        link = this.props.link;
        var headline = [];
        headline = this.props.headline;

        const today = new Date();
        const date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();

    
        return (
            <div className='summary-box'>
                <div className='summary-left'>
                    <div>오늘의 기사 요약</div>
                    <div>Today's Summary</div>
                    <div className="summary-left-content">
                        {date}
                        <img src={SummaryIcon} alt='summary' width="18%" />
                    </div>
                </div>
                <div className='summary-right'>
                    <div className='summary-text' onClick={() => this.newsClickHandler(link[0])}>{headline[0]}</div>
                    <div className='summary-text' onClick={() => this.newsClickHandler(link[1])}>{headline[1]}</div>
                    <div className='summary-text' onClick={() => this.newsClickHandler(link[2])}>{headline[2]}</div>
                </div>
            </div>
        );
    }
}

export default SummaryList;