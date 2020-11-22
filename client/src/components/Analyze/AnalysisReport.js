import React, { Component } from 'react';

import EmailDialog from './EmailDialog';
import SimilarNewsList from './SimilarNewsList';
import Summary from './Summary';
import './Analyze.css';

import Report from '../../assets/images/report.png';


class AnalysisReport extends Component {
    static defaultProps = {
        origin_info: [],
        target_info: []
    }

    render() {
        // eslint-disable-next-line
        var { point_keyword } = this.props.origin_info;
        var target_info = [];
        target_info = this.props.target_info;
        
        const keywordList = point_keyword &&
                    point_keyword.map(kw => {
                        return (<div className="analyze-keyword">#{kw}&nbsp;&nbsp;</div>)
                    });
        

        return (
            <div>
                <div className='analysis-report-title'>
                    <img src={Report} alt="Report" value="Report" />
                    <div>분석 리포트</div>
                </div>

                <div className='email-send'>
                    <EmailDialog />
                </div><br/><br/>
                
                <table className='keyword-summary'>
                    <tr>
                        <td className='title-td'>키워드</td>
                        <td className='keyword-td'>{keywordList}</td>
                    </tr>
                    <tr>
                        <td className='title-td'>기사 요약</td>
                        <td className='summary-td'><Summary origin_info={this.props.origin_info} /></td>
                    </tr>
                </table>

                <div className='similar-title'>유사한 뉴스</div>
                <div className='similar-aggregate'>※ 0시 ~ 1시까지 집계한 뉴스리스트입니다.</div>
                <SimilarNewsList target_info={target_info} />
            </div>
        );
    }
}

export default AnalysisReport;