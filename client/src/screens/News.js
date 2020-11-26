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
                    currentCategory: '전체',
                    currentPress: 'jungang'
                }
            ]
        };

        this.tableClickHandler = this.tableClickHandler.bind(this);
    }

    tableClickHandler = async (category, press) => {
        const variable = { category: category, press: press }
        const data = await Axios.post('http://localhost:1818/article/table', variable);

        this.setState({
            information: data.data,
            currentCategory: category,
            currentPress: press
        });
    }

    componentDidMount() {
        this.tableClickHandler('전체', '중앙');
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
                                checked={this.state.currentCategory == '전체' ? true : false}
                                onChange={() => this.tableClickHandler('전체', this.state.currentPress)}
                            /> 전체
                            <input type="checkbox"
                                checked={this.state.currentCategory == '정치' ? true : false}
                                onChange={() => this.tableClickHandler('정치', this.state.currentPress)}
                            /> 정치
                            <input type="checkbox"
                                checked={this.state.currentCategory == '사회' ? true : false}
                                onChange={() => this.tableClickHandler('사회', this.state.currentPress)}
                            /> 사회
                            <input type="checkbox"
                                checked={this.state.currentCategory == '경제' ? true : false}
                                onChange={() => this.tableClickHandler('경제', this.state.currentPress)}
                            /> 경제
                            <input type="checkbox"
                                checked={this.state.currentCategory == '국제' ? true : false}
                                onChange={() => this.tableClickHandler('국제', this.state.currentPress)}
                            /> 국제
                            <input type="checkbox"
                                checked={this.state.currentCategory == '스포츠' ? true : false}
                                onChange={() => this.tableClickHandler('스포츠', this.state.currentPress)}
                            /> 스포츠
                            <input type="checkbox"
                                checked={this.state.currentCategory == '문화' ? true : false}
                                onChange={() => this.tableClickHandler('문화', this.state.currentPress)}
                            /> 문화
                        </th>
                    </tr>
                    <tr className="news-tr">
                        <th className="table-content-title">언론사</th>
                        <th className="table-content-content">
                            <div className='button-press'>
                                <button><img src={this.state.currentPress == '중앙' ? JungangClick : Jungang} alt="jungang" onClick={() => this.tableClickHandler(this.state.currentCategory, '중앙')} value="jungang"/></button>
                                <button><img src={this.state.currentPress == '한겨레' ? HankyorehClick : Hankyoreh} alt="hankyoreh" onClick={() => this.tableClickHandler(this.state.currentCategory, '한겨레')} value="hankyoreh"/></button>
                                <button><img src={this.state.currentPress == '동아' ? DongaClick : Donga} alt="donga" onClick={() => this.tableClickHandler(this.state.currentCategory, '동아')} value="donga"/></button>
                                <button><img src={this.state.currentPress == 'kbs' ? KBSClick : KBS} alt="kbs" onClick={() => this.tableClickHandler(this.state.currentCategory, 'kbs')} value="kbs" /></button>
                                <button><img src={this.state.currentPress == 'sbs' ? SBSClick : SBS} alt="sbs" onClick={() => this.tableClickHandler(this.state.currentCategory, 'sbs')} value="sbs" /></button>
                                <button><img src={this.state.currentPress == '국민' ? KukminClick : Kukmin} alt="kukmin" onClick={() => this.tableClickHandler(this.state.currentCategory, '국민')} value="kukmin" /></button>
                                <button><img src={this.state.currentPress == '연합' ? YeonhapClick : Yeonhap} alt="yeonhap" onClick={() => this.tableClickHandler(this.state.currentCategory, '연합')} value="yeonhap" /></button>
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
