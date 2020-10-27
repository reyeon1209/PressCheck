import React from 'react'
import Josun from '../../assets/images/press_josun.png';
import Jungang from '../../assets/images/press_jungang.png';
import Donga from '../../assets/images/press_donga.png';
import KBS from '../../assets/images/press_kbs.png';
import SBS from '../../assets/images/press_sbs.png';
import Kukmin from '../../assets/images/press_kukmin.png';
import Yeonhap from '../../assets/images/press_yeonhap.png';

function ButtonPress( props ) {
    
    let pressComponent;

    if (props.id === 1)
        pressComponent = Josun
    else if (props.id === 2)
        pressComponent = Jungang
    else if (props.id === 3)
        pressComponent = Donga
    else if (props.id === 4)
        pressComponent = KBS
    else if (props.id === 5)
        pressComponent = SBS
    else if (props.id === 6)
        pressComponent = Kukmin
    else if (props.id === 7)
        pressComponent = Yeonhap

    return (
        <li>
            <button key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" value={props.value} /> <img src={pressComponent} />
        </li>
    )
}

export default ButtonPress;