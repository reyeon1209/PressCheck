import React, { Component } from 'react';
import Axios from 'axios';

import TopNewsList from '../components/Home/TopNewsList';
import '../components/Home/Home.css';


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
                    total_documents: 0
                }
            ]
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:1818/mostRead')
            .then(response => {
                this.setState({ information: response.data, total_documents: response.data.length });
            });
    }

    render() {
        return (
            <div className='app'>
                <div className='right-news-title'>가장 많이 본 뉴스 TOP {this.state.total_documents}</div>
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
