import React, { Component } from 'react';
import TimeKeyword from './TimeKeyword';

class TimeKeywordList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { data } = this.props;
        const list = data.map(
            info => (<TimeKeyword info={info} />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default TimeKeywordList;