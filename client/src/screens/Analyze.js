import React, { Component } from 'react';
import Split from 'react-split';

import OriginalNewsText from '../components/Analyze/OriginalNewsText';
import AnalysisReport from '../components/Analyze/AnalysisReport';
import '../components/Analyze/Analyze.css';


class Analyze extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin_info: [
                {
                    title: '',
                    link: '',
                    press: '',
                    category: '',
                    uploaded: '',
                    updated: '',
                    editor: '',
                    img_src: '',
                    content: '',
                    keyword: [],
                    sum_short: '',
                    sum_mid: '',
                    sum_long: ''
                }
            ],
            target_info: [
                {
                    origin_id: '',
                    target_id: '',
                    similarity: '',
                    ranking: '',
                    diffKeyword: [],
                    press: '',
                    title: ''
                }
            ]
        };
    }

    componentDidMount() {
        fetch('http://localhost:1818/article/analyze')
        .then(res => res.json())
        .then(data => this.setState({ origin_info: data }));

        fetch('http://localhost:1818/similarity/report')
        .then(res => res.json())
        .then(data => this.setState({ target_info: data }));
    }

    render() {
        return (
            <div className='App'>
                <Split className="wrap" sizes={[45, 55]}>
                    <div className="content-news"><OriginalNewsText origin_info={this.state.origin_info} /></div>
                    <div className="analysis-report"><AnalysisReport origin_info={this.state.origin_info} target_info={this.state.target_info} /></div>
                </Split>
            </div>
        );
    }
}

export default Analyze;
