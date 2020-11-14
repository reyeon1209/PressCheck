import React, { Component } from 'react';
import Split from 'react-split';

import SelectTable from '../components/Home/SelectTable';
import TopNewsList from '../components/Home/TopNewsList';
import '../components/Home/Home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            information: [
                {
                    id: 1,
                    title: '[속보] 주호명 "국방부가 추장관 지키는 추방부, 서씨 지키는 서방부 됐다',
                    thumnail: 'https://imgmmw.mbn.co.kr/storage/news/2020/09/17/1374B399-A6F6-488C-A404-E31A38DF1BE1_576.jpg',
                },
                {
                    id: 2,
                    title: '"전화로 "위국헌신"하게 해달라"... 秋 아들, 안중근 비유에 "부글부글"',
                    thumnail: 'https://img.mbn.co.kr/filewww/news/other/2020/09/17/990099100290.jpg',
                },
                {
                    id: 3,
                    title: '"파격" 신형 투싼, 경쟁차엔 "충격"...사전계약 첫날, 1만대 돌파',
                    thumnail: 'https://file.mk.co.kr/meet/neds/2020/09/image_readtop_2020_960165_16003051264359396.jpg',
                },
                {
                    id: 4,
                    title: '윤지오가 소재불명? SNS에 버젓이 파티 영상 올렸다',
                    thumnail: 'https://img.sbs.co.kr/newimg/news/20200917/201472123_1280.jpg',
                },
                {
                    id: 5,
                    title: '[속보] 서울 63-경기 54명-충남 10명-인천 7명-경북 6명 등 확진',
                    thumnail: 'https://img8.yna.co.kr/photo/yna/YH/2020/09/16/PYH2020091616530001300_P2.jpg',
                }
            ]
        };
    }

    render() {
        return (
            <div className='App'>
                <Split className="wrap">
                    <SelectTable />
                    <div className='right-news-list'>
                        <div className='right-news-title'>가장 많이 본 뉴스 TOP 5</div>
                        <div className='right-aggregate'>※ 0시 ~ 1시까지 집계한 뉴스리스트입니다.</div>
                        <TopNewsList data={this.state.information} />
                        <a className='more' href = '../news/newslist'>더보기 &gt;</a>
                    </div>
                </Split>    
            </div>
        );
    }
} 
export default Home;
