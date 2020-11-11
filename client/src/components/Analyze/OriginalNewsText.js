import React, { Component } from 'react';
import Reporter from '../../assets/images/reporter.png';
import './Analyze.css';

class OriginalNewsText extends Component {
    static defaultProps = {
        info: {
            id: 0,
            title: '"파격" 신형 투싼, 경쟁차엔 "충격" ... 사전계약 첫날, 1만대 돌파',
            uploaded: '[입력]2020.09.17. 오전 10:01',
            updated: '[수정]2020.09.17. 오전 10:15',
            editor: '최기성',
            thumnail: 'https://file.mk.co.kr/meet/neds/2020/09/image_readtop_2020_960165_16003051264359396.jpg',
            content: '5년 만에 파격 변신한 현대자동차 준중형 SUV "신형 투싼"이 사전 계약 첫날에만 1만대 넘는 실적을 거워들이며 현대차 SUV 역사를 새로 썼다. 현대차는 16일부터 전국 영업점을 통해 사전계약에 들어간 신형 4세대 투싼의 첫날 계약대수가 1만842대를 기록했다고 17일 밝혔다.'
        }
    }

    render() {
        // eslint-disable-next-line
        const {title, uploaded, updated, editor, thumnail, content} = this.props.info;

        if (thumnail == '') {
            return (
                <div>
                    <div className='content-news-title'><b>{title}</b></div>
                    <div>{uploaded}</div>
                    <div>{updated}</div>
                    <div><img className='original-news-reporter' src={Reporter} alt="reporter" value="reporter"/>{editor} 기자</div>
                    <div className='original-news-text'>{content}</div> 
                </div>
            );
        } else {
            return (
                <div>
                    <div className='original-news-title'><b>{title}</b></div>
                    <div className='original-news-upload'>{uploaded}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{updated}</div>
                    <div><img className='original-news-reporter' src={Reporter} alt="reporter" value="reporter"/>{editor} 기자</div>
                    <img className='original-news-thumbnail' src={thumnail} alt="thumnail" value="thumnail"/>
                    <div className='original-news-text'>{content}</div> 
                </div>
            );
        }        
    }
}

export default OriginalNewsText;