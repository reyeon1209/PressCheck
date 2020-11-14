import React, { Component } from 'react';
import Split from 'react-split';

import OriginalNewsText from '../components/Analyze/OriginalNewsText';
import AnalysisReport from '../components/Analyze/AnalysisReport';
import '../components/Analyze/Analyze.css';


class Analyze extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className='App'>
                <Split className="wrap" sizes={[45, 55]}>
                    <div className="content-news" ><OriginalNewsText /></div>
                    <div className="analysis-report"><AnalysisReport  /></div>
                </Split>
            </div>
        );
    }
}

export default Analyze;
