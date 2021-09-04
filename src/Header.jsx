import React, {useState} from "react";
import './Head.scss';
import TitleBack from './images/title_background.png';

const Header = () => {
    const [count,setCount] = useState(0);

    const handleClick = () => {
        setCount(() => count +1);
    };

    return (
        <div className = "header">
            <p className = "subject">遠的記録 & 点数集計</p>
        </div>
    )
}

export default Header;
