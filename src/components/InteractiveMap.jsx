import React, {useState} from 'react';
import './Map.css'
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Modal} from "antd";
import avatarIcon from './images/pp1.png'
import avatarIcon2 from './images/ppp.png'
import map from './images/office.jpg'
import WorkPlaceBron from "./WorkPlaceBron";
import WorkPlaceNoBron from "./WorkPlaceNoBron";

const InteractiveMap = () => {

    const [dataPlace, setDataPlace] = useState({});


    const [statusPlace, setStatusPlace] = useState();

    const [isModalBooked, setIsModalBooked] = useState(false);
    const [isModalNoBooked, setIsModalNoBooked] = useState(false);
    const showModal = async (id) => {


        const formData = new FormData();
        formData.append('cmd', 'GETONEPLACE')
        formData.append('id', id)
        let response;
        response = await fetch('http://localhost:80/worco/', {method: 'POST', body: formData})
            .then(async response => response.json())

        setDataPlace(response);




        if (response.status_bron === '1') {
            console.log(response)
            setIsModalNoBooked(true);
        } else {
            console.log(dataPlace)
            setIsModalBooked(true);
            console.log(id)
        }


    };

    const handleOk = () => {
        setIsModalBooked(false);
        setIsModalNoBooked(false);
        setDataPlace({});
    };
    const handleCancel = () => {
        setIsModalBooked(false);
        setIsModalNoBooked(false);
        setDataPlace({});
    };

    return (
        <div className="map" >

            <img src={require("./images/office.jpg")} style={{objectFit: "cover", width: 1000, display: "block", marginRight: "auto", marginLeft: "auto"}} />
            <svg  viewBox="0 0 1509 903" >


                <g onClick={() => showModal(1)} transform="translate(320,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>
                    <path d="m 32.34422,28.20325 a 12.204591,12.204591 0 0 0 -2.63019,-3.89959 12.257783,12.257783 0 0 0 -3.8996,-2.63019 c -0.013,-0.007 -0.0261,-0.01 -0.0392,-0.0163 2.03301,-1.46846 3.35463,-3.86043 3.35463,-6.55915 0,-4.47067 -3.62221,-8.09288 -8.09288,-8.09288 -4.47067,0 -8.09288,3.62221 -8.09288,8.09288 0,2.69872 1.32162,5.09069 3.35463,6.56242 -0.0131,0.007 -0.0261,0.01 -0.0392,0.0163 -1.46194,0.61676 -2.77377,1.5011 -3.8996,2.63019 a 12.257783,12.257783 0 0 0 -2.63018,3.89959 12.129536,12.129536 0 0 0 -0.96267,4.506565 0.26106078,0.26106078 0 0 0 0.26106,0.26758 h 1.95796 c 0.14358,0 0.2578,-0.11421 0.26106,-0.25453 0.0653,-2.51924 1.07688,-4.878565 2.86514,-6.666835 1.85027,-1.85027 4.30751,-2.86841 6.92464,-2.86841 2.61713,0 5.07437,1.01814 6.92464,2.86841 1.78826,1.78827 2.79987,4.147595 2.86514,6.666835 0.003,0.14358 0.11748,0.25453 0.26106,0.25453 h 1.95796 a 0.26106078,0.26106078 0 0 0 0.26106,-0.26758 c -0.0326,-1.55984 -0.3557,-3.07726 -0.96266,-4.509825 z m -11.3072,-7.49244 c -1.49784,0 -2.90756,-0.58413 -3.96812,-1.64469 -1.06056,-1.06055 -1.64469,-2.47028 -1.64469,-3.96812 0,-1.49784 0.58413,-2.90756 1.64469,-3.96812 1.06056,-1.06056 2.47028,-1.64469 3.96812,-1.64469 1.49784,0 2.90756,0.58413 3.96812,1.64469 1.06056,1.06056 1.64469,2.47028 1.64469,3.96812 0,1.49784 -0.58413,2.90757 -1.64469,3.96812 -1.06056,1.06056 -2.47028,1.64469 -3.96812,1.64469 z"/>
                </g>
                <g onClick={() => showModal(2)} transform="translate(363,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>
                    <path d="M 33.678806,10.953456 H 8.7394633 c -0.5305656,0 -0.9592123,0.428648 -0.9592123,0.959198 v 14.867695 c 0,0.530565 0.4286467,0.959212 0.9592123,0.959212 H 20.130034 v 3.357221 h -5.155743 c -0.263781,0 -0.479598,0.215817 -0.479598,0.479599 v 1.438811 c 0,0.131931 0.107978,0.239792 0.239807,0.239792 h 12.94927 c 0.13193,0 0.239807,-0.107978 0.239807,-0.239792 v -1.438811 c 0,-0.263782 -0.215817,-0.479599 -0.479598,-0.479599 h -5.155743 v -3.357221 h 11.39057 c 0.530566,0 0.959213,-0.428647 0.959213,-0.959212 V 11.912654 c 0,-0.53055 -0.428647,-0.959198 -0.959213,-0.959198 z M 32.479802,25.581345 H 9.938468 V 13.111658 h 22.541334 z"/>
                </g>

                <g onClick={() => showModal(3)} transform="translate(363,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>

                <g onClick={() => showModal(4)} transform="translate(478,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(5)} transform="translate(478,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(6)} transform="translate(523,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(7)} transform="translate(523,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(8)} transform="translate(637,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(9)} transform="translate(637,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(10)} transform="translate(681,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(11)} transform="translate(681,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(12)} transform="translate(797,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(13)} transform="translate(797,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(14)} transform="translate(841,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(15)} transform="translate(841,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(16)} transform="translate(957,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(17)} transform="translate(957,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(18)} transform="translate(1002,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(19)} transform="translate(1001,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(20)} transform="translate(1117,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(21)} transform="translate(1117,164)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(22)} transform="translate(579,398)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(23)} transform="translate(579,471)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(24)} transform="translate(685,398)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(25)} transform="translate(685,471)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(26)} transform="translate(799,398)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(27)} transform="translate(799,471)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(28)} transform="translate(905,398)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(29)} transform="translate(905,471)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(30)} transform="translate(363,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(31)} transform="translate(363,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(32)} transform="translate(478,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(33)} transform="translate(478,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(34)} transform="translate(523,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(35)} transform="translate(523,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(36)} transform="translate(637,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(37)} transform="translate(637,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(38)} transform="translate(682,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(39)} transform="translate(682,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(40)} transform="translate(797,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(41)} transform="translate(797,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(42)} transform="translate(842,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(43)} transform="translate(842,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(44)} transform="translate(957,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(45)} transform="translate(957,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(46)} transform="translate(1002,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(47)} transform="translate(1002,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(48)} transform="translate(1117,706)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(47)} transform="translate(1117,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>
                <g onClick={() => showModal(48)} transform="translate(1157,779)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill="#D9D9D9" stroke="#000000" strokeWidth="2"/>

                </g>





                {/*<circle onClick={a} stroke="#000000" strokeWidth="5" cx="304.21936" cy="458.77676" r="35.667099"  />*/}

                {/*    <clipPath id="myCircle">*/}
                {/*        <circle stroke="#000000" strokeWidth="5" cx="250" cy="145" r="125"  />*/}

                {/*    </clipPath>*/}

                {/*<image    href={avatarIcon} clipPath="url(#myCircle)" />*/}

                {/*<path stroke="#000000" stroke-width="5" d="<!-- Тут значение атрибута -->" />*/}
                {/*<path stroke="#000000" stroke-width="5" d="<!-- Тут значение атрибута -->" />*/}


            </svg>
            <Modal title={`Место   ${(dataPlace.id !== undefined)? dataPlace.id : "-"}`} open={isModalBooked} onOk={handleOk} onCancel={handleCancel}>
                <p><UserOutlined /> Человек</p>
                <p>Забронировано</p>
            </Modal>
            <Modal title={`Место   ${(dataPlace.id !== undefined)? dataPlace.id : "-"}`} open={isModalNoBooked} onOk={handleOk} onCancel={handleCancel}>
                <p><UserOutlined /> Человек</p>
                <p>Не забронировано</p>
            </Modal>
        </div>
    );
};

export default InteractiveMap;