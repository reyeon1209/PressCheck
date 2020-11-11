import React, { Component } from 'react';
import '../components/Analyze/Analyze.css';
import OriginalNewsText from '../components/Analyze/OriginalNewsText';
import AnalysisReport from '../components/Analyze/AnalysisReport';


// TODO (News/NewsList화면 기사랑 연결)
class Analyze extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <table className="wrapper">
                <tr className="table-background">
                    <td className="content-news">
                        <div><OriginalNewsText /></div>
                    </td>
                    <td>
                        <div className='analysis-report'>
                            <AnalysisReport />
                        </div>
                    </td>
                </tr>
            </table>
        );
    }
}

export default Analyze;
