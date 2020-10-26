import React, { Component } from 'react';
import NewsInfoList from '../components/NewsInfoList';
import Checkbox from '../components/PressCheckbox';
import '../components/Checkbox.css'

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
            checked: false,
            press: [
                { id: 1, value: "josun", isChecked: false },
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
        this.setState({ press: press })
    }

    handleCheckChange = (event) => {
        let press = this.state.press;
        press.forEach(press => {
            if (press.value === event.target.value)
                press.isChecked = true
            else
                press.isChecked = false
        })
        this.setState({ press: press })
    }

    // handling: create news list, dynamic
    handleCreate = (data) => {
        const { information } = this.state.information;
        this.setState({
            information: information.concat({ ...data })
        })
    }

    render() {
        return (
            <div>
                <div className='allcheck'>
                    <ul>
                        {
                            this.state.press.map((press) => {
                                return (<Checkbox handleCheckChieldElement={this.handleCheckChieldElement} {...press} />)
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
