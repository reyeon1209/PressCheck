import React, { Component } from 'react';
import Keyword from './KeywordInfo';
import './Todays.css';

class KeywordInfoList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { data } = this.props;
        const list = data.map(
            info => (<Keyword info={info} />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default KeywordInfoList;