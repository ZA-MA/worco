import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Checkbox, DatePicker, Descriptions, Modal, Popconfirm, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import * as PropTypes from "prop-types";
import { Divider, Radio, Typography } from 'antd';
import * as ReactRouterDOM from "react-router";
import {DescriptionsContext} from "antd/es/descriptions";
import {render} from "react-dom";
const {Text, Paragraph } = Typography;



Text.propTypes = {children: PropTypes.node};
const Usercab = () => {
    const date = require('date-and-time');
    const now = new Date();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalNoBooked, setIsModalNoBooked] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalNoBooked(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalNoBooked(false);
    };
    //const [editableStr, setEditableStr] = useState('Чел какой-то');
    let [dataUser, setDataUser] = useState([]);
    function getDataUser(){

        const formData = new FormData();
        formData.append('cmd', 'GETUSER')
        formData.append('user', localStorage.getItem('UserName'))
        fetch('http://localhost:80/worco/', {method: 'POST', body: formData})
            .then(response => response.json())
            .then(response => {
                setDataUser(response);
                console.log(response)
            });
    }



    useEffect(() => {
        getDataUser()
        getHistory()
    }, []);
    const useNavigate = ReactRouterDOM.useNavigate;
    const navigate = useNavigate();
    function exitUser(){
        localStorage.clear();
        navigate('/');
    }

    const cancelBookPlace = async () => {
        //бронирование рабочего места

        const formData = new FormData();
        formData.append('cmd', 'CANCELBOOKPLACE');
        formData.append('id', dataUser.workplace_id);
        formData.append('start_booking', '0');
        formData.append('end_booking', '0');
        formData.append('user_name', localStorage.getItem('UserName'));


        await fetch('http://localhost:80/worco/', {method: 'POST', body: formData}).then(response => response.json())
            .then(response => console.log(response));
        //запись нового рабочего места в локальное хранилище
        localStorage.setItem('Place', '0');
        getDataUser();
        getHistory()
        setIsModalOpen(false)
        navigate('/accaunt');
    };

    const cancelBooking = () => {
        if(localStorage.getItem('Place') === '0'){
            return {display: 'none'}
        }
        // console.log(localStorage.getItem('Place'))
        // console.log(dataPlace.id)
    }

    const [history, setHistory] = useState()

    const getHistory=async () => {
        const formData = new FormData();
        formData.append('cmd', 'GETHISTORY');
        formData.append('id', dataUser.id);
        let res;
        res = await fetch('http://localhost:80/worco/', {
            method: 'POST',
            body: formData
        }).then(response => response.json())

        setHistory(res);
        return res;
    }
    const [numPlace, setNumPlace] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [statusPlace, setStatusPlace] = useState()
    const [statusActPlace, setStatusActPlace] = useState()

    const showModal = (id) => {

        setIsModalOpen(true);

        setNumPlace(history[id].workplace_id)
        setStartDate(history[id].start_booking)
        setEndDate(history[id].end_booking)
        setStatusPlace(history[id].status_bron)
        setStatusActPlace(history[id].activity_status)

    };

    const HistoryUser =  () => {


        if(history !== undefined) {

            let a = [];


            if(history[0]) a.push(history[0].workplace_id)
            if(history[1]) a.push(history[1].workplace_id)
            if(history[2]) a.push(history[2].workplace_id)
            if(history[3]) a.push(history[3].workplace_id)
            if(history[4]) a.push(history[4].workplace_id)

            let h = [];
            h.push(<p style={{fontWeight: "bold"}}>История бронирования пользователя: </p>)
            a.forEach((i, i1) => {
                h.push(<svg width="60" height="60" style={{margin: 2}}>
                    <g onClick={() => showModal(i1)}>
                        <circle cx="30" cy="30" r="30" fill="#aeaeae"/>
                        <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="24px" fontFamily="Montserrat" fontWeight="1000"
                          dy=".3em">{i}</text>
                    </g>
                </svg>)
            })
            return h;
        }else{
            getHistory()
        }
    }

    const StatusPlace = () => {

        if(numPlace === dataUser.workplace_id){
            return <>
            <p>Сейчас забронировано вами</p>
            <Popconfirm
                title="Вы уверены?"
                onConfirm={confirm}
                okText="Да"
                cancelText="Нет"
            >
                <Button danger style={cancelBooking()}>Отменить бронирование</Button>
            </Popconfirm></>

        }
        else if(statusPlace === 1 && statusActPlace === 0){
            return <p>Сейчас забронировано</p>
        }else if(statusPlace === 0 && statusActPlace === 0){
            return <p>Сейчас свободно</p>
        }else if(statusActPlace === 1){
            return <p>Сейчас неактивно</p>
        }
    }

    const ReBooking = () =>{
        if(statusPlace === 1 ){

        }else if(statusPlace === 0 && statusActPlace === 0 && dataUser.workplace_id === 0){
            return <Button type="primary" onClick={reBook}>Забронировать повторно</Button>
        }
    }

    const reBook = () => {
        setIsModalOpen(false);
        setIsModalNoBooked(true)
    }

    const TextNowBook = () => {
        if(numPlace === dataUser.workplace_id){
            return <p>Забронировано с {startDate} по {endDate}</p>
        }else{
            return <p>Было забронировано с {startDate} по {endDate}</p>
        }
    }

    const [dateBron1, setDateBron1] = useState();
    const [dateBron2, setDateBron2] = useState();

    const bookPlace = async () => {
        //бронирование рабочего места
        if (dateBron1 !== undefined && dateBron2 !== undefined) {
            const formData = new FormData();
            formData.append('cmd', 'BOOKPLACE')
            formData.append('id', numPlace)
            formData.append('start_booking', dateBron1)
            formData.append('end_booking', dateBron2)
            formData.append('user_id', dataUser.id)


            await fetch('http://localhost:80/worco/', {method: 'POST', body: formData}).then(response => response.json())
                .then(response => console.log(response))
            //запись нового рабочего места в локальное хранилище
            localStorage.setItem('Place', numPlace)
            setIsModalNoBooked(false);
            getDataUser()
            getHistory()

        }
    };
    const confirm = (e) => {
        cancelBookPlace()
    };


    return(
        <>




                    <Paragraph style={{display:"flex", alignItems: "center"}}>
                        <Avatar size={64} src={dataUser.photo} style={{margin: 12}}/>
                        <Text style={{fontSize: 30}}>{dataUser.name}</Text>
                    </Paragraph>


                    <Descriptions  title="Информация о пользователе" layout="horizontal" column={1} style={{marginTop: 25}}>
                        <Descriptions.Item span={1} label="Телефон" labelStyle={{fontWeight: "bold"}}>+{dataUser.phone}</Descriptions.Item>
                        <Descriptions.Item span={1} label="Почта" labelStyle={{fontWeight: "bold"}}>{dataUser.mail}</Descriptions.Item>
                        <Descriptions.Item  label={`Рабочее место`} span={1} labelStyle={{fontWeight: "bold"}}> {(dataUser.workplace_id === 0) ? 'Не забронировано' : '№' + dataUser.workplace_id}</Descriptions.Item>
                        <Descriptions.Item span={1}>
                            <Popconfirm
                                title="Вы уверены?"
                                onConfirm={confirm}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button danger  style={cancelBooking()}>Отменить бронирование</Button>
                            </Popconfirm>
                        </Descriptions.Item>
                    </Descriptions>


            <div style={{marginTop:10, marginBottom: 10}}>
                <HistoryUser/>

            </div>
            <Button type="primary" onClick={exitUser} style={{marginTop: 100}}>Выход</Button>

            <Modal title={`Место  ${numPlace} `} open={isModalOpen}
                   onOk={handleOk} onCancel={handleCancel} cancelButtonProps={{ style: { display: 'none' } }} style={{marginTop: 50}}>
                    <br/>
                <TextNowBook/>
                <br/>

                    <StatusPlace/>

                    <ReBooking/>
            </Modal>

            <Modal title={`Место   ${(numPlace !== undefined) ? numPlace : "-"}`} open={isModalNoBooked}
                   onOk={bookPlace} onCancel={handleCancel}  cancelText="Отмена" okText="Забронировать" style={{marginTop: 50}}>
                <br/>
                <p style={{textAlign: "center"}}>Повторное бронирование</p>

                <p><DatePicker onChange={(date, dateString) => setDateBron1(dateString) } placeholder={"Выберите начальную дату"} style={{width: 250, marginLeft: "auto", display: "block", marginRight: "auto"}}/> </p>
                <p><DatePicker onChange={(date, dateString) => setDateBron2(dateString) } placeholder={"Выберите конечную дату"} style={{width: 250, marginLeft: "auto", display: "block", marginRight: "auto"}}/> </p>

                <br/>
            </Modal>

        </>
);
}

export default Usercab;