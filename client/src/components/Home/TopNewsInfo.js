import React, { Component } from 'react';

import './Home.css';


class TopNewsInfo extends Component {
    static defaultProps = {
        info: {
            id: 1,
            title: '뉴스 제목',
            thumnail: '기사 사진'
        }
    }

    render() {
        const { id, title, thumnail } = this.props.info;

        return (
            <div className='topnews-info'>
                <div className='topnews-content_id'>{id}</div>
                <div className='topnews-content_title'>{title}</div>
                <img className='topnews-thumbnail' src={thumnail} alt="thumnail" value="thumnail"/>
            </div>
        );
    }
}

export default TopNewsInfo;