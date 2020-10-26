import React, { Component } from 'react';
import {ReactComponent as Empty} from '../assets/images/email.svg';
import './News.css';

class NewsInfo extends Component {
    static defaultProps = {
        info: {
            id: 0,
            category: '뉴스 카테고리',
            press: '언론사',
            title: '뉴스 제목',
            content: '뉴스 내용',
            updated: '뉴스업로드시간',
            keyword: [],
            summary: []
        }
    }

    render() {
        // eslint-disable-next-line
        const {press, title, content, keyword} = this.props.info;

        return (
            <div className='newsinfo'>
                <div className='thumbnail'><Empty /></div>
                <div className='content'>
                    <div>{press}</div>
                    <div><b>{title}</b></div>
                    <div>{content}</div>
                    <div className='keyword'>{keyword}</div>
                </div>        
            </div>
        );
    }
}

export default NewsInfo;