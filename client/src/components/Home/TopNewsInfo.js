import React, { Component } from 'react';
import Axios from 'axios';

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

    newsClickHandler = async (link) => {
        const variable = { link: link }
        const data = await Axios.post('http://localhost:1818/article/link', variable);
        const _id = data.data[0]._id;
        
        window.location.href = '../news/analyze/detail?id=' + _id;
        //window.location.replace('../newslist/analyze'); // id와 함께 redirect
        // 받은 id써서 post(analyze)로 data 받기
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
            <div className='topnews-info' onClick={() => this.newsClickHandler(link)} >
                <div className='topnews-content_id'>{rank}</div>
                <div className='topnews-content_title'>{title}</div>
                <img className='topnews-thumbnail' src={img_src} alt="thumnail" value="thumnail"/>
            </div>
        );
    }
}

export default TopNewsInfo;