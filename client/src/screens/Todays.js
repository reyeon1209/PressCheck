import React, { Component } from 'react';
import DataCategories from '../components/CommonData/DataCategories';
import Tabs from '../components/Todays/Tabs';
import KeywordInfoList from '../components/Todays/KeywordInfoList';

class Todays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeKeyword: [],
            currentCategory: '전체',
            todayKeyword: [
                {
                    id: 0,
                    title: ['1st 오늘의 키워드', 'Today\'s Keyword'],
                    date: '2020-01-01',
                    keyword: '키워드1',
                },
                {
                    id: 0,
                    title: ['2nd 오늘의 키워드', 'Today\'s Keyword'],
                    date: '2020-01-02',
                    keyword: '키워드2',
                },
                {
                    id: 0,
                    title: ['3rd 오늘의 키워드', 'Today\'s Keyword'],
                    date: '2020-01-03',
                    keyword: '키워드3',
                }
            ]
        };
        this.category = {DataCategories};
    }

    render() {
        return (
            <div className="todays-background">
                <Tabs />
                {/*
                <Tabs />
                <Graph />
                <Summary /> */}
                <div><KeywordInfoList data={this.state.todayKeyword} /></div>
            </div>
        );
    }
} 
export default Todays;
