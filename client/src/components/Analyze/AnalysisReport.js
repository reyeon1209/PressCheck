import React, { Component } from 'react';

import EmailDialog from './EmailDialog';
import SimilarNewsList from './SimilarNewsList';
import Summary from './Summary';
import './Analyze.css';

import Report from '../../assets/images/report.png';


class AnalysisReport extends Component {
    static defaultProps = {
        data: [],
        information: [
            {
                id: 5,
                ranking: 6,
                press: '중앙일보',
                title: '현대차 50년, 위기와 도전',
                similarity: 3,
                diffKeyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5']
            },
            {
                id: 4,
                ranking: 5,
                press: 'SBS',
                title: 'SUV의 역사',
                similarity: 14,
                diffKeyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5']
            },
            {
                id: 3,
                ranking: 4,
                press: '국민일보',
                title: '슬기로운 SUV 탐구생활',
                similarity: 32,
                diffKeyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5']
            },
            {
                id: 2,
                ranking: 3,
                press: 'KBS',
                title: '2020년 현대차 신형 투산에 대해 알아보자',
                similarity: 51,
                diffKeyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5']
            },
            {
                id: 1,
                ranking: 2,
                press: '연합뉴스TV',
                title: '현대자동차 신형 투산 출시',
                similarity: 85,
                diffKeyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5']
            },
            {
                id: 0,
                ranking: 1,
                press: '조선일보',
                title: 'SUV의 역습... 신형 투산 사전계약 첫날, 1만대 돌파',
                similarity: 98,
                diffKeyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5']
            }
        ]
    }

    render() {
        // eslint-disable-next-line
        var { keyword } = this.props.data;
        const keywordList = keyword && keyword.map(kw => {return (<div className="analyze-keyword">#{kw}&nbsp;&nbsp;</div>)});

        const { information } = this.props.information;
        

        return (
            <div>
                <div className='analysis-report-title'>
                    <img src={Report} alt="Report" value="Report" />
                    <div>분석 리포트</div>
                </div>

                <div className='email-send'>
                    <EmailDialog />
                </div><br/><br/>
                
                <table className='keyword-summary'>
                    <tr>
                        <td className='title-td'>키워드</td>
                        <td className='keyword-td'>{keywordList}</td>
                    </tr>
                    <tr>
                        <td className='title-td'>기사 요약</td>
                        <td className='summary-td'><Summary data={this.props.data} /></td>
                    </tr>
                </table>

                <div className='similar-title'>유사한 뉴스</div>
                <div className='similar-aggregate'>※ 0시 ~ 1시까지 집계한 뉴스리스트입니다.</div>
                <SimilarNewsList data={information} />
            </div>
        );
    }
}

export default AnalysisReport;