import React, { Component } from 'react';
import SummaryIcon from '../../assets/images/summary.png';
import './Todays.css';

class Summary extends Component {
    static defaultProps = {
        info: {
            id: 0,
            title: ['뉴스제목1', '뉴스제목2', '뉴스제목3'],
            date: '2020-11-03',
        }
    }

    render() {
        // eslint-disable-next-line
        const { id, title, date } = this.props.info;

        return (
            <div className='summary-box'>
                <div className='summary-left'>
                    <div>오늘의 기사 요약</div>
                    <div>Today's Summary</div>
                    <div>
                        {date}
                        <img src={SummaryIcon} alt='summary' width="18%" />
                    </div>
                </div>
                <div className='summary-right'>
                    <div>{title[0]}</div>
                    <div>{title[1]}</div>
                    <div>{title[2]}</div>
                </div>
            </div>
        );
    }
}

export default Summary;