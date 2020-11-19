import React, { Component } from 'react';

import SimilarNewsInfo from './SimilarNewsInfo';


class SimilarNewsList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { data } = this.props;
        const list = data.map((info) => {
            return (<SimilarNewsInfo ranking={info.ranking}
                                    press={info.press}
                                    title={info.title}
                                    similarity={info.similarity}
                                    diffKeyword={info.diffKeyword}
                    />);
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