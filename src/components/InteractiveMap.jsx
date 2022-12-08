import React, {useEffect, useState} from 'react';
import './Map.css'
import {UserOutlined} from "@ant-design/icons";
import {Avatar, DatePicker, Input, Modal, message, Button, Checkbox, Popconfirm} from "antd";
import avatarIcon from './images/pp1.png'
import avatarIcon2 from './images/ppp.png'
import map from './images/office.jpg'
import WorkPlaceBron from "./WorkPlaceBron";
import WorkPlaceNoBron from "./WorkPlaceNoBron";
import {logDOM} from "@testing-library/react";



const InteractiveMap = () => {
    const [isModalBooked, setIsModalBooked] = useState(false);
    const [isModalNoBooked, setIsModalNoBooked] = useState(false);

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

    const [places, setPlaces] = useState();
    const [usersPlaces, setUsersPlaces] = useState({});

    const [dataPlace, setDataPlace] = useState({});
    const [dataUser, setDataUser] = useState({})
    async function getDataUser() {
        const formData = new FormData();
        formData.append('cmd', 'GETUSER')
        formData.append('user', localStorage.getItem('UserName'))
        let response;
        response = await fetch('http://localhost:80/worco/', {method: 'POST', body: formData})
            .then(response => response.json())
        setDataUser(response)
    }

    const getPlaces= async () =>{
        const formData1 = new FormData();
        formData1.append('cmd', 'GETALLPLACE')

        let response;
        response = await fetch('http://localhost:80/worco/', {method: 'POST', body: formData1})
            .then(async response => response.json())
        setPlaces(response)

    }

    const getUsersPlaces= async (id) =>{

        const formData1 = new FormData();
        formData1.append('cmd', 'GETUSERSPLACE')
        formData1.append('id', id)

        let response;
        response = await fetch('http://localhost:80/worco/', {method: 'POST', body: formData1})
            .then(response => response.json())
        await setUsersPlaces(response)

    }

    const [messageApi, contextHolder] = message.useMessage();
    const showModal = async (id) => {

        const formData = new FormData();
        formData.append('cmd', 'GETONEPLACE')
        formData.append('id', id)
        let response;
        response = await fetch('http://localhost:80/worco/', {method: 'POST', body: formData})
            .then(async response => response.json())


        setDataPlace(response);


        if (response.status_bron === 0 && localStorage.getItem('Place') == '0' && (response.activity_status !== 1 || dataUser.status === 'admin') ) {
            //не забронировано

            setIsModalNoBooked(true);
        } else if(response.status_bron === 1 && (response.activity_status !== 1 || dataUser.status === 'admin')){
            //забронировано
            setIsModalBooked(true);
        }else if(dataUser.workplace_id !== 0 && response.activity_status !== 1 ){
            messageApi.open({
                type: 'warning',
                content: `У вас уже забронировано место №${dataUser.workplace_id}`,
                className: 'custom-class',

                style: {
                    marginTop: '3vh',
                },
            });
        }else if(response.activity_status === 1 || dataUser.status !== 'admin'){
            messageApi.open({
                type: 'warning',
                content: `Это место неактивно`,
                className: 'custom-class',

                style: {
                    marginTop: '3vh',
                },
            });
        }


    };



    const IconPlace = (props) => {

        if(places !== undefined){

            if (places[props.id].status_bron === 1) {
                //забронировано
                return <path
                    d="m 32.34422,28.20325 a 12.204591,12.204591 0 0 0 -2.63019,-3.89959 12.257783,12.257783 0 0 0 -3.8996,-2.63019 c -0.013,-0.007 -0.0261,-0.01 -0.0392,-0.0163 2.03301,-1.46846 3.35463,-3.86043 3.35463,-6.55915 0,-4.47067 -3.62221,-8.09288 -8.09288,-8.09288 -4.47067,0 -8.09288,3.62221 -8.09288,8.09288 0,2.69872 1.32162,5.09069 3.35463,6.56242 -0.0131,0.007 -0.0261,0.01 -0.0392,0.0163 -1.46194,0.61676 -2.77377,1.5011 -3.8996,2.63019 a 12.257783,12.257783 0 0 0 -2.63018,3.89959 12.129536,12.129536 0 0 0 -0.96267,4.506565 0.26106078,0.26106078 0 0 0 0.26106,0.26758 h 1.95796 c 0.14358,0 0.2578,-0.11421 0.26106,-0.25453 0.0653,-2.51924 1.07688,-4.878565 2.86514,-6.666835 1.85027,-1.85027 4.30751,-2.86841 6.92464,-2.86841 2.61713,0 5.07437,1.01814 6.92464,2.86841 1.78826,1.78827 2.79987,4.147595 2.86514,6.666835 0.003,0.14358 0.11748,0.25453 0.26106,0.25453 h 1.95796 a 0.26106078,0.26106078 0 0 0 0.26106,-0.26758 c -0.0326,-1.55984 -0.3557,-3.07726 -0.96266,-4.509825 z m -11.3072,-7.49244 c -1.49784,0 -2.90756,-0.58413 -3.96812,-1.64469 -1.06056,-1.06055 -1.64469,-2.47028 -1.64469,-3.96812 0,-1.49784 0.58413,-2.90756 1.64469,-3.96812 1.06056,-1.06056 2.47028,-1.64469 3.96812,-1.64469 1.49784,0 2.90756,0.58413 3.96812,1.64469 1.06056,1.06056 1.64469,2.47028 1.64469,3.96812 0,1.49784 -0.58413,2.90757 -1.64469,3.96812 -1.06056,1.06056 -2.47028,1.64469 -3.96812,1.64469 z"/>
            } else if (places[props.id].status_bron === 0) {
                //не забронировано
                return <path d="M 33.678806,10.953456 H 8.7394633 c -0.5305656,0 -0.9592123,0.428648 -0.9592123,0.959198 v 14.867695 c 0,0.530565 0.4286467,0.959212 0.9592123,0.959212 H 20.130034 v 3.357221 h -5.155743 c -0.263781,0 -0.479598,0.215817 -0.479598,0.479599 v 1.438811 c 0,0.131931 0.107978,0.239792 0.239807,0.239792 h 12.94927 c 0.13193,0 0.239807,-0.107978 0.239807,-0.239792 v -1.438811 c 0,-0.263782 -0.215817,-0.479599 -0.479598,-0.479599 h -5.155743 v -3.357221 h 11.39057 c 0.530566,0 0.959213,-0.428647 0.959213,-0.959212 V 11.912654 c 0,-0.53055 -0.428647,-0.959198 -0.959213,-0.959198 z M 32.479802,25.581345 H 9.938468 V 13.111658 h 22.541334 z"/>

                //цифры
                //return <text x="21.5" y="29.5" textAnchor="middle" textAnchor="middle" fill="black" fontSize="24px" fontFamily="Montserrat" fontWeight="1000">{props.id}</text>

            } else {
                console.log("error")
            }
        }
    };

    const statusActivity = (id) =>{
        if(places !== undefined){

            if (places[id].activity_status === 1) {
                //
                return "#D9D9D980"
            } else if (places[id].activity_status === 0) {
                //не забронировано
                return "#D9D9D9"
            } else {
                console.log("error")
            }
        }
    }

    const GetUserPlace =  (props) => {
        getUsersPlaces(props.id)

    };



    const [dateBron1, setDateBron1] = useState();
    const [dateBron2, setDateBron2] = useState();

    const bookPlace = async () => {
        //бронирование рабочего места
        if (dateBron1 !== undefined && dateBron2 !== undefined) {
            const formData = new FormData();
            formData.append('cmd', 'BOOKPLACE')
            formData.append('id', dataPlace.id)
            formData.append('start_booking', dateBron1)
            formData.append('end_booking', dateBron2)
            formData.append('user_id', dataUser.id)


            await fetch('http://localhost:80/worco/', {method: 'POST', body: formData}).then(response => response.json())
                .then(response => console.log(response))
            //запись нового рабочего места в локальное хранилище
            localStorage.setItem('Place', dataPlace.id)
            setIsModalNoBooked(false);
            getPlaces()
        }
    };

    const cancelBookPlace = async () => {
        //бронирование рабочего места

            const formData = new FormData();
            formData.append('cmd', 'CANCELBOOKPLACE')
            formData.append('id', dataPlace.id)
            formData.append('start_booking', '0')
            formData.append('end_booking', '0')
            formData.append('user_name', localStorage.getItem('UserName'))


            await fetch('http://localhost:80/worco/', {method: 'POST', body: formData}).then(response => response.json())
                .then(response => console.log(response))
            //запись нового рабочего места в локальное хранилище
            localStorage.setItem('Place', '0')
            setIsModalBooked(false);
            getPlaces()

    };

    const cancelBooking = () => {
        if(localStorage.getItem('Place') !== `${dataPlace.id}`){
            return {display: 'none'}
        }

        // console.log(localStorage.getItem('Place'))
        // console.log(dataPlace.id)
    }

    const [check, setCheck] = useState()

    const updateActivityStatus = async () => {
        const formData = new FormData();
        formData.append('cmd', 'UPDATEACTIVITYSTATUS')
        formData.append('id', dataPlace.id)
        formData.append('status', dataPlace.activity_status)

        await fetch('http://localhost:80/worco/', {method: 'POST', body: formData})
            .then(async response => response.json())

        setIsModalBooked(false);
        setIsModalNoBooked(false);
        getPlaces()

    }
    const confirm = (e) => {
        cancelBookPlace()
    };

    useEffect(() => {
        //getUsersPlaces()

        getPlaces()
        getDataUser()
    }, []);
    return (
        <div className="map">

            <img src={require("./images/office.jpg")}
                 style={{objectFit: "cover", width: "80%", display: "block", marginRight: "auto", marginLeft: "auto", height: "auto"}}/>
            <svg viewBox="0 0 1509 903">

                <g onClick={() => showModal(1)} transform="translate(320,91)" >
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(1)}    stroke="#000000" strokeWidth="2" />
                    <IconPlace id={1}/>
                </g>

                <g onClick={() => showModal(2)} transform="translate(363,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(2)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={2}/>
                </g>

                <g onClick={() => showModal(3)} transform="translate(363,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(3)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={3}/>
                </g>

                <g onClick={() => showModal(4)} transform="translate(478,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(4)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={4}/>
                </g>
                <g onClick={() => showModal(5)} transform="translate(478,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(5)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={5}/>
                </g>
                <g onClick={() => showModal(6)} transform="translate(523,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(6)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={6}/>
                </g>
                <g onClick={() => showModal(7)} transform="translate(523,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(7)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={7}/>
                </g>
                <g onClick={() => showModal(8)} transform="translate(637,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(8)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={8}/>
                </g>
                <g onClick={() => showModal(9)} transform="translate(637,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(9)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={9}/>
                </g>
                <g onClick={() => showModal(10)} transform="translate(681,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(10)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={10}/>
                </g>
                <g onClick={() => showModal(11)} transform="translate(681,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(11)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={11}/>
                </g>
                <g onClick={() => showModal(12)} transform="translate(797,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(12)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={12}/>
                </g>
                <g onClick={() => showModal(13)} transform="translate(797,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(13)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={13}/>
                </g>
                <g onClick={() => showModal(14)} transform="translate(841,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(14)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={14}/>
                </g>
                <g onClick={() => showModal(15)} transform="translate(841,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(15)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={15}/>
                </g>
                <g onClick={() => showModal(16)} transform="translate(957,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(16)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={16}/>
                </g>
                <g onClick={() => showModal(17)} transform="translate(957,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(17)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={17}/>
                </g>
                <g onClick={() => showModal(18)} transform="translate(1002,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(18)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={18}/>
                </g>
                <g onClick={() => showModal(19)} transform="translate(1001,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(19)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={19}/>
                </g>
                <g onClick={() => showModal(20)} transform="translate(1117,91)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(20)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={20}/>
                </g>
                <g onClick={() => showModal(21)} transform="translate(1117,164)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(21)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={21}/>
                </g>
                <g onClick={() => showModal(22)} transform="translate(579,398)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(22)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={22}/>
                </g>
                <g onClick={() => showModal(23)} transform="translate(579,471)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(23)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={23}/>
                </g>
                <g onClick={() => showModal(24)} transform="translate(685,398)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(24)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={24}/>
                </g>
                <g onClick={() => showModal(25)} transform="translate(685,471)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(25)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={25}/>
                </g>
                <g onClick={() => showModal(26)} transform="translate(799,398)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(26)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={26}/>
                </g>
                <g onClick={() => showModal(27)} transform="translate(799,471)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(27)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={27}/>
                </g>
                <g onClick={() => showModal(28)} transform="translate(905,398)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(28)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={28}/>
                </g>
                <g onClick={() => showModal(29)} transform="translate(905,471)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(29)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={29}/>
                </g>
                <g onClick={() => showModal(30)} transform="translate(363,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(30)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={30}/>
                </g>
                <g onClick={() => showModal(31)} transform="translate(363,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(31)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={31}/>
                </g>
                <g onClick={() => showModal(32)} transform="translate(478,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(32)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={32}/>
                </g>
                <g onClick={() => showModal(33)} transform="translate(478,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(33)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={33}/>
                </g>
                <g onClick={() => showModal(34)} transform="translate(523,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(34)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={34}/>
                </g>
                <g onClick={() => showModal(35)} transform="translate(523,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(35)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={35}/>
                </g>
                <g onClick={() => showModal(36)} transform="translate(637,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(36)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={36}/>
                </g>
                <g onClick={() => showModal(37)} transform="translate(637,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(37)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={37}/>
                </g>
                <g onClick={() => showModal(38)} transform="translate(682,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(38)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={38}/>
                </g>
                <g onClick={() => showModal(39)} transform="translate(682,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(39)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={39}/>
                </g>
                <g onClick={() => showModal(40)} transform="translate(797,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(40)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={40}/>
                </g>
                <g onClick={() => showModal(41)} transform="translate(797,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(41)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={41}/>
                </g>
                <g onClick={() => showModal(42)} transform="translate(842,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(42)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={42}/>
                </g>
                <g onClick={() => showModal(43)} transform="translate(842,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(43)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={43}/>
                </g>
                <g onClick={() => showModal(44)} transform="translate(957,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(44)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={44}/>
                </g>
                <g onClick={() => showModal(45)} transform="translate(957,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(45)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={45}/>
                </g>
                <g onClick={() => showModal(46)} transform="translate(1002,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(46)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={46}/>
                </g>
                <g onClick={() => showModal(47)} transform="translate(1002,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(47)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={47}/>
                </g>
                <g onClick={() => showModal(48)} transform="translate(1117,706)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(48)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={48}/>
                </g>
                <g onClick={() => showModal(49)} transform="translate(1117,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(49)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={49}/>
                </g>
                <g onClick={() => showModal(50)} transform="translate(1157,779)">
                    <circle cx="20.999998" cy="20.999996" r="20" fill={statusActivity(50)} stroke="#000000" strokeWidth="2"/>
                    <IconPlace id={50}/>
                </g>



                {/*<circle onClick={a} stroke="#000000" strokeWidth="5" cx="304.21936" cy="458.77676" r="35.667099"  />*/}

                {/*    <clipPath id="myCircle">*/}
                {/*        <circle stroke="#000000" strokeWidth="5" cx="250" cy="145" r="125"  />*/}

                {/*    </clipPath>*/}

                {/*<image    href={avatarIcon} clipPath="url(#myCircle)" />*/}

                {/*<path stroke="#000000" stroke-width="5" d="<!-- Тут значение атрибута -->" />*/}
                {/*<path stroke="#000000" stroke-width="5" d="<!-- Тут значение атрибута -->" />*/}


            </svg>

            {/*Всплывающее окна*/}

            {/*забронировано*/}
            <Modal title={`Место   ${dataPlace.id}`} open={isModalBooked}
                   onOk={handleOk} onCancel={handleCancel} cancelButtonProps={{ style: { display: 'none' } }} style={{marginTop: 50}}>
                <GetUserPlace id={dataPlace.id}/>
                <p><Avatar size={30} src={(usersPlaces.photo !== '') ? usersPlaces.photo : 'http://localhost:80/worco/images/no_photo.jpg'  } style={{marginRight: 10}}/> {usersPlaces.name}</p>

                <p>Телефон: +{usersPlaces.phone}</p>
                <p>Почта: {usersPlaces.mail}</p>
                <br/>
                <p>Забронировано с {usersPlaces.start_booking} по {usersPlaces.end_booking}</p>
                <Popconfirm
                    title="Вы уверены?"
                    onConfirm={confirm}
                    okText="Да"
                    cancelText="Нет"
                >
                <Button danger  style={cancelBooking()}>Отменить бронирование</Button>
                </Popconfirm>
                <Checkbox checked={dataPlace.activity_status === 0 ? true : false} style={{display: (dataUser.status === 'admin')? "flex": "none", justifyContent: "center"}}>Акстивность места</Checkbox>
            </Modal>

            {/*не забронировано*/}

            {contextHolder}

            <Modal title={`Место   ${(dataPlace.id !== undefined) ? dataPlace.id : "-"}`} open={isModalNoBooked}
                   onOk={bookPlace} onCancel={handleCancel}  cancelText="Отмена" okText="Забронировать" style={{marginTop: 50}}>
                <br/>
                <p style={{textAlign: "center"}}>Забронировать рабочее место</p>

                <p><DatePicker onChange={(date, dateString) => setDateBron1(dateString) } placeholder={"Выберите начальную дату"} style={{width: 250, marginLeft: "auto", display: "block", marginRight: "auto"}}/> </p>
                <p><DatePicker onChange={(date, dateString) => setDateBron2(dateString) } placeholder={"Выберите конечную дату"} style={{width: 250, marginLeft: "auto", display: "block", marginRight: "auto"}}/> </p>
                <Checkbox checked={dataPlace.activity_status === 0 ? true : false} onChange={updateActivityStatus} style={{display: (dataUser.status === 'admin')? "flex": "none", justifyContent: "center"}}>Активность места</Checkbox>
                <br/>
            </Modal>
        </div>
    );
};

export default InteractiveMap;