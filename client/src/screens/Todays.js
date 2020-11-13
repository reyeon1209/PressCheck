import React, { Component } from 'react';
import Tabs from '../components/Todays/Tabs';
import KeywordInfoList from '../components/Todays/KeywordInfoList';
import SummaryList from '../components/Todays/SummaryList';
import TimeKeywordList from '../components/Todays/TimeKeywordList';
import KeywordChart from '../components/Todays/KeywordChart';
import '../components/Todays/Todays.css';

class Todays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            timeKeyword: [],
            currentCategory: '전체',
            todayKeywords: [
                {
                    id: 0,
                    title: ['1st 오늘의 키워드', 'Today\'s Keyword'],
                    date: '2020-01-01',
                    keyword: '#키워드1',
                },
                {
                    id: 1,
                    title: ['2nd 오늘의 키워드', 'Today\'s Keyword'],
                    date: '2020-01-02',
                    keyword: '#키워드2',
                },
                {
                    id: 2,
                    title: ['3rd 오늘의 키워드', 'Today\'s Keyword'],
                    date: '2020-01-03',
                    keyword: '#키워드3',
                }
            ],
            todayKeywordGraph: [0, 10, 30, 20, 0],
            timeKeywords: [
                {
                    title: '0시 ~ 6시',
                    keyword: ['#언텍트1', '#메이플스토리m1', '#추석1', '#단풍1', '#미술관1']
                },
                {
                    title: '6시 ~ 12시',
                    keyword: ['#언텍트2', '#메이플스토리m2', '#추석2', '#단풍2', '#미술관2']
                },
                {
                    title: '12시 ~ 18시',
                    keyword: ['#언텍트3', '#메이플스토리m3', '#추석3', '#단풍3', '#미술관3']
                },
                {
                    title: '18시 ~ 24시',
                    keyword: ['#언텍트4', '#메이플스토리m4', '#추석4', '#단풍4', '#미술관4']
                }
            ],
            todayArticles: [
                {
                    id: 0,
                    title: ["머나먼 당신에게 닿기를, '언텍트 미팅'", '사랑스러운 핑크빈과 함께 메이플스토리m의 세계로 떠나보세요!', '다른나라의 추석을 살펴보자'],
                    date: '2020-11-03',
                }
            ]
        };
    }

    render() {
        return (
            <div className='box'>
                <div className='tab-margin'>
                    <Tabs />
                </div>
                <div className="style-clear"></div>
                <div className="todays-background">
                    <div className="today-margin">
                        <div className="today-title">오늘의 키워드</div>
                        <div className="keywords"><KeywordInfoList data={this.state.todayKeywords} /></div>
                    </div>
                    <div className="style-clear"></div>
                    <div className="today-margin">
                        <div className="today-title mid-margin">시간별 주요 키워드 추이</div>
                        <div>
                            <KeywordChart keywordsData={this.state.todayKeywordGraph} />
                            <div className="chart-right">
                                <TimeKeywordList data={this.state.timeKeywords} />
                            </div>
                        </div>
                    </div>
                    <div className="today-margin">
                        <div className="today-title">오늘의 주요 기사 요약</div>
                        <SummaryList data={this.state.todayArticles} />
                    </div>
                    <div className="style-clear"></div>
                </div>
            </div>
        );
    }
}

export default Todays;
