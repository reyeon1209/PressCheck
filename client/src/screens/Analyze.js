import React, { Component } from 'react';
import Split from 'react-split';

import OriginalNewsText from '../components/Analyze/OriginalNewsText';
import AnalysisReport from '../components/Analyze/AnalysisReport';
import '../components/Analyze/Analyze.css';


class Analyze extends Component {
    constructor(props) {
        super(props);
        this.state = {
            information: {
                keyword: [],
                title: "",
                link: "",
                press: "",
                category: "",
                uploaded: "",
                updated: "",
                editor: "",
                img_src: "",
                content: "",
                pre_content: "",
                sum_short: "",
                sum_mid: "",
                sum_long: ""
            }
        };
    }

    componentDidMount() {
        fetch('http://localhost:1818/article/analyze')
        .then(res => res.json())
        .then(data => this.setState({ information: data }));
    }

    render() {
        console.log(this.state.information);
        return (
            <div className='App'>
                <Split className="wrap" sizes={[45, 55]}>
                    <div className="content-news"><OriginalNewsText data={this.state.information} /></div>
                    <div className="analysis-report"><AnalysisReport data={this.state.information} /></div>
                </Split>
            </div>
        );
    }
}

export default Analyze;
