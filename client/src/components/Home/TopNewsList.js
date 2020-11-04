import React, { Component } from 'react';
import TopNewsInfo from './TopNewsInfo';

class TopNewsList extends Component {
    static defaultProps = {
        info: []
    }

    render() {
        const { data } = this.props;
        const list = data.map(
            info => (<TopNewsInfo info={info} />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default TopNewsList;