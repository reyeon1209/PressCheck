import React, { Component } from 'react';

import './Analyze.css';


class SimilarNewsInfo extends Component {
    static defaultProps = {
        target_info: {
            id: 0,
            origin_id: 0,
            target_id: 0,
            similarity: 0,
            ranking: 1,
            diffKeyword: [],
            press: '',
            title: ''
        }
    }

    render() {
        // eslint-disable-next-line   
        var origin_id = ''; origin_id = this.props.origin_id;
        var target_id = ''; target_id = this.props.target_id;
        var similarity = 0; similarity = this.props.similarity;
        var ranking = 0; ranking = this.props.ranking;
        var press = ''; press = this.props.press;
        var title = ''; title = this.props.title;
        var diffKeyword = [];
        diffKeyword = this.props.diffKeyword;
        const diffKeywordList = diffKeyword.map((kw, i) => {
            if (i < 5)
                return (<div className="diff-keyword">#{kw}</div>)
            else
                return (<div></div>);
        })

        return (
            <tr className='similar-news-info'>
                <td><b>{ranking}</b></td>
                <td>{press}</td>
                <td className='similar-news-info-title'>{title}</td>
                <td>{similarity}%</td>
                <td className='similar-news-info-keyword'>{diffKeywordList}</td>
            </tr>
        );
    }
}

export default SimilarNewsInfo;