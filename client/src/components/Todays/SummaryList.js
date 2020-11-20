import React, { Component } from 'react';

import SummaryIcon from '../../assets/images/summary.png';


class SummaryList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { headline } = this.props.data;
        const today = new Date();
        const date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

    
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
                    {headline}
                </div>
            </div>
        );
    }
}

export default SummaryList;