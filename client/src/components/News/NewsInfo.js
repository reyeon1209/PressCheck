import React, { Component } from 'react';
import Axios from 'axios';

import Jungang from '../../assets/images/newslist_jungang.png';
import Donga from '../../assets/images/newslist_donga.png';
import Sbs from '../../assets/images/newslist_sbs.png';
import Kbs from '../../assets/images/newslist_kbs.png';
import Kukmin from '../../assets/images/newslist_kukmin.png';
import Yeonhap from '../../assets/images/newslist_yeonhap.png';
import Hankyoreh from '../../assets/images/newslist_hankyoreh.png';
import NoImage from '../../assets/images/noimage.png';

import './News.css';


class NewsInfo extends Component {
    static defaultProps = {
        info: {
            _id: 0,
            press: '',
            title: '',
            img_src: 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg',
            content: '준비 중입니다..(오전 12시에 다시..)',
            keyword: []
        },
    }

    newsClickHandler = async (link) => {
        console.log(link);
        const variable = { link: link }
        const data = await Axios.post('http://localhost:1818/article/link', variable);
        const _id = data.data[0]._id;
        
        window.location.href = '../news/analyze/detail?id=' + _id;
    }
    
    
    renderSwitch(press) {
        switch (press) {
            case '중앙':
                return (
                    <div className='newslist-press'><img src={Jungang} alt="Jungang" value="Jungang" /></div>
                )
            case '한겨레':
                return (
                    <div className='newslist-press'><img src={Hankyoreh} alt="Hankyoreh" value="Hankyoreh" /></div>
                )
            case '동아':
                return (
                    <div className='newslist-press'><img src={Donga} alt="Donga" value="Donga" /></div>
                )
            case 'sbs':
                return (
                    <div className='newslist-press'><img src={Sbs} alt="Sbs" value="Sbs" /></div>
                )
            case 'kbs':
                return (
                    <div className='newslist-press'><img src={Kbs} alt="Kbs" value="Kbs" /></div>
                )
            case '국민':
                return (
                    <div className='newslist-press'><img src={Kukmin} alt="Kukmin" value="Kukmin" /></div>
                )
            case '연합':
                return (
                    <div className='newslist-press'><img src={Yeonhap} alt="Yeonhap" value="Yeonhap" /></div>
                )
            default:
                return (
                    <div></div>
                )
        }
    }

    render() {
        // eslint-disable-next-line
        var { _id, press, title, img_src, content, keyword } = this.props.info;

        if (press == "") {
            content = '준비 중입니다...';
            if (img_src == " ")
                img_src = 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg';
        }
        content = content.replace('            ', '').trim().slice(0, 100) + '...';
        keyword = keyword.slice(0, 5);
        const keywordList = keyword.map((kw) => { return (<div className="news-keyword">#{kw}&nbsp;&nbsp;</div>) })
        press = press.trim();
        if (img_src.substr(0, 4) !== "http")
            img_src = NoImage;

        return (
            <div className='newsinfo' onClick={() => this.newsClickHandler(_id)} >
                <img className='news-thumbnail' src={img_src} alt="thumnail" value="thumnail" />
                <div className='news-content'>
                    <div>{this.renderSwitch(press)}</div>
                    <div><strong>{title}</strong></div>
                    <div>{content}</div>
                    {keywordList}
                </div>
            </div>
        );
    }
}

export default NewsInfo;