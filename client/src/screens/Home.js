import React, { Component } from 'react';
import Split from 'react-split';

import SelectTable from '../components/Home/SelectTable';
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
                }
            ]
        };
    }

    componentDidMount() {
        fetch('http://localhost:1818/mostRead')
        .then(res => res.json())
        .then(data => this.setState({information: data}));
    }

    render() {
        return (
            <div className='App'>
                <Split className="wrap">
                    <SelectTable />
                    <div className='right-news-list'>
                        <div className='right-news-title'>가장 많이 본 뉴스 TOP 5</div>
                        <div className='right-aggregate'>※ 0시 ~ {this.state.date}시까지 집계한 뉴스리스트입니다.</div>
                        <TopNewsList data={this.state.information} />
                        <a className='more' href = '../news/newslist'>더보기 &gt;</a>
                    </div>
                </Split>    
            </div>
        );
    }
} 
export default Home;
