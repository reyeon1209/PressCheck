import React, { Component } from 'react';

import './Home.css';
import NoImage from '../../assets/images/noimage.png';
class TopNewsInfo extends Component {
    static defaultProps = {
        info: {
            id: 1,
            title: '준비 중입니다.....',
            link: '',
            img_src: 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg',
            rank: 0,
            category: '',
        }
    }

    render() {
        let { id, title, link, img_src, rank, category } = this.props.info;
        if (id == "") {
            title = '준비 중입니다...';
            if (img_src == " ")
                img_src = 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg';
        }
        if (img_src.substr(0, 4) !== "http")
            img_src = NoImage;

        return (
            <div className='topnews-info' onClick="location.href='../news/analyze" >
                <div className='topnews-content_id'>{rank}</div>
                <div className='topnews-content_title'>{title}</div>
                <img className='topnews-thumbnail' src={img_src} alt="thumnail" value="thumnail"/>
            </div>
        );
    }
}

export default TopNewsInfo;