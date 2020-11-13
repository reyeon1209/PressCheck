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
                    press: '동아일보',
                    title: '[속보] 주호영 "국방부가 추장관 지키는 추방부, 서씨 지키는 서방부 됐다"',
                    thumnail: 'https://imgmmw.mbn.co.kr/storage/news/2020/09/17/1374B399-A6F6-488C-A404-E31A38DF1BE1_576.jpg',
                    content: '국민의 힘 주호영 원내대표는 17일 열린 비대위 회의에서 추미애 법무부 장관의 아들 서모씨의 군 특혜 의혹을 거론하며 "서일병 구하려다 검찰, 국방부, 국민권익위원회가 망가지고 있다"고 비판했다. ...',
                    keyword: ['국방부', '추미애', '국민권익위원회']
                },
                {
                    id: 1,
                    press: '동아일보',
                    title: '"전화로 "위국헌신"하게 해달라" ... 秋 아들, 안중근 비유에 "부글부글"',
                    thumnail: 'https://img.mbn.co.kr/filewww/news/other/2020/09/17/990099100290.jpg',
                    content: '추미애 법무부 장관 아들 서 모씨를 독립운동가 안중근 의사에 빗댄 박성준 더불어민주당 원내대변인이 사과했지만 논란은 가라앉지 않고 있다. 진중권 전 동양대 교수는 17일 "서일병만이 아니라 대한민국의 모든 병사가 전화 한통만으로 안중근 정신을 실천할 수 있게 해 달라"고 비판했다. ...',
                    keyword: ['국방부', '추미애', '안중근']
                }
            ]
        };
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
