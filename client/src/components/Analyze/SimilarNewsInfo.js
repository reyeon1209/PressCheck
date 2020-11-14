import React, { Component } from 'react';

import './Analyze.css';


class SimilarNewsInfo extends Component {
    static defaultProps = {
        info: {
            id: 0,
            ranking: 1,
            press: '언론사',
            title: '뉴스 제목',
            similarity: 98,
            diffKeyword: ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5']
        }
    }

    render() {
        // eslint-disable-next-line
        const {ranking, press, title, similarity, diffKeyword} = this.props;
        const diffKeywordList = diffKeyword.map((kw) => {return (<div className="diff-keyword">#{kw}&nbsp;&nbsp;</div>)})

        return (
            <tr className='similar-news-info'>
                <td><b>{ranking}</b></td>
                <td>{press}</td>
                <td className='similar-news-info-title'>{title}</td>
                <td>{similarity}</td>
                <td>{diffKeywordList}</td>
            </tr>
        );
    }
}

export default SimilarNewsInfo;