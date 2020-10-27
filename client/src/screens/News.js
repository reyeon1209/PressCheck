import React, { Component } from 'react';
import NewsInfoList from '../components/News/NewsInfoList';
import '../components/News.css'

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
            current: 'josun',
            information: [
                {
                    id: 0,
                    category: '생활',
                    press: '뉴스1',
                    title: '제목1',
                    content: '뉴스 내용1',
                    updated: '뉴스업로드시간1',
                    keyword: ['#키워드1'],
                    summary: []
                },
                {
                    id: 0,
                    category: '오락',
                    press: '뉴스2',
                    title: '제목2',
                    content: '뉴스 내용2',
                    updated: '뉴스업로드시간2',
                    keyword: ['#키워드2'],
                    summary: []
                }
            ]
        };
        this.pressClickHandler = this.pressClickHandler.bind(this);
    }

    pressClickHandler(data) {
        console.log(data);
        this.setState({ current: data });
    }

    render() {
        return (
            <div>
                <table>
                    <caption className="table-title"><a href = '../todays'>DATA ></a></caption>
                    <tr>
                        <th className="table-content-title">카테고리</th>
                        <th className="table-content-content">카테고리뚜따따/아래뉴스리스트이미지는아무거나넣은거</th>
                    </tr>
                    <tr>
                        <th className="table-content-title">언론사</th>
                        <th className="table-content-content">
                            <div className='button-press'>
                                <button><img src={Josun} alt="josun" onClick={() => this.pressClickHandler("josun")} value="josun" alt="josun" /></button>
                                <button><img src={Jungang} alt="jungang" onClick={() => this.pressClickHandler("jungang")} value="jungang" alt="jungang" /></button>
                                <button><img src={Donga} alt="donga" onClick={() => this.pressClickHandler("donga")} value="donga" alt="donga" /></button>
                                <button><img src={KBS} alt="kbs" onClick={() => this.pressClickHandler("kbs")} value="kbs" alt="kbs" /></button>
                                <button><img src={SBS} alt="sbs" onClick={() => this.pressClickHandler("sbs")} value="sbs" alt="sbs" /></button>
                                <button><img src={Kukmin} alt="kukmin" onClick={() => this.pressClickHandler("kukmin")} value="kukmin" alt="kukmin" /></button>
                                <button><img src={Yeonhap} alt="yeonhap" onClick={() => this.pressClickHandler("yeonhap")} value="yeonhap" alt="yeonhap" /></button>
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
