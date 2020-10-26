import React, { Component } from 'react';
import NewsInfoList from '../components/NewsInfoList';


class News extends Component {
    id = 0;
    state = {
        information: [
            {
                id: 0,
                category: '생활',
                press: '뉴스1',
                title: '제목1',
                content: '뉴스 내용1',
                updated: '뉴스업로드시간1',
                keyword: [],
                summary: []
            },
            {
                id: 0,
                category: '오락',
                press: '뉴스2',
                title: '제목2',
                content: '뉴스 내용2',
                updated: '뉴스업로드시간2',
                keyword: [],
                summary: []
            }
        ]
    }
    handleCreate = (data) => {
        const { information } = this.state;
        this.setState({
            information: information.concat({ id: this.id++, ...data })
        })
    }
    render() {
        return (
            <div>
                <NewsInfoList data={this.state.information} />
            </div>
        );
    }

}
export default News;
