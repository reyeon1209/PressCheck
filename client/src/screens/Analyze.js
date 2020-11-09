import React, { Component } from 'react';
import '../components/Analyze/Analyze.css';
import OriginalNewsText from '../components/Analyze/OriginalNewsText';
import AnalysisReport from '../components/Analyze/AnalysisReport';

// TODO (Analyze화면 기사랑 연결)
class Analyze extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div>
                <div className='original-news-text'>
                    <OriginalNewsText />
                </div>

                <div className='analysis-report'>
                    <AnalysisReport />
                </div>
            </div>
        );
    }
}

export default Analyze;
