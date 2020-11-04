import React, { Component } from 'react';
import KeywordIcon from '../../assets/images/keyword.png';
import './Todays.css';

class KeywordInfo extends Component {
    static defaultProps = {
        info: {
            id: 0,
            title: ['1st 오늘의 키워드', 'Today\'s Keyword'],
            date: '2020-01-01',
            keyword: '#키워드',
        }
    }

    render() {
        // eslint-disable-next-line
        const { id, title, date, keyword } = this.props.info;

        return (
            <div className='keyword-align'>
                <div className='keyword-box'>
                    <div className='keyword-fix'>
                        <div className='keyword-fix-title'>
                            <div>{title[0]}</div>
                            <div>{title[1]}</div>
                        </div>
                        <div className='keyword-fix-date'>
                            <div>{date}</div>
                            <div><img src={KeywordIcon} alt='keyword' width="18%" /></div>
                        </div>
                    </div>
                    <div className='keyword-change'>{keyword}</div>
                </div>
            </div>
        );
    }
}

export default KeywordInfo;