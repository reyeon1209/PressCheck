import React, { Component } from 'react';
import Axios from 'axios';

import NewsInfoList from '../components/News/NewsInfoList';
import '../components/News/News.css';

import Hankyoreh from '../assets/images/press_hankyoreh.png';
import Jungang from '../assets/images/press_jungang.png';
import Donga from '../assets/images/press_donga.png';
import KBS from '../assets/images/press_kbs.png';
import SBS from '../assets/images/press_sbs.png';
import Kukmin from '../assets/images/press_kukmin.png';
import Yeonhap from '../assets/images/press_yeonhap.png';

import HankyorehClick from '../assets/images/press_hankyoreh_click.png';
import JungangClick from '../assets/images/press_jungang_click.png';
import DongaClick from '../assets/images/press_donga_click.png';
import KBSClick from '../assets/images/press_kbs_click.png';
import SBSClick from '../assets/images/press_sbs_click.png';
import KukminClick from '../assets/images/press_kukmin_click.png';
import YeonhapClick from '../assets/images/press_yeonhap_click.png';


class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().getHours(),
            information: [
                {
                    id: 0,
                    press: '',
                    title: '',
                    img_src: 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg',
                    content: '준비 중입니다...',
                    keyword: []
                },
            ],
            table: [
                {
                    isAll: true,
                    isPolitics: false,
                    isSociety: false,
                    isEconomy: false,
                    isInternation: false,
                    isSports: false,
                    isCulture: false,
                    currentPress: 'jungang',
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

    categoryAllClickHandler = async () => {
        const data = await Axios.get('http://localhost:1818/article');

        this.setState(initialState => ({
            information: data.data,
            isAll: true,
            isPolitics: false,
            isSociety: false,
            isEconomy: false,
            isInternation: false,
            isSports: false,
            isCulture: false
        }));
    }

    pressClickHandler = async (press) => {
        const variable = { press: press }
        const data = await Axios.post('http://localhost:1818/article/press', variable);

        this.setState({
            information: data.data,
            currentPress: press
        });
    }

    categoryPoliticsClickHandler = async () => {
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

    componentDidMount() {
        this.categoryAllClickHandler();
        this.pressClickHandler('jungang');
    }

    render() {
        return (
            <div>
                <table className="entire-table">
                    <caption className="table-title"><a href='../todays'>DATA &gt;</a></caption>
                    <tr className="news-tr">
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
                    <tr className="news-tr">
                        <th className="table-content-title">언론사</th>
                        <th className="table-content-content">
                            <div className='button-press'>
                                <button><img src={this.state.currentPress == 'jungang' ? JungangClick : Jungang} alt="jungang" onClick={() => this.pressClickHandler("jungang")} value="jungang"/></button>
                                <button><img src={this.state.currentPress == 'hankyoreh' ? HankyorehClick : Hankyoreh} alt="hankyoreh" onClick={() => this.pressClickHandler("hankyoreh")} value="hankyoreh"/></button>
                                <button><img src={this.state.currentPress == 'donga' ? DongaClick : Donga} alt="donga" onClick={() => this.pressClickHandler("donga")} value="donga"/></button>
                                <button><img src={this.state.currentPress == 'kbs' ? KBSClick : KBS} alt="kbs" onClick={() => this.pressClickHandler("kbs")} value="kbs" /></button>
                                <button><img src={this.state.currentPress == 'sbs' ? SBSClick : SBS} alt="sbs" onClick={() => this.pressClickHandler("sbs")} value="sbs" /></button>
                                <button><img src={this.state.currentPress == 'kukmin' ? KukminClick : Kukmin} alt="kukmin" onClick={() => this.pressClickHandler("kukmin")} value="kukmin" /></button>
                                <button><img src={this.state.currentPress == 'yeonhap' ? YeonhapClick : Yeonhap} alt="yeonhap" onClick={() => this.pressClickHandler("yeonhap")} value="yeonhap" /></button>
                            </div>
                        </th>
                    </tr>
                </table>

                <div className='aggregate'>※ 0시 ~ {this.state.date}시까지 집계한 뉴스리스트입니다.<br></br></div>
                <NewsInfoList data={this.state.information} />
            </div>
        );
    }

}
export default News;
