import React, { Component } from 'react';

import SimilarNewsInfo from './SimilarNewsInfo';


class SimilarNewsList extends Component {
    static defaultProps = {
        target_info: []
    }

    render() {
        var ind = 0;
        const list = (this.props.target_info).map((info, i) => {
            if (info.similarity > 25) {
                ind++;
                return (<SimilarNewsInfo origin_id={info.origin_id}
                                        target_id={info.target_id}
                                        similarity={info.similarity}
                                        ranking={ind}
                                        diffKeyword={info.diffKeyword}
                                        press={info.press}
                                        title={info.title}       
                        />);
                }
        });

        return (
            <div className='similar-news-list'>
                <table className="right-botton-table">
                    <tr>
                        <th>순위</th>
                        <th>언론사</th>
                        <th>뉴스 기사</th>
                        <th>유사도</th>
                        <th>차이점 키워드</th>
                    </tr>
                    {list}
                </table>
            </div>
        );
    }
}

export default SimilarNewsList;