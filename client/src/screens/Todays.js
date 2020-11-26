import React, { Component } from 'react';
import Axios from 'axios';

import KeywordInfoList from '../components/Todays/KeywordInfoList';
import TimeKeyword from '../components/Todays/TimeKeyword';
import KeywordChart from '../components/Todays/KeywordChart';
import SummaryList from '../components/Todays/SummaryList';
import '../components/Todays/Todays.css';


class Todays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategory : 0,
            activeTime: 0,
            information: [
                {
                    link: '',
                    keyword: [ ['키워드1', 80], ['키워드2', 50], ['키워드3', 20] ],
                    timeKeywords: [
                        {
                            title: '0시 ~ 6시',
                            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
                            keywordFreq: [10, 10, 10, 10, 10]
                        },
                        {
                            title: '6시 ~ 12시',
                            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
                            keywordFreq: [20, 20, 20, 20, 20]
                        },
                        {
                            title: '12시 ~ 18시',
                            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
                            keywordFreq: [30, 30, 30, 30, 30]
                        },
                        {
                            title: '18시 ~ 24시',
                            keyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'],
                            keywordFreq: [40, 40, 40, 40, 40]
                        }
                    ],
                    headline: ['헤드라인1', '헤드라인2', '헤드라인3']
                }
            ]
        };

        this.timeClickHandler = this.timeClickHandler.bind(this);
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
            activeCategory: id,
            information: data.data
        });
    }

    timeClickHandler = (id) => {
        this.setState({
            activeTime: id
        })
        console.log(this.state.activeTime);
    }

    componentDidMount() {
        Axios.get('http://localhost:1818/todays')
            .then(response => {
                console.log(response.data);
                this.setState({ information: response.data });
            });
    }

    render() {
        const { link, keyword, timeKeywords, headline } = this.state.information[0];

        return (
            <div className='box'>
                <div className='tab-margin'>
                    <ul className='tab-clear'>
                        <li className='tabs' style={{ backgroundColor: this.state.activeCategory == 0 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(0)}>전체</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeCategory == 1 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(1)}>정치</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeCategory == 2 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(2)}>사회</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeCategory == 3 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(3)}>경제</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeCategory == 4 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(4)}>국제</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeCategory == 5 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(5)}>스포츠</li>
                        <li className='tabs' style={{ backgroundColor: this.state.activeCategory == 6 ? "#FFFFFF" : "#EEEEEE" }} onClick={() => this.categoryClickHandler(6)}>문화</li>
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
                            <KeywordChart data={timeKeywords[3]} />
                            <div className="chart-right">
                                <TimeKeyword data={timeKeywords} func={this.timeClickHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="today-margin">
                        <div className="today-title">오늘의 주요 기사 요약</div>
                        <SummaryList link={link} headline={headline} />
                    </div>
                    <div className="style-clear"></div>
                </div>
            </div>
        );
    }
}

export default Todays;
