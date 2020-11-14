import React, { Component } from 'react';

import './Todays.css';


class TimeKeyword extends Component {
    static defaultProps = {
        info: {
            title: '0시 ~ 6시',
            keyword: ['언텍트1', '메이플스토리m1', '추석1', '단풍1', '미술관1']
        }
    }

    render() {
        // eslint-disable-next-line
        const { title, keyword } = this.props.info;
        const keywordList = keyword.map((kw) => {return (<div className="timeKeyword-content">#{kw}</div>)})

        return (
            <div className='timeKeyword-table'>
                <div className='timeKeyword-title'>{title}</div>
                {keywordList}
            </div>
        );
    }
}

export default TimeKeyword;