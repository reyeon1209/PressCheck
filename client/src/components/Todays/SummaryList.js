import React, { Component } from 'react';
import Summary from './Summary';

class SummaryList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { data } = this.props;
        const list = data.map(
            info => (<Summary info={info} />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default SummaryList;