import React, { Component } from 'react';
import './Analyze.css';

class SimilarNewsInfo extends Component {
    static defaultProps = {
        info: {
            id: 0,
            ranking: 1,
            press: '언론사',
            title: '뉴스 제목',
            similarity: 98
        }
    }

    render() {
        // eslint-disable-next-line
        const {ranking, press, title, similarity} = this.props.info;

        return (
            <div className='similar-news-info'>
                <tr>
                    <td>{ranking}</td>
                    <td>{press}</td>
                    <td><b>{title}</b></td>
                    <td>{similarity}</td>
                </tr>
            </div>
        );
    }
}

export default SimilarNewsInfo;