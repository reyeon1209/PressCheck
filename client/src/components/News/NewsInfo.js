import React, { Component } from 'react';

import Jungang from '../../assets/images/newslist_jungang.png';
import Donga from '../../assets/images/newslist_donga.png';
import Sbs from '../../assets/images/newslist_sbs.png';
import Kbs from '../../assets/images/newslist_kbs.png';
import Kukmin from '../../assets/images/newslist_kukmin.png';
import Yeonhap from '../../assets/images/newslist_yeonhap.png';
import Hankyoreh from '../../assets/images/newslist_hankyoreh.png';

import './News.css';


class NewsInfo extends Component {
    static defaultProps = {
        info: {
            id: 0,
            press: '',
            title: '',
            img_src: 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg',
            content: '준비 중입니다..(오전 12시에 다시..)',
            keyword: []
        },
    }
    
    renderSwitch(press) {
        switch (press) {
            case '중앙':
                return (
                    <div className='newslist-press'><img src={Jungang} alt="Jungang" value="Jungang" /></div>
                )
            case '한겨래':
                return (
                    <div><img src={Hankyoreh} alt="Hankyoreh" value="Hankyoreh" /></div>
                )
            case '동아':
                return (
                    <div><img src={Donga} alt="Donga" value="Donga" /></div>
                )
            case 'sbs':
                return (
                    <div><img src={Sbs} alt="Sbs" value="Sbs" /></div>
                )
            case 'kbs':
                return (
                    <div><img src={Kbs} alt="Kbs" value="Kbs" /></div>
                )
            case '국민':
                return (
                    <div><img src={Kukmin} alt="Kukmin" value="Kukmin" /></div>
                )
            case '연합':
                return (
                    <div><img src={Yeonhap} alt="Yeonhap" value="Yeonhap" /></div>
                )
            default:
                return (
                    <div></div>
                )
        }
    }

    render() {
        // eslint-disable-next-line
        var { press, title, img_src, content, keyword } = this.props.info;

        if (press == "") {
            content = '준비 중입니다...';
            if (img_src == " ")
                img_src = 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg';
        }
        content = content.replace('            ', '').trim().slice(0, 100) + '...';
        keyword = keyword.slice(0, 5);
        const keywordList = keyword.map((kw) => { return (<div className="news-keyword">#{kw}&nbsp;&nbsp;</div>) })
        press = press.trim();

        return (
            <div className='newsinfo'>
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