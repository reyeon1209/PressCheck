import React, { Component } from 'react';
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
        const {id, category, press, title, content} = this.props.info;

        return (
            <div className='newsinfo'>
                <div><b>[{id}] {press}: {category} - {title}</b></div>
                <div>{content}</div>
            </div>
        );
    }
}

export default NewsInfo;