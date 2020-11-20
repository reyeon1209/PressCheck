import React, { Component } from 'react';

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
        var { press, title, img_src, content, keyword} = this.props.info;
        if (press == "") {
            content = '준비 중입니다..(오전 12시에 다시..)';
        if (img_src == "")
            img_src = 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg';
        }

        content = content.replace('  ', '').trim().slice(0, 100) + '...';
        const keywordList = keyword.map((kw) => {return (<div className="news-keyword">#{kw}&nbsp;&nbsp;</div>)})

        return (
            <div className='newsinfo'>
                <img className='news-thumbnail' src={img_src} alt="thumnail" value="thumnail"/>
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