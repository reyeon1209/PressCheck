import React, { Component } from 'react';

import './Todays.css'


class Keyword extends Component {
    state = {
        activeTab : 0
    }

    handleClickTab = (id) => {
        console.log(id);
        this.setState({activeTab: id})
    }

    render() {
        return (
            <div>
                <ul className='tab-clear'>
                    <li className='tabs' onClick={() => this.handleClickTab(0)}>전체</li>
                    <li className='tabs' onClick={() => this.handleClickTab(1)}>정치</li>
                    <li className='tabs' onClick={() => this.handleClickTab(2)}>사회</li>
                    <li className='tabs' onClick={() => this.handleClickTab(3)}>경제</li>
                    <li className='tabs' onClick={() => this.handleClickTab(4)}>국제</li>
                    <li className='tabs' onClick={() => this.handleClickTab(5)}>스포츠</li>
                    <li className='tabs' onClick={() => this.handleClickTab(6)}>문화</li>
                </ul>
            </div>
        );
    }
} 
export default Keyword;
