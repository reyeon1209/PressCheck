import React, { Component } from 'react';

import Jungang from '../../assets/images/press_jungang.png';
import Donga from '../../assets/images/press_donga.png';
import Sbs from '../../assets/images/press_sbs.png';
import Kbs from '../../assets/images/press_kbs.png';
import Kukmin from '../../assets/images/press_kukmin.png';
import Yeonhap from '../../assets/images/press_yeonhap.png';
import Hankyoreh from '../../assets/images/press_hankyoreh.png';

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

    render() {
        // eslint-disable-next-line
        var { press, title, img_src, content, keyword } = this.props.info;

        if (press == "") {
            content = '준비 중입니다..(오전 12시에 다시..)';
            if (img_src == " ")
                img_src = 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg';
        }

        content = content.replace('            ', '').trim().slice(0, 100) + '...';
        const keywordList = keyword.map((kw) => { return (<div className="news-keyword">#{kw}&nbsp;&nbsp;</div>) })

        return (
            <div className='newsinfo'>
                <img className='news-thumbnail' src={img_src} alt="thumnail" value="thumnail" />
                <div className='news-content'>
                    <div>{press}</div>
                    {(() => {
                        switch (press) {
                            case '중앙':
                                return (
                                    <div><Jungang /></div>
                                )
                            case '한겨래':
                                return (
                                    <div><Hankyoreh /></div>
                                )
                            case '동아':
                                return (
                                    <div><Donga /></div>
                                )
                            case 'sbs':
                                return (
                                    <div><Sbs /></div>
                                )
                            case 'kbs':
                                return (
                                    <div><Kbs /></div>
                                )
                            case '국민':
                                return (
                                    <div><Kukmin /></div>
                                )
                            case '연합':
                                return (
                                    <div><Yeonhap /></div>
                                )
                            default:
                                return (
                                    <div></div>
                                )
                        }
                    })}
                    <div>{content}</div>
                    {keywordList}
                </div>
            </div>
        );
    }
}

export default NewsInfo;