import React, { Component } from 'react';
import SimilarNewsList from './SimilarNewsList';
import './Analyze.css';

import Email from '../../assets/images/email.png';
import Short from '../../assets/images/short.png';
import Middle from '../../assets/images/middle.png';
import Long from '../../assets/images/long.png';

class AnalysisReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: 'short',
            info: {
                keyword: ['신형', '투싼', '현대', 'SUV', '사전계약'],
                sum_short: '현대자동차 준중형 SUV "신형 투산"이 출시됐다.',
                sum_mid: '현대자동차 준중형 SUV "신형 투산"이 출시됐다. 사전계약 첫날에 1만대를 돌파했다.',
                sum_log: '현대자동차 준중형 SUV "신형 투산"이 출시됐다. 사전계약 첫날에 1만대를 돌파했다. 한줄 더 있다.'
            },
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
        this.summaryClickHandler = this.summaryClickHandler.bind(this);
    }

    summaryClickHandler(e) {
        console.log(e);
        this.setState({ summary: e });
    }

    emailClickHandler() {
        // TODO 팝업
    }

    // TODO 유사도 hover event

    render() {
        // eslint-disable-next-line
        const { keyword } = this.state.info;
        const keywordList = keyword.map((kw) => {return (<div>#{kw} </div>)});
        const {sum_short, sum_mid, sum_log} = this.state.info;

        // TODO summary button event
        return (
            <div className='analysis-report'>
                <div className='email-send'>
                    <button className='email-button'><img src={Email} alt="Email" onClick={() => this.emailClickHandler()} value="Email" /></button>
                    <div className='email-text'>Email</div>
                </div>
                <div className='keyword-summary'>
                    <div>{keywordList}</div>
                    <button><img src={Short} alt="한줄요약" onClick={() => this.summaryClickHandler("short")} value="short" /></button>
                    <button><img src={Middle} alt="두줄요약" onClick={() => this.pressClickHandler("middle")} value="middle" /></button>
                    <button><img src={Long} alt="세줄요약" onClick={() => this.pressClickHandler("short")} value="long" /></button>
                    <div>{sum_short}</div>
                    <div>{sum_mid}</div>
                    <div>{sum_log}</div>
                </div>

                <SimilarNewsList data={this.state.information} />
            </div>
        );
    }
}

export default AnalysisReport;