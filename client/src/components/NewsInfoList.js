import React, { Component } from 'react';
import NewsInfo from './NewsInfo';

class NewsInfoList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { data } = this.props;
        const list = data.map(
            info => (<NewsInfo info={info} />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default NewsInfoList;