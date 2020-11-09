import React, { Component } from 'react';
import SimilarNewsList from './SimilarNewsList';
import Summary from './Summary';
import './Analyze.css';

import Email from '../../assets/images/email.png';

class AnalysisReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ['신형', '투싼', '현대', 'SUV', '사전계약'],
            information: [
                {
                    id: 0,
                    ranking: 1,
                    press: '조선일보',
                    title: 'SUV의 역습... 신형 투산 사전계약 첫날, 1만대 돌파',
                    similarity: 98
                },
                {
                    id: 1,
                    ranking: 2,
                    press: '연합뉴스TV',
                    title: '현대자동차 신형 투산 출시',
                    similarity: 85
                },
                {
                    id: 2,
                    ranking: 3,
                    press: 'KBS',
                    title: '2020년 현대차 신형 투산에 대해 알아보자',
                    similarity: 51
                },
                {
                    id: 3,
                    ranking: 4,
                    press: '국민일보',
                    title: '슬기로운 SUV 탐구생활',
                    similarity: 32
                },
                {
                    id: 4,
                    ranking: 5,
                    press: '중앙일보',
                    title: '현대차 50년, 위기와 도전',
                    similarity: 3
                }
            ]
        };
    }

    emailClickHandler() {
        // TODO 팝업
    }

    // TODO 유사도 hover event

    render() {
        // eslint-disable-next-line
        const { keyword } = this.state;
        const keywordList = keyword.map((kw) => {return (<div>#{kw} </div>)})

        // TODO summary button event
        return (
            <div className='analysis-report'>
                <div className='email-send'>
                    <button className='email-button'><img src={Email} alt="Email" onClick={() => this.emailClickHandler()} value="Email" /></button>
                    <div className='email-text'>Email</div>
                </div>
                <div className='keyword-summary'>
                    <div>{keywordList}</div>
                    <Summary />
                </div>

                <SimilarNewsList data={this.state.information} />
            </div>
        );
    }
}

export default AnalysisReport;