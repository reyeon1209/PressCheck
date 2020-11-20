import React, { Component } from 'react';

import SelectTable from '../components/News/SelectTable';
import NewsInfoList from '../components/News/NewsInfoList';
import '../components/News/News.css';


class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            information: [
                {
                    id: 0,
                    press: '',
                    title: '',
                    img_src: 'https://www.flaticon.com/svg/static/icons/svg/1402/1402120.svg',
                    content: '준비 중입니다..(오전 12시에 다시..)',
                    keyword: []
                },
            ]
        };
    }

    componentDidMount() {
        // axios.get('http://localhost:1818/article')
        // .catch(response => {
        //     this.setState({information: response.data})
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        fetch('http://localhost:1818/article')
        .then(res => res.json())
        .then(data => this.setState({information: data}));
    }

    render() {
        return (
            <div>
                <SelectTable />

                <div className='aggregate'>※ 0시 ~ 1시까지 집계한 뉴스리스트입니다.</div>
                <NewsInfoList data={this.state.information} />
            </div>
        );
    }

}
export default News;
