import React, { Component } from 'react';
import Axios from 'axios';

import Tabs from '../components/Todays/Tabs';
import KeywordInfoList from '../components/Todays/KeywordInfoList';
import TimeKeywordList from '../components/Todays/TimeKeywordList';
import KeywordChart from '../components/Todays/KeywordChart';
import SummaryList from '../components/Todays/SummaryList';
import '../components/Todays/Todays.css';


class Todays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : 0,
            information: [
                {
                    keyword: [ ['키워드1', 80], ['키워드2', 50], ['키워드3', 20] ],
                    timeKeywords: [
                        {
                            title: '0시 ~ 6시',
                            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
                            keywordFreq: [0, 10, 30, 20, 0]
                        },
                        {
                            title: '6시 ~ 12시',
                            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
                            keywordFreq: [0, 10, 30, 20, 0]
                        },
                        {
                            title: '12시 ~ 18시',
                            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
                            keywordFreq: [0, 10, 30, 20, 0]
                        },
                        {
                            title: '18시 ~ 24시',
                            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
                            keywordFreq: [0, 10, 30, 20, 0]
                        }
                    ],
                    headline: ['헤드라인1', '헤드라인2', '헤드라인3']
                }
            ]
        };

    }

    categoryClickHandler = async (id) => {
        var tab = '전체';
        switch (id) {
            case 0: tab = '전체'; break;
            case 1: tab = '정치'; break;
            case 2: tab = '사회'; break;
            case 3: tab = '경제'; break;
            case 4: tab = '국제'; break;
            case 5: tab = '스포츠'; break;
            case 6: tab = '문화'; break;
        }
        console.log(tab);
        const variable = { category: tab};
        const data = await Axios.post('http://localhost:1818/todays/category', variable);
        
        this.setState({
            activeTab: id,
            information: data.data
        });
    }

    componentDidMount() {
        console.log('test');
        Axios.get('http://localhost:1818/todays')
            .then(response => {
                console.log(response.data);
                this.setState({ information: response.data });
            });
    }

    render() {
        const { keyword, timeKeywords, headline } = this.state.information[0];
        
        return (
            <div className='box'>
                <div className='tab-margin'>
                    <ul className='tab-clear'>
                        <li className='tabs' style={{ backgroundColor: this.state.activeTab == 0 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(0)}>전체</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeTab == 1 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(1)}>정치</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeTab == 2 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(2)}>사회</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeTab == 3 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(3)}>경제</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeTab == 4 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(4)}>국제</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeTab == 5 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(5)}>스포츠</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeTab == 6 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(6)}>문화</li>
                    </ul>
                </div>
                <div className="style-clear"></div>
                <div className="todays-background">
                    <div className="today-margin">
                        <div className="today-title">오늘의 키워드</div>
                        <div className="keywords"><KeywordInfoList data={keyword} /></div>
                    </div>
                    <div className="style-clear"></div>
                    <div className="today-margin">
                        <div className="today-title mid-margin">시간별 주요 키워드 추이</div>
                        <div>
                            <KeywordChart data={timeKeywords} />
                            <div className="chart-right">
                                <TimeKeywordList data={timeKeywords} />
                            </div>
                        </div>
                    </div>
                    <div className="today-margin">
                        <div className="today-title">오늘의 주요 기사 요약</div>
                        <SummaryList data={headline} />
                    </div>
                    <div className="style-clear"></div>
                </div>
            </div>
        );
    }
}

export default Todays;
