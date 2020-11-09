import React, { Component } from 'react';
import '../components/Analyze/Analyze.css';
import OriginalNewsText from '../components/Analyze/OriginalNewsText';
import AnalysisReport from '../components/Analyze/AnalysisReport';

import Report from '../assets/images/report.png';

// TODO (News/NewsList화면 기사랑 연결)
class Analyze extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div>
                <img src={Report} alt="Report" value="Report" />
                <div className='report-title'>분석 리포트</div>
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
