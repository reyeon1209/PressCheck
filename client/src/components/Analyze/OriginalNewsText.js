import React, { Component } from 'react';

import './Analyze.css';

import Reporter from '../../assets/images/reporter.png';


class OriginalNewsText extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        // eslint-disable-next-line
        const { title, uploaded, updated, editor, img_src, content } = this.props.data;
        
        if (img_src == '') {
            return (
                <div>
                    <div className='original-news-title'><b>{title}</b></div>
                    <div className='original-news-upload'>{uploaded}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{updated}</div>
                    <div>{editor}</div>
                    <div className='original-news-text'>{content}</div> 
                </div>
            );
        } else {
            return (
                <div>
                    <div className='original-news-title'><b>{title}</b></div>
                    <div className='original-news-upload'>{uploaded}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{updated}</div>
                    <div>{editor}</div>
                    <img className='original-news-thumbnail' src={img_src} alt="thumnail" value="thumnail"/>
                    <div className='original-news-text'>{content}</div> 
                </div>
            );
        }        
    }
}

export default OriginalNewsText;