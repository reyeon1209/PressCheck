import React, { Component } from 'react';
import Axios from 'axios';
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
                    sum_long: '',
                    porint_keyword: []
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
        // URL에서 id만 cutting
        var id = "";
        var url = window.location.href;
        var params = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        for (var i = 0; i < params.length; i++) {
            var varName = params[i].split('=')[0];
            if (varName == "id") {
                id = params[i].split('=')[1];
            }
        }

        // cutting한 id로 post
        const variable = { id: id };
        Axios.post('http://localhost:1818/article/analyze', variable)
            .then(response => {
                this.setState({ origin_info: response.data });
            });

        Axios.get('http://localhost:1818/similarity/report')
            .then(response => {
                this.setState({ target_info: response.data });
            });
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
