import React, { Component } from 'react';

import KeywordIcon from '../../assets/images/keyword.png';
import './Todays.css';


class KeywordInfoList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        var keyword = [];
        keyword = this.props.data;

        const today = new Date();
        const date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
        console.log(date);

        return (
            <div className='keyword-align'>
                <div className='keyword-box'>

                    <div className='keyword-fix'>
                        <div className='keyword-fix-title'>
                            <div>1st 오늘의 키워드</div>
                            <div>Today's Keyword</div>
                        </div>
                        <div className='keyword-fix-date'>
                            <div>{date}</div>
                            <div><img src={KeywordIcon} alt='keyword' width="18%" /></div>
                        </div>
                    </div>
                    <div className='keyword-change'>{keyword[0][0]}</div>
                </div>

                <div className='keyword-box'>

                    <div className='keyword-fix'>
                        <div className='keyword-fix-title'>
                            <div>2st 오늘의 키워드</div>
                            <div>Today's Keyword</div>
                        </div>
                        <div className='keyword-fix-date'>
                            <div>{date}</div>
                            <div><img src={KeywordIcon} alt='keyword' width="18%" /></div>
                        </div>
                    </div>
                    <div className='keyword-change'>{keyword[1][0]}</div>
                </div>

                <div className='keyword-box'>

                    <div className='keyword-fix'>
                        <div className='keyword-fix-title'>
                            <div>3st 오늘의 키워드</div>
                            <div>Today's Keyword</div>
                        </div>
                        <div className='keyword-fix-date'>
                            <div>{date}</div>
                            <div><img src={KeywordIcon} alt='keyword' width="18%" /></div>
                        </div>
                    </div>
                    <div className='keyword-change'>{keyword[2][0]}</div>
                </div>
            </div>     
        );
    }
}

export default KeywordInfoList;