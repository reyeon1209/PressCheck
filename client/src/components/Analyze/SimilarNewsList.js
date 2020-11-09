import React, { Component } from 'react';
import SimilarNewsInfo from './SimilarNewsInfo';

class SimilarNewsList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { data } = this.props;
        const list = data.map(
            info => (<SimilarNewsInfo info={info} />)
        );

        return (
            <div className='similar-news-list'>
                {list}
            </div>
        );
    }
}

export default SimilarNewsList;