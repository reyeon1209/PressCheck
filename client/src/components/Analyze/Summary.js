import React, { Component } from 'react';

import Short from '../../assets/images/short.png';
import Middle from '../../assets/images/middle.png';
import Long from '../../assets/images/long.png';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showShort: false,
            showMiddle: true,
            showLong: false,
            summary: {
                sum_short: '현대자동차 준중형 SUV "신형 투산"이 출시됐다.',
                sum_mid: '현대자동차 준중형 SUV "신형 투산"이 출시됐다. 사전계약 첫날에 1만대를 돌파했다.',
                sum_long: '현대자동차 준중형 SUV "신형 투산"이 출시됐다. 사전계약 첫날에 1만대를 돌파했다. 한줄 더 있다.'
            }
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
        const { sum_short, sum_mid, sum_long } = this.state.summary;
        return (
            <div>
                <button onClick={() => this.summaryClickHandler("showShort")} ><img src={Short} alt="한줄요약" value="short" /></button>
                <button onClick={() => this.summaryClickHandler("showMiddle")} ><img src={Middle} alt="두줄요약" value="middle" /></button>
                <button onClick={() => this.summaryClickHandler("showLong")} ><img src={Long} alt="세줄요약" value="long" /></button>
                <div>{ showShort ? sum_short : null}</div>
                <div>{ showMiddle ? sum_mid : null}</div>
                <div>{ showLong ? sum_long : null}</div>
            </div>
        );
    }
}

export default Summary;