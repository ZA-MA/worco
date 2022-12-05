import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Descriptions, Modal, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import * as PropTypes from "prop-types";
import { Divider, Radio, Typography } from 'antd';
import * as ReactRouterDOM from "react-router";
import {DescriptionsContext} from "antd/es/descriptions";
const {Text, Paragraph } = Typography;



Text.propTypes = {children: PropTypes.node};
const Usercab = () => {
    const date = require('date-and-time');
    const now = new Date();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //const [editableStr, setEditableStr] = useState('Чел какой-то');
    let [dataUser, setDataUser] = useState([]);
    function getDataUser(){

        const formData = new FormData();
        formData.append('cmd', 'GET')
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
        formData.append('cmd', 'CANCELBOOKPLACE')
        formData.append('id', dataUser.workplace_id)
        formData.append('start_booking', '0')
        formData.append('end_booking', '0')
        formData.append('user_name', localStorage.getItem('UserName'))


        await fetch('http://localhost:80/worco/', {method: 'POST', body: formData}).then(response => response.json())
            .then(response => console.log(response))
        //запись нового рабочего места в локальное хранилище
        localStorage.setItem('Place', '0')
        navigate('/accaunt');


    };

    const cancelBooking = () => {
        if(localStorage.getItem('Place') === '0'){
            return {display: 'none'}
        }

        // console.log(localStorage.getItem('Place'))
        // console.log(dataPlace.id)
    }

    return(
        <>




                    <Paragraph


                    >
                        <Avatar size={64} src={dataUser.photo} style={{margin: 10}}/>
                        <Text>{dataUser.name}</Text>
                    </Paragraph>


                    <Descriptions title="Информация о пользователе" layout="horizontal" column={1} style={{marginTop: 25}}>
                        <Descriptions.Item span={1} label="Телефон" labelStyle={{fontWeight: "bold"}}>+{dataUser.phone}</Descriptions.Item>
                        <Descriptions.Item span={1} label="Почта" labelStyle={{fontWeight: "bold"}}>{dataUser.mail}</Descriptions.Item>
                        <Descriptions.Item  label={`Рабочее место`} span={1} labelStyle={{fontWeight: "bold"}}> {(dataUser.workplace_id !=='0') ? '№' + dataUser.workplace_id : 'Не забронировано'}</Descriptions.Item>
                        <Descriptions.Item span={1}><Button danger onClick={cancelBookPlace} style={cancelBooking()}>Отменить бронирование</Button></Descriptions.Item>
                    </Descriptions>




                    <Modal title="Место такое-то" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p><UserOutlined /> Человек</p>
                        <p>Забронировано</p>
                    </Modal>
            {/*<svg width="250" height="250">*/}
            {/*    <circle cx="125" cy="125" r="100" fill="#aeaeae" />*/}
            {/*    <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="100px" font-family="Arial" dy=".3em">BC</text>*/}
            {/*    Sorry, your browser does not support inline SVG.*/}
            {/*</svg>*/}
            <Button type="primary" onClick={exitUser}>Выход</Button>
        </>
);
}

export default Usercab;