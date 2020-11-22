import React, { Component } from 'react';

import './Analyze.css';


class OriginalNewsText extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        // eslint-disable-next-line
        var { title, uploaded, updated, editor, img_src, content } = this.props.data;
        
        return (
            <div>
                <div className='original-news-title'><b>{title}</b></div>
                <div className='original-news-upload'>{uploaded}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{updated}</div>
                <div>{editor}</div>
                <div>{img_src}</div>
                <div className='original-news-text'>{content}</div> 
            </div>
        );     
    }
}

export default OriginalNewsText;