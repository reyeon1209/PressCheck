import React, { Component } from 'react';
import NewsInfoList from '../components/NewsInfoList';


class News extends Component {
    state = {
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
    }
    handleCreate = (data) => {
        const { information } = this.state;
        this.setState({
            information: information.concat({ ...data })
        })
    }
    render() {
        return (
            <div>
                <div className='aggregate'>※ 0시 ~ 1시까지 집계한 뉴스리스트입니다.</div>
                <NewsInfoList data={this.state.information} />
            </div>
        );
    }

}
export default News;
