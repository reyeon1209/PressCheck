import React from 'react'
import { ReactComponent as Josun } from '../assets/images/press_josun.svg';
import { ReactComponent as Jungang } from '../assets/images/press_jungang.svg';
import { ReactComponent as Donga } from '../assets/images/press_donga.svg';
import { ReactComponent as KBS } from '../assets/images/press_kbs.svg';
import { ReactComponent as SBS } from '../assets/images/press_sbs.svg';
import { ReactComponent as Kukmin } from '../assets/images/press_kukmin.svg';
import { ReactComponent as Yeonhap } from '../assets/images/press_yeonhap.svg';

function Checkbox( props ) {
    
    let pressComponent;

    if (props.id === 1)
        pressComponent = <Josun />
    else if (props.id === 2)
        pressComponent = <Jungang />
    else if (props.id === 3)
        pressComponent = <Donga />
    else if (props.id === 4)
        pressComponent = <KBS />
    else if (props.id === 5)
        pressComponent = <SBS />
    else if (props.id === 6)
        pressComponent = <Kukmin />
    else if (props.id === 7)
        pressComponent = <Yeonhap />

    return (
        <li>
            <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {pressComponent}
        </li>
    )
}

export default Checkbox