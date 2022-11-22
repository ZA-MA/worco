import React from 'react';
import './Map.css'
import {UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import avatarIcon from './images/pp1.png'
import avatarIcon2 from './images/ppp.png'
import map from './images/office.png'
const InteractiveMap = () => {
    function a(){
        console.log(12345)
    }
    function b(){
        console.log(12345)
    }
    return (
        <div className="map">

            <img src={require("./images/office.png")}/>
            <svg viewBox="0 0 908 542" >
                <g onClick={a}>
                    <circle  stroke="#000000" strokeWidth="5" cx="341.28516" cy="356.67096" r="44.059357"  />
                    <image y='325.17242' x='310.21225' height='64.422821' width='67.665359'  href={avatarIcon}/>
                </g>
                <image color='#452' onClick={a} stroke="#000000" strokeWidth="5" x="508.01968" y="325.17242" width="67.665359" height="64.422821" href={avatarIcon}/>


                {/*<circle onClick={a} stroke="#000000" strokeWidth="5" cx="304.21936" cy="458.77676" r="35.667099"  />*/}

                    <clipPath id="myCircle">
                        <circle stroke="#000000" strokeWidth="5" cx="250" cy="145" r="125"  />

                    </clipPath>

                <image    href={avatarIcon} clipPath="url(#myCircle)" />

                {/*/!*<path stroke="#000000" stroke-width="5" d="<!-- Тут значение атрибута -->" />*!/*/}
                {/*/!*<path stroke="#000000" stroke-width="5" d="<!-- Тут значение атрибута -->" />*!/*/}


            </svg>
        </div>
    );
};

export default InteractiveMap;