import React, { Component } from 'react';
import NewsInfoList from '../components/NewsInfoList';
import Checkbox from '../components/Checkbox';
import '../components/Checkbox.css'

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            press: [
                { id: 1, value: "josun", isChecked: true },
                { id: 2, value: "jungang", isChecked: false },
                { id: 3, value: "donga", isChecked: false },
                { id: 4, value: "kbs", isChecked: false },
                { id: 5, value: "sbs", isChecked: false },
                { id: 6, value: "kukmin", isChecked: false },
                { id: 7, value: "yeonhap", isChecked: false },
            ],
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
    }
    
    handleCheckChieldElem = (event) => {
        let press = this.state.press;
        press.forEach(press => {
            if (press.value === event.target.value)
                press.isChecked = event.target.checked
        })
        this.setState({press: press})
    }

    handleCreate = (data) => {
        const { information } = this.state.information;
        this.setState({
            information: information.concat({ ...data })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <ul>
                        {
                            this.state.press.map((press) => {
                                return (<Checkbox handleCheckChieldElement={this.handleCheckChieldElement} { ...press } />)
                            })
                        }
                    </ul>
                </div>
                <div className='aggregate'>※ 0시 ~ 1시까지 집계한 뉴스리스트입니다.</div>
                <NewsInfoList data={this.state.information} />
            </div>
        );
    }

}
export default News;
