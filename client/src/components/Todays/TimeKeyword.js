import React, { Component } from 'react';
import './Todays.css';

class TimeKeyword extends Component {
    static defaultProps = {
        info: {
            title: '0시 ~ 6시',
            keyword: ['#언텍트1', '#메이플스토리m1', '#추석1', '#단풍1', '#미술관1']
        }
    }

    render() {
        // eslint-disable-next-line
        const { title, keyword } = this.props.info;

        return (
            <div>
                <div className='timeKeyword-title'>{title}</div>
                {/*<div className='timeKeyword-content'>
                {keyword[0]}<br></br>{keyword[1]}<br></br>{keyword[2]}<br></br>{keyword[3]}<br></br>{keyword[4]}
        </div>*/}
            </div>
        );
    }
}

export default TimeKeyword;