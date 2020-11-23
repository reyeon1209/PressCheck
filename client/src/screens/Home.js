import React, { Component } from 'react';
import Split from 'react-split';
import Axios from 'axios';

import SelectTable from '../components/Home/SelectTable';
import TopNewsList from '../components/Home/TopNewsList';
import '../components/Home/Home.css';

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



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().getHours(),
            information: [
                {
                    id: 1,
                    title: '준비 중입니다.....',
                    link: '',
                    img_src: 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg',
                    rank: 0,
                    category: '',
                }
            ]
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:1818/mostRead')
            .then(response => {
                this.setState({ information: response.data });
            });
        
    }

    render() {
        return (
            <div className='app'>
                <div className='right-news-title'>가장 많이 본 뉴스 TOP 5</div>
                <div className='right-aggregate'>※ 0시 ~ {this.state.date}시까지 집계한 뉴스리스트입니다.</div>
                <div className='right-news-list'>
                    <TopNewsList data={this.state.information} />
                    <a className='more' href = '../news/newslist'>더보기 &gt;</a>
                </div>
            </div>  
        );
    }
} 
export default Home;
