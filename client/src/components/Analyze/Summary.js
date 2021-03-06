import React, { Component } from 'react';

import './Analyze.css';

import Short from '../../assets/images/short.png';
import Middle from '../../assets/images/middle.png';
import Long from '../../assets/images/long.png';
import ClickShort from '../../assets/images/short_click.png';
import ClickMiddle from '../../assets/images/middle_click.png';
import ClickLong from '../../assets/images/long_click.png';


class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showShort: false,
            showMiddle: true,
            showLong: false,
            origin_info: []
        };

        this.summaryClickHandler = this.summaryClickHandler.bind(this);
    }

    summaryClickHandler(name) {
        console.log(name);

        switch (name) {
            case 'showShort':
                this.setState({
                    showShort: true,
                    showMiddle: false,
                    showLong: false
                });
                break;
            case 'showMiddle':
                this.setState({
                    showShort: false,
                    showMiddle: true,
                    showLong: false
                });
                break;
            case 'showLong':
                this.setState({
                    showShort: false,
                    showMiddle: false,
                    showLong: true
                });
                break;
        }
    }

    render() {
        const { showShort, showMiddle, showLong } = this.state;
        const { sum_short, sum_mid, sum_long } = this.props.origin_info;
        
        return (
            <div className='summary-td'>
                <button onClick={() => this.summaryClickHandler("showShort")} ><img src={ showShort ? ClickShort : Short} alt="한줄요약" value="short" /></button>
                <button onClick={() => this.summaryClickHandler("showMiddle")} ><img src={ showMiddle ? ClickMiddle : Middle} alt="두줄요약" value="middle" /></button>
                <button onClick={() => this.summaryClickHandler("showLong")} ><img src={ showLong ? ClickLong : Long} alt="세줄요약" value="long" /></button>
                <div>{ showShort ? sum_short : null}</div>
                <div>{ showMiddle ? sum_mid : null}</div>
                <div>{ showLong ? sum_long : null}</div>
            </div>
        );
    }
}

export default Summary;