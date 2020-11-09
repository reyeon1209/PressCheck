import React, { Component } from 'react';
import NewsInfoList from '../components/News/NewsInfoList';

import '../components/News/News.css';

import Josun from '../assets/images/press_josun.png';
import Jungang from '../assets/images/press_jungang.png';
import Donga from '../assets/images/press_donga.png';
import KBS from '../assets/images/press_kbs.png';
import SBS from '../assets/images/press_sbs.png';
import Kukmin from '../assets/images/press_kukmin.png';
import Yeonhap from '../assets/images/press_yeonhap.png';


class News extends Component {
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
            press: 'josun',
            information: [
                {
                    id: 0,
                    category: '생활',
                    press: '뉴스1',
                    title: '제목1',
                    content: '뉴스 내용1',
                    uploaded: '뉴스업로드시간1',
                    keyword: ['#키워드1'],
                    summary: []
                },
                {
                    id: 0,
                    category: '오락',
                    press: '뉴스2',
                    title: '제목2',
                    content: '뉴스 내용2',
                    uploaded: '뉴스업로드시간2',
                    keyword: ['#키워드2'],
                    summary: []
                },
                {
                    id: 0,
                    category: '아악',
                    press: '뉴스3',
                    title: '제목3',
                    content: '뉴스 내용3',
                    uploaded: '뉴스업로드시간3',
                    keyword: ['#키워드3 ', '#키워드4'],
                    summary: []
                }
            ]
        };
        this.pressClickHandler = this.pressClickHandler.bind(this);
        this.categoryAllClickHandler = this.categoryAllClickHandler.bind(this);
        this.categoryPoliticsClickHandler = this.categoryPoliticsClickHandler.bind(this);
        this.categorySocietyClickHandler = this.categorySocietyClickHandler.bind(this);
        this.categoryEconomyClickHandler = this.categoryEconomyClickHandler.bind(this);
        this.categoryInternationClickHandler = this.categoryInternationClickHandler.bind(this);
        this.categorySportsClickHandler = this.categorySportsClickHandler.bind(this);
        this.categoryCultureClickHandler = this.categoryCultureClickHandler.bind(this);
    }

    pressClickHandler(e) {
        console.log(e);
        this.setState({ press: e });
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

    render() {
        return (
            <div>
                <table>
                    <caption className="table-title"><a href='../todays'>DATA &gt;</a></caption>
                    <tr>
                        <th className="table-content-title">카테고리</th>
                        <th className="table-content-content">
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
                        </th>
                    </tr>
                    <tr>
                        <th className="table-content-title">언론사</th>
                        <th className="table-content-content">
                            <div className='button-press'>
                                <button><img src={Josun} alt="josun" onClick={() => this.pressClickHandler("josun")} value="josun" /></button>
                                <button><img src={Jungang} alt="jungang" onClick={() => this.pressClickHandler("jungang")} value="jungang" /></button>
                                <button><img src={Donga} alt="donga" onClick={() => this.pressClickHandler("donga")} value="donga" /></button>
                                <button><img src={KBS} alt="kbs" onClick={() => this.pressClickHandler("kbs")} value="kbs" /></button>
                                <button><img src={SBS} alt="sbs" onClick={() => this.pressClickHandler("sbs")} value="sbs" /></button>
                                <button><img src={Kukmin} alt="kukmin" onClick={() => this.pressClickHandler("kukmin")} value="kukmin" /></button>
                                <button><img src={Yeonhap} alt="yeonhap" onClick={() => this.pressClickHandler("yeonhap")} value="yeonhap" /></button>
                            </div>
                        </th>
                    </tr>
                </table>
                <div className='aggregate'>※ 0시 ~ 1시까지 집계한 뉴스리스트입니다.</div>
                <NewsInfoList data={this.state.information} />
            </div>
        );
    }

}
export default News;
