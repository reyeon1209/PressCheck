import React, { Component } from 'react';

import './News.css';


class NewsInfo extends Component {
    static defaultProps = {
        info: {
            id: 0,
            press: '언론사',
            title: '뉴스 제목',
            thumnail: '뉴스 썸네일',
            content: '뉴스 내용',
            keyword: []
        }
    }

    render() {
        // eslint-disable-next-line
        const { press, title, thumnail, content, keyword} = this.props.info;
        const keywordList = keyword.map((kw) => {return (<div className="news-keyword">#{kw}&nbsp;&nbsp;</div>)})

        return (
            <div className='newsinfo'>
                <img className='news-thumbnail' src={thumnail} alt="thumnail" value="thumnail"/>
                <div className='news-content'>
                    <div>{press}</div>
                    <div><b>{title}</b></div>
                    <div>{content}</div>
                    {keywordList}
                </div>        
            </div>
        );
    }
}

export default NewsInfo;