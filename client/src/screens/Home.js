import React, { Component } from 'react';
import TopNewsList from '../components/Home/TopNewsList';
import '../components/Home/Home.css';

import Josun from '../assets/images/press_josun.png';
import Jungang from '../assets/images/press_jungang.png';
import Donga from '../assets/images/press_donga.png';
import KBS from '../assets/images/press_kbs.png';
import SBS from '../assets/images/press_sbs.png';
import Kukmin from '../assets/images/press_kukmin.png';
import Yeonhap from '../assets/images/press_yeonhap.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAll: true,
            isPolitics: false,
            isSociety: false,
            isEconomy: false,
            isInternation: false,
            isSports: false,
            isCulture: false,
            currentPress: 'josun',
            information: [
                {
                    id: 1,
                    title: '[속보] 주호명 "국방부가 추장관 지키는 추방부, 서씨 지키는 서방부 됐다'
                },
                {
                    id: 2,
                    title: '"전화로 "위국헌신"하게 해달라"...아들, 안중근 비유에 "부글부글"'
                },
                {
                    id: 3,
                    title: '"파격" 신형 투싼, 경쟁차엔 "충격"...사전계약 첫날, 1만대 돌파'
                },
                {
                    id: 4,
                    title: '윤지오가 소재불명? SNS에 버젓이 파티 영상 올렸다'
                },
                {
                    id: 5,
                    title: '[속보] 서울 63-경기 54명-충남 10명-인천 7명-경북 6명 등 확진'
                }
            ]
        };
        
        this.categoryAllClickHandler = this.categoryAllClickHandler.bind(this);
        this.categoryPoliticsClickHandler = this.categoryPoliticsClickHandler.bind(this);
        this.categorySocietyClickHandler = this.categorySocietyClickHandler.bind(this);
        this.categoryEconomyClickHandler = this.categoryEconomyClickHandler.bind(this);
        this.categoryInternationClickHandler = this.categoryInternationClickHandler.bind(this);
        this.categorySportsClickHandler = this.categorySportsClickHandler.bind(this);
        this.categoryCultureClickHandler = this.categoryCultureClickHandler.bind(this);
        this.pressClickHandler = this.pressClickHandler.bind(this);
    }

    categoryAllClickHandler() {
        this.setState(initialState => ({
            isAll: true,
            isPolitics: false,
            isSociety: false,
            isEconomy: false,
            isInternation: false,
            isSports: false,
            isCulture: false
        }));
    }

    categoryPoliticsClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isPolitics: !initialState.isPolitics
        }));
    }

    categorySocietyClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isSociety: !initialState.isSociety
        }));
    }

    categoryEconomyClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isEconomy: !initialState.isEconomy
        }));
    }

    categoryInternationClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isInternation: !initialState.isInternation
        }));
    }

    categorySportsClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isSports: !initialState.isSports
        }));
    }

    categoryCultureClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isCulture: !initialState.isCulture
        }));
    }

    pressClickHandler(data) {
        console.log(data);
        this.setState({ currentPress: data });
    }

    render() {
        return (
            <div>
                <table className="left-table">
                    <caption className="left-table-title"><a href = '../todays'>DATA &gt;</a></caption>
                    <tr>
                        <th className="left-table-content">
                            <div className='left-button-category'>
                            <input type="checkbox"
                                checked={this.state.isAll}
                                onChange={this.categoryAllClickHandler}
                            /> 전체
                            <input type="checkbox"
                                checked={this.state.isPolitics}
                                onChange={this.categoryPoliticsClickHandler}
                            /> 정치
                            <input type="checkbox"
                                checked={this.state.isSociety}
                                onChange={this.categorySocietyClickHandler}
                            /> 사회
                            <input type="checkbox"
                                checked={this.state.isEconomy}
                                onChange={this.categoryEconomyClickHandler}
                            /> 경제
                            <br></br>
                            <input type="checkbox"
                                checked={this.state.isInternation}
                                onChange={this.categoryInternationClickHandler}
                            /> 국제
                            <input type="checkbox"
                                checked={this.state.isSports}
                                onChange={this.categorySportsClickHandler}
                            /> 스포츠
                            <input type="checkbox"
                                checked={this.state.isCulture}
                                onChange={this.categoryCultureClickHandler}
                            /> 문화
                            </div>
                            <hr></hr>
                        </th>
                    </tr>
                    <tr>
                        <th className="left-table-content">
                            <div className='left-button-press'>
                                <button className='left-button'><img src={Josun} alt="josun" onClick={() => this.pressClickHandler("josun")} value="josun"/></button>
                                <button className='left-button'><img src={Jungang} alt="jungang" onClick={() => this.pressClickHandler("jungang")} value="jungang"/></button>
                                <button className='left-button'><img src={Donga} alt="donga" onClick={() => this.pressClickHandler("donga")} value="donga"/></button>
                                <br></br>
                                <button className='left-button'><img src={KBS} alt="kbs" onClick={() => this.pressClickHandler("kbs")} value="kbs" /></button>
                                <button className='left-button'><img src={SBS} alt="sbs" onClick={() => this.pressClickHandler("sbs")} value="sbs" /></button>
                                <button className='left-button'><img src={Kukmin} alt="kukmin" onClick={() => this.pressClickHandler("kukmin")} value="kukmin" /></button>
                                <button className='left-button'><img src={Yeonhap} alt="yeonhap" onClick={() => this.pressClickHandler("yeonhap")} value="yeonhap" /></button>
                            </div>
                        </th>
                    </tr>
                </table>

                <div className='right-news-list'>
                    <div className='right-news-list-title'>
                        <div className='right-news-title'>가장 많이 본 뉴스 TOP 5</div>
                        <div className='right-aggregate'>※ 0시 ~ 1시까지 집계한 뉴스리스트입니다.</div>
                    </div>
                    <br></br>
                    <TopNewsList data={this.state.information} />
                </div>
            </div>
        );
    }
} 
export default Home;
