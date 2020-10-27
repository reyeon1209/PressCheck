import React, { Component } from 'react';
import './Todays.css'

const obj = {
    1: 'first',
    2: 'second',
    3: 'third'
}

class Keyword extends Component {
    state = {
        activeTab : 0
    }

    handleClickTab = (id) => {
        console.log(id);
    }

    render() {
        return (
            <div className='today-background'>
                <ul className='keyword'>
                    <li onClick={() => this.handleClickTab(1)}>1</li>
                    <li onClick={() => this.handleClickTab(2)}>2</li>
                    <li onClick={() => this.handleClickTab(3)}>3</li>
                </ul>
                {obj[this.state.activeTab]}
            </div>
        );
    }
} 
export default Keyword;
