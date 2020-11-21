import React, { Component } from 'react';

import './Home.css';

import Hankyoreh from '../../assets/images/press_hankyoreh.png';
import Jungang from '../../assets/images/press_jungang.png';
import Donga from '../../assets/images/press_donga.png';
import KBS from '../../assets/images/press_kbs.png';
import SBS from '../../assets/images/press_sbs.png';
import Kukmin from '../../assets/images/press_kukmin.png';
import Yeonhap from '../../assets/images/press_yeonhap.png';


class SelectTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAll: true,
            isPolitics: false,
            isSociety: false,
            isEconomy: false,
            isInternation: false,
            isSports: false,
            isCulture: false,
            currentPress: 'hankyoreh',
        };
        
        this.categoryAllClickHandler = this.categoryAllClickHandler.bind(this);
        this.categoryPoliticsClickHandler = this.categoryPoliticsClickHandler.bind(this);
        this.categorySocietyClickHandler = this.categorySocietyClickHandler.bind(this);
        this.categoryEconomyClickHandler = this.categoryEconomyClickHandler.bind(this);
        this.categoryInternationClickHandler = this.categoryInternationClickHandler.bind(this);
        this.categorySportsClickHandler = this.categorySportsClickHandler.bind(this);
        this.categoryCultureClickHandler = this.categoryCultureClickHandler.bind(this);
        this.pressClickHandler = this.pressClickHandler.bind(this);
    }

    categoryAllClickHandler() {
        this.setState(initialState => ({
            isAll: true,
            isPolitics: false,
            isSociety: false,
            isEconomy: false,
            isInternation: false,
            isSports: false,
            isCulture: false
        }));
    }

    categoryPoliticsClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isPolitics: !initialState.isPolitics
        }));
    }

    categorySocietyClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isSociety: !initialState.isSociety
        }));
    }

    categoryEconomyClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isEconomy: !initialState.isEconomy
        }));
    }

    categoryInternationClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isInternation: !initialState.isInternation
        }));
    }

    categorySportsClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isSports: !initialState.isSports
        }));
    }

    categoryCultureClickHandler() {
        this.setState(initialState => ({
            isAll: false,
            isCulture: !initialState.isCulture
        }));
    }

    pressClickHandler(data) {
        console.log(data);
        this.setState({ currentPress: data });
    }

    render() {
        return (
            <div>
                <table className="left-table">
                    <caption className="left-table-title"><a href = '../todays'>DATA &gt;</a></caption>
                    <tr>
                        <th className="left-table-content">
                            <div className='left-button-category'>
                            <input type="checkbox"
                                checked={this.state.isAll}
                                onChange={this.categoryAllClickHandler}
                            /> 전체
                            <input type="checkbox"
                                checked={this.state.isPolitics}
                                onChange={this.categoryPoliticsClickHandler}
                            /> 정치
                            <input type="checkbox"
                                checked={this.state.isSociety}
                                onChange={this.categorySocietyClickHandler}
                            /> 사회
                            <input type="checkbox"
                                checked={this.state.isEconomy}
                                onChange={this.categoryEconomyClickHandler}
                            /> 경제
                            <br></br>
                            <input type="checkbox"
                                checked={this.state.isInternation}
                                onChange={this.categoryInternationClickHandler}
                            /> 국제
                            <input type="checkbox"
                                checked={this.state.isSports}
                                onChange={this.categorySportsClickHandler}
                            /> 스포츠
                            <input type="checkbox"
                                checked={this.state.isCulture}
                                onChange={this.categoryCultureClickHandler}
                            /> 문화
                            </div>
                            <hr></hr>
                        </th>
                    </tr>
                    <tr>
                        <th className="left-table-content">
                            <div className='left-button-press'>
                                <button className='left-button'><img src={Hankyoreh} alt="hankyoreh" onClick={() => this.pressClickHandler("hankyoreh")} value="hankyoreh"/></button>
                                <button className='left-button'><img src={Jungang} alt="jungang" onClick={() => this.pressClickHandler("jungang")} value="jungang"/></button>
                                <button className='left-button'><img src={Donga} alt="donga" onClick={() => this.pressClickHandler("donga")} value="donga"/></button>
                                <br></br>
                                <button className='left-button'><img src={KBS} alt="kbs" onClick={() => this.pressClickHandler("kbs")} value="kbs" /></button>
                                <button className='left-button'><img src={SBS} alt="sbs" onClick={() => this.pressClickHandler("sbs")} value="sbs" /></button>
                                <button className='left-button'><img src={Kukmin} alt="kukmin" onClick={() => this.pressClickHandler("kukmin")} value="kukmin" /></button>
                                <button className='left-button'><img src={Yeonhap} alt="yeonhap" onClick={() => this.pressClickHandler("yeonhap")} value="yeonhap" /></button>
                            </div>
                        </th>
                    </tr>
                </table>
            </div>
        );
    }
} 
export default SelectTable;
