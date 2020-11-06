import React, { Component } from 'react';
import {ReactComponent as Empty} from '../../assets/images/thumbnail.svg';
import './Home.css';

class TopNewsInfo extends Component {
    static defaultProps = {
        info: {
            id: 1,
            title: '뉴스 제목'
        }
    }

    render() {
        const {id, title} = this.props.info;

        return (
            <div className='topnews-info'>
                <div className='topnews-content'>
                    <div className='topnews-content_id'>{id}</div>
                    <div className='topnews-content_title'>{title}</div>
                </div>
                <div className='topnews-thumbnail'><Empty /></div>        
                <br></br>
            </div>
        );
    }
}

export default TopNewsInfo;