import React, { Component } from 'react';

import KeywordIcon from '../../assets/images/keyword.png';
import './Todays.css';


class KeywordInfoList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { keyword } = this.props.data;
        console.log(keyword);

        const keywordList = keyword &&
            keyword.map(kw => {return (kw);});
        const today = new Date();
        const date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
        

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
                    <div className='keyword-change'>{keywordList}</div>

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
                    <div className='keyword-change'>{keywordList}</div>

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
                    <div className='keyword-change'>{keywordList}</div>
                </div>
            </div>
        );
    }
}

export default KeywordInfoList;